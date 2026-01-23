
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

/**
 * Enterprise MSW Server Configuration (Node.js).
 * Used for testing or server-side rendering logic to prevent browser-only code execution.
 */
export const server = setupServer(...handlers);
