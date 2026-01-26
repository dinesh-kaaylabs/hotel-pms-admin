/**
 * Error Handling Utilities
 * Centralized error parsing and user-friendly message generation
 */

// Error code to user-friendly message mapping
export const ERROR_MESSAGES: Record<string, string> = {
  // Network errors
  'NETWORK_ERROR': 'Connection lost. Please check your internet connection.',
  'TIMEOUT': 'Request timed out. Please try again.',
  'CONNECTION_FAILED': 'Unable to reach server. Please check your connection.',
  
  // Authentication errors
  'UNAUTHENTICATED': 'Your session has expired. Please log in again.',
  'UNAUTHORIZED': 'You do not have permission to perform this action.',
  'SESSION_EXPIRED': 'Your session has expired. Please log in again.',
  
  // Validation errors
  'DUPLICATE_ROOM_NUMBER': 'Room number already exists. Please use a different number.',
  'INVALID_ROOM_TYPE': 'Selected room type is invalid. Please select a valid type.',
  'DUPLICATE_EMAIL': 'Email address already exists. Please use a different email.',
  'INVALID_EMAIL': 'Invalid email format. Please enter a valid email address.',
  'INVALID_PHONE': 'Invalid phone number format.',
  'DUPLICATE_GUEST': 'Guest with this information already exists.',
  
  // Business logic errors
  'ROOM_OCCUPIED': 'Room is currently occupied and cannot be modified.',
  'BOOKING_NOT_FOUND': 'Booking not found. It may have been deleted.',
  'INSUFFICIENT_INVENTORY': 'Not enough rooms available for the selected dates.',
  'INVALID_DATE_RANGE': 'Check-out date must be after check-in date.',
  'PAST_DATE': 'Cannot create booking for past dates.',
  
  // Generic fallbacks
  'INTERNAL_ERROR': 'An unexpected error occurred. Please try again.',
  'UNKNOWN_ERROR': 'Something went wrong. Please try again or contact support.',
};

/**
 * Parse error from various sources and return user-friendly message
 * Handles: Error objects, GraphQL errors, Axios errors, strings
 */
export function parseError(err: unknown): string {
  // Handle null/undefined
  if (!err) {
    return ERROR_MESSAGES.UNKNOWN_ERROR;
  }

  // Handle string errors
  if (typeof err === 'string') {
    return err;
  }

  // Handle Error objects with extensions (GraphQL errors)
  if (err && typeof err === 'object') {
    const error = err as any;

    // Check for error code in extensions
    const code = error.code || error.extensions?.code;
    if (code && ERROR_MESSAGES[code]) {
      return ERROR_MESSAGES[code];
    }

    // Check for message property
    if (error.message && typeof error.message === 'string') {
      // If message is a known code, return friendly message
      if (ERROR_MESSAGES[error.message]) {
        return ERROR_MESSAGES[error.message];
      }
      // Return the message if it's user-friendly (not a stack trace)
      if (!error.message.includes('at ') && error.message.length < 200) {
        return error.message;
      }
    }

    // Check for GraphQL errors array
    if (Array.isArray(error.errors) && error.errors.length > 0) {
      const firstError = error.errors[0];
      const code = firstError.extensions?.code;
      if (code && ERROR_MESSAGES[code]) {
        return ERROR_MESSAGES[code];
      }
      if (firstError.message) {
        return firstError.message;
      }
    }

    // Check for response.data.errors (Axios GraphQL errors)
    if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
      const firstError = error.response.data.errors[0];
      const code = firstError.extensions?.code;
      if (code && ERROR_MESSAGES[code]) {
        return ERROR_MESSAGES[code];
      }
      if (firstError.message) {
        return firstError.message;
      }
    }
  }

  // Fallback
  return ERROR_MESSAGES.UNKNOWN_ERROR;
}

/**
 * Get error message with context
 * @param err - The error object
 * @param context - Context string (e.g., "create room", "update booking")
 * @returns User-friendly error message
 */
export function getErrorMessage(err: unknown, context?: string): string {
  const baseMessage = parseError(err);
  
  if (context && !baseMessage.toLowerCase().includes(context.toLowerCase())) {
    return `Failed to ${context}. ${baseMessage}`;
  }
  
  return baseMessage;
}

/**
 * Check if error is a network error
 */
export function isNetworkError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false;
  const error = err as any;
  const code = error.code || error.extensions?.code;
  return ['NETWORK_ERROR', 'TIMEOUT', 'CONNECTION_FAILED', 'ECONNABORTED', 'ERR_NETWORK'].includes(code);
}

/**
 * Check if error is an authentication error
 */
export function isAuthError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false;
  const error = err as any;
  const code = error.code || error.extensions?.code;
  return ['UNAUTHENTICATED', 'UNAUTHORIZED', 'SESSION_EXPIRED'].includes(code);
}

/**
 * Check if error is a validation error
 */
export function isValidationError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false;
  const error = err as any;
  const code = error.code || error.extensions?.code;
  return code && code.startsWith('INVALID_') || code?.startsWith('DUPLICATE_');
}

/**
 * Log error to monitoring service (e.g., Sentry)
 * Only logs in production, console.error in development
 */
export function logError(err: unknown, context?: { userId?: string; action?: string; metadata?: Record<string, any> }): void {
  if (process.env.NODE_ENV === 'production') {
    // TODO: Integrate with Sentry or other monitoring service
    // Sentry.captureException(err, { user: { id: context?.userId }, tags: { action: context?.action }, extra: context?.metadata });
  } else {
    console.error('[Error]', context?.action || 'Unknown action', err, context?.metadata);
  }
}

/**
 * Create a user-friendly error object
 */
export interface FriendlyError {
  message: string;
  code?: string;
  isNetwork: boolean;
  isAuth: boolean;
  isValidation: boolean;
  originalError: unknown;
}

/**
 * Parse error into a structured friendly error object
 */
export function createFriendlyError(err: unknown, context?: string): FriendlyError {
  return {
    message: getErrorMessage(err, context),
    code: (err && typeof err === 'object' && (err as any).code) || undefined,
    isNetwork: isNetworkError(err),
    isAuth: isAuthError(err),
    isValidation: isValidationError(err),
    originalError: err,
  };
}
