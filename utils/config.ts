
/**
 * Production-grade configuration management.
 * Enforces strict GraphQL-only communication.
 */
export const CONFIG = {
  API_BASE_URL: '/graphql', // Strictly GraphQL. No /api/v1 paths.
  ENV: (typeof process !== 'undefined' && process.env.VITE_APP_ENV) || 'production',
  IS_PROD: (typeof process !== 'undefined' && process.env.VITE_APP_ENV) === 'production',
  VERSION: '1.1.5-pms-pure-graphql',
  REQUEST_TIMEOUT: 15000,
  ENABLE_MOCKS: true, 
};
