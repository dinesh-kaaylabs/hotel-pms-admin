
import { graphqlClient } from './graphqlClient';

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
 * Standardized helper for executing GraphQL operations.
 * Wraps Axios to provide a clean, promise-based API for queries and mutations.
 * Enforces strict error extraction for UI feedback.
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
    
    // Create an augmented error object for the caller
    const err = new Error(message) as any;
    err.code = extensions.code;
    err.extensions = extensions;
    
    throw err;
  }

  return response.data.data;
}
