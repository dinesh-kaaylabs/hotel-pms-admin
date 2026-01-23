import { HttpResponse, delay } from 'msw';

/**
 * Enterprise Mock Utilities
 * Strictly Cookie-based Authentication assumptions.
 */

export const getHeaders = (request: Request) => {
  return {
    hotelId: request.headers.get('X-Hotel-Id'),
  };
};

export const simulateNetwork = async (ms = 400) => {
  await delay(ms);
};

// Fix: Added missing wrapSuccess export for MSW v2 compatibility
/**
 * Standard Success Wrapper for MSW Handlers.
 * Returns a JSON response with the provided data and status code.
 */
export const wrapSuccess = (data: any, status = 200) => {
  return HttpResponse.json(data, { status });
};

// Fix: Added missing wrapError export for MSW v2 compatibility
/**
 * Standard Error Wrapper for MSW Handlers.
 * Returns a GraphQL-compliant error structure in the response body.
 */
export const wrapError = (code: string, message: string, status = 400) => {
  return HttpResponse.json({
    errors: [{ 
      message, 
      extensions: { code } 
    }]
  }, { status });
};
