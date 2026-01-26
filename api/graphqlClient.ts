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
const QUEUE_TIMEOUT = 10000; // 10 seconds
const REFRESH_COOLDOWN = 5000; // 5 seconds between refresh attempts
let lastRefreshAttempt = 0;

const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(graphqlClient(prom.config));
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
  if (activeHotelId) {
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
        // Emit session expired event for app-level handling
        window.dispatchEvent(new CustomEvent('auth:session-expired'));
        refreshPromise = null;
        return Promise.reject(authError);
      }

      // Check cooldown period to prevent rapid refresh attempts
      const now = Date.now();
      const timeSinceLastRefresh = now - lastRefreshAttempt;
      if (timeSinceLastRefresh < REFRESH_COOLDOWN && lastRefreshAttempt > 0) {
        return Promise.reject(new Error('Refresh cooldown active. Please wait.'));
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

      // Trigger GraphQL-based token refresh (single promise shared by all concurrent requests)
      refreshPromise = graphqlClient.post('', {
        query: `mutation RefreshToken { refreshToken { success } }`
      })
      .then(({ data: refreshData }) => {
        if (refreshData.data?.refreshToken?.success) {
          processQueue(null);
          return graphqlClient(originalRequest);
        } else {
          throw new Error('REFRESH_FAILED');
        }
      })
      .catch((err) => {
        processQueue(err);
        
        // Check if we've exceeded cooldown attempts (3 attempts in 15 seconds = session expired)
        const attemptsSinceStart = Math.floor((now - lastRefreshAttempt) / REFRESH_COOLDOWN);
        if (attemptsSinceStart >= MAX_REFRESH_ATTEMPTS) {
          window.dispatchEvent(new CustomEvent('auth:session-expired'));
          lastRefreshAttempt = 0; // Reset
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
