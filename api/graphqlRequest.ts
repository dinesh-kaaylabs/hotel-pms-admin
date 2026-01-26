
import { graphqlClient } from './graphqlClient';

/**
 * GraphQL response wrapper
 * Standard GraphQL response structure with data and optional errors
 * 
 * @template T - The type of the data payload
 * @property data - The response data (null if errors occurred)
 * @property errors - Array of GraphQL errors (optional)
 * @property errors[].message - Human-readable error message
 * @property errors[].extensions - Error metadata (e.g., error code, stack trace)
 * @property errors[].extensions.code - Error code for programmatic handling
 * 
 * @remarks
 * - GraphQL can return partial data with errors
 * - Frontend should check for errors before processing data
 * - Error codes are used for user-friendly error messages
 */
export interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    extensions?: {
      code?: string;
    };
  }>;
}

/**
 * GraphQL Error class for type-safe error handling
 * Custom error class that preserves GraphQL error metadata
 * 
 * @property code - Error code from backend (e.g., "UNAUTHENTICATED", "DUPLICATE_ROOM_NUMBER")
 * @property extensions - Additional error metadata from backend
 * 
 * @remarks
 * - Used by centralized error handling utility (utils/errorHandling.ts)
 * - Error codes are mapped to user-friendly messages
 * - Preserves backend error context for debugging
 * 
 * @example
 * ```typescript
 * try {
 *   await graphqlRequest(QUERY, variables);
 * } catch (err) {
 *   if (err instanceof GraphQLError) {
 *     console.log(err.code); // "UNAUTHENTICATED"
 *     console.log(err.message); // "Your session has expired"
 *   }
 * }
 * ```
 */
export class GraphQLError extends Error {
  code?: string;
  extensions?: Record<string, any>;
  
  constructor(message: string, code?: string, extensions?: Record<string, any>) {
    super(message);
    this.code = code;
    this.extensions = extensions;
    this.name = 'GraphQLError';
    Object.setPrototypeOf(this, GraphQLError.prototype);
  }
}

/**
 * Standardized helper for executing GraphQL operations
 * Wraps Axios GraphQL client to provide a clean, promise-based API
 * 
 * @template T - The expected response data type
 * @param query - GraphQL query or mutation string
 * @param variables - GraphQL variables object (optional)
 * @returns Promise resolving to typed response data
 * @throws {GraphQLError} When GraphQL errors are returned
 * 
 * @remarks
 * - Automatically extracts and throws first GraphQL error
 * - Preserves error codes and extensions for error handling
 * - Used by all API hooks (React Query mutations/queries)
 * - Backend is source of truth for all data and calculations
 * 
 * @example
 * ```typescript
 * // Query example
 * const data = await graphqlRequest<{ bookings: Booking[] }>(
 *   BOOKINGS_QUERY,
 *   { page: 1, pageSize: 20 }
 * );
 * 
 * // Mutation example
 * const result = await graphqlRequest<{ createRoom: { success: boolean } }>(
 *   CREATE_ROOM_MUTATION,
 *   { input: { roomNumber: "101", roomTypeId: "..." } }
 * );
 * ```
 */
export async function graphqlRequest<T>(query: string, variables: Record<string, any> = {}): Promise<T> {
  const response = await graphqlClient.post<GraphQLResponse<T>>('', {
    query,
    variables,
  });

  if (response.data.errors?.length) {
    const error = response.data.errors[0];
    const message = error.message || 'Operation failed';
    const extensions = error.extensions || {};
    
    throw new GraphQLError(message, extensions.code, extensions);
  }

  return response.data.data;
}
