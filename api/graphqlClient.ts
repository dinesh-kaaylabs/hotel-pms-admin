import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

interface FailedRequest {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  config: InternalAxiosRequestConfig;
  timestamp: number;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];
let refreshPromise: Promise<any> | null = null;
const MAX_REFRESH_ATTEMPTS = 3;
const QUEUE_TIMEOUT = 35000; // 35 seconds (longer than request timeout)
const REFRESH_COOLDOWN = 5000; // 5 seconds between refresh attempts
let lastRefreshAttempt = 0;
let refreshAttemptCount = 0;
let sessionExpiredFired = false; // Prevent duplicate session expired events

const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      // Verify hotel context hasn't changed during queue wait
      const currentHotelId = sessionStorage.getItem('pms_active_hotel_id');
      const requestHotelId = prom.config.headers['X-Hotel-Id'];
      
      if (currentHotelId && requestHotelId && currentHotelId !== requestHotelId) {
        // Update request with current hotel context
        prom.config.headers['X-Hotel-Id'] = currentHotelId;
      }
      
      prom.resolve(graphqlClient(prom.config));
    }
  });
  failedQueue = [];
};

// Clean up stale requests from queue
const cleanupQueue = () => {
  const now = Date.now();
  failedQueue = failedQueue.filter(req => now - req.timestamp < QUEUE_TIMEOUT);
};

/**
 * Enterprise GraphQL Client (Axios-powered)
 * Base URL is strictly /graphql. No REST fallback.
 * Uses httpOnly cookies for automatic session management.
 */
export const graphqlClient = axios.create({
  baseURL: '/graphql',
  withCredentials: true,
  timeout: 30000, // 30s timeout to prevent infinite loading states
  headers: {
    'Content-Type': 'application/json',
  },
});

// Multi-tenant header injection via request interceptor
graphqlClient.interceptors.request.use((config) => {
  const activeHotelId = sessionStorage.getItem('pms_active_hotel_id');
  
  // Only add header if hotel ID is valid (not null, empty, or 'pending')
  if (activeHotelId && activeHotelId !== 'pending' && activeHotelId.trim() !== '') {
    config.headers['X-Hotel-Id'] = activeHotelId;
  }
  
  return config;
});

// Authentication and Token Refresh logic strictly via GraphQL protocols
graphqlClient.interceptors.response.use(
  (response) => {
    const { data } = response;
    
    // Scan for UNAUTHENTICATED in the standard GraphQL errors array
    const authError = data.errors?.find((e: any) => e.extensions?.code === 'UNAUTHENTICATED');
    
    if (authError) {
      const originalRequest = response.config;

      // Identify if the failing request was a refresh attempt to prevent infinite loops
      const isRefreshTokenOp = 
        (typeof originalRequest.data === 'string' && originalRequest.data.includes('RefreshToken')) ||
        (originalRequest.data && originalRequest.data.query?.includes('RefreshToken'));

      if (isRefreshTokenOp) {
        processQueue(new Error('SESSION_EXPIRED'));
        // Emit session expired event for app-level handling (only once)
        if (!sessionExpiredFired) {
          sessionExpiredFired = true;
          window.dispatchEvent(new CustomEvent('auth:session-expired'));
          // Reset after 5 seconds to allow retry if needed
          setTimeout(() => { sessionExpiredFired = false; }, 5000);
        }
        refreshPromise = null;
        isRefreshing = false;
        refreshAttemptCount = 0;
        return Promise.reject(authError);
      }

      // Check cooldown period to prevent rapid refresh attempts
      const now = Date.now();
      const timeSinceLastRefresh = now - lastRefreshAttempt;
      if (timeSinceLastRefresh < REFRESH_COOLDOWN && lastRefreshAttempt > 0 && refreshAttemptCount > 0) {
        return Promise.reject(new Error('Refresh cooldown active. Please wait.'));
      }
      
      // Check if max attempts exceeded in recent time window
      if (refreshAttemptCount >= MAX_REFRESH_ATTEMPTS) {
        if (!sessionExpiredFired) {
          sessionExpiredFired = true;
          window.dispatchEvent(new CustomEvent('auth:session-expired'));
          setTimeout(() => { sessionExpiredFired = false; }, 5000);
        }
        refreshAttemptCount = 0;
        return Promise.reject(new Error('Maximum refresh attempts exceeded'));
      }

      // If refresh is already in progress, wait for it
      if (isRefreshing && refreshPromise) {
        // Clean up stale requests before adding new one
        cleanupQueue();
        
        return new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('Token refresh timeout'));
          }, QUEUE_TIMEOUT);
          
          failedQueue.push({ 
            resolve: (val) => { 
              clearTimeout(timeout); 
              resolve(val); 
            }, 
            reject: (err) => { 
              clearTimeout(timeout); 
              reject(err); 
            }, 
            config: originalRequest,
            timestamp: Date.now()
          });
        });
      }

      isRefreshing = true;
      lastRefreshAttempt = now;
      refreshAttemptCount++;

      // Trigger GraphQL-based token refresh (single promise shared by all concurrent requests)
      refreshPromise = graphqlClient.post('', {
        query: `mutation RefreshToken { refreshToken { success } }`
      })
      .then(({ data: refreshData }) => {
        if (refreshData.data?.refreshToken?.success) {
          // Reset attempt counter on success
          refreshAttemptCount = 0;
          processQueue(null);
          return graphqlClient(originalRequest);
        } else {
          throw new Error('REFRESH_FAILED');
        }
      })
      .catch((err) => {
        processQueue(err);
        
        // Check if we've exceeded max attempts
        if (refreshAttemptCount >= MAX_REFRESH_ATTEMPTS) {
          if (!sessionExpiredFired) {
            sessionExpiredFired = true;
            window.dispatchEvent(new CustomEvent('auth:session-expired'));
            setTimeout(() => { sessionExpiredFired = false; }, 5000);
          }
          refreshAttemptCount = 0;
          lastRefreshAttempt = 0;
        }
        
        throw err;
      })
      .finally(() => {
        isRefreshing = false;
        refreshPromise = null;
        
        // Cleanup queue after processing
        setTimeout(() => {
          if (failedQueue.length > 0) {
            cleanupQueue();
          }
        }, 1000);
      });

      return refreshPromise;
    }

    return response;
  },
  (error: AxiosError) => {
    // Network-level failures: timeout, connection refused, DNS failure, etc.
    let message = 'Network error. Please check your connection.';
    let code = 'NETWORK_ERROR';
    
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      message = 'Request timed out. Please try again.';
      code = 'TIMEOUT';
    } else if (error.code === 'ERR_NETWORK') {
      message = 'Unable to reach server. Please check your internet connection.';
      code = 'CONNECTION_FAILED';
    }
    
    // Normalize to GraphQLError shape for consistent handling
    const normalizedError = new Error(message) as any;
    normalizedError.code = code;
    normalizedError.extensions = { code };
    
    return Promise.reject(normalizedError);
  }
);
