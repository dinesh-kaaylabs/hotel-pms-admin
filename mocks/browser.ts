
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

/**
 * Enterprise MSW Browser Worker Configuration.
 * setupWorker is only called if we are verified to be in a browser environment.
 */
export const worker = typeof window !== 'undefined' ? setupWorker(...handlers) : null;
