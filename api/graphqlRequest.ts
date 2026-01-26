
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
 * GraphQL Error class for type-safe error handling
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
    
    throw new GraphQLError(message, extensions.code, extensions);
  }

  return response.data.data;
}
