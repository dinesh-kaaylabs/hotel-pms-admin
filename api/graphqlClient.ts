import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

interface FailedRequest {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  config: InternalAxiosRequestConfig;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(graphqlClient(prom.config));
  });
  failedQueue = [];
};

/**
 * Enterprise GraphQL Client (Axios-powered)
 * Base URL is strictly /graphql. No REST fallback.
 * Uses httpOnly cookies for automatic session management.
 */
export const graphqlClient = axios.create({
  baseURL: '/graphql',
  withCredentials: true,
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
        return Promise.reject(authError);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('Token refresh timeout'));
          }, 10000);
          
          failedQueue.push({ 
            resolve: (val) => { 
              clearTimeout(timeout); 
              resolve(val); 
            }, 
            reject: (err) => { 
              clearTimeout(timeout); 
              reject(err); 
            }, 
            config: originalRequest 
          });
        });
      }

      isRefreshing = true;

      // Trigger GraphQL-based token refresh
      return new Promise((resolve, reject) => {
        graphqlClient.post('', {
          query: `mutation RefreshToken { refreshToken { success } }`
        })
        .then(({ data: refreshData }) => {
          if (refreshData.data?.refreshToken?.success) {
            processQueue(null);
            resolve(graphqlClient(originalRequest));
          } else {
            throw new Error('REFRESH_FAILED');
          }
        })
        .catch((err) => {
          processQueue(err);
          // Emit session expired event for app-level handling
          window.dispatchEvent(new CustomEvent('auth:session-expired'));
          reject(err);
        })
        .finally(() => {
          isRefreshing = false;
        });
      });
    }

    return response;
  },
  (error: AxiosError) => {
    // Network-level failures only.
    return Promise.reject(error);
  }
);
