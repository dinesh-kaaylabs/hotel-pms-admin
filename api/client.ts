
import { graphqlClient } from './graphqlClient';

/**
 * Global API Client Export.
 * Alias for graphqlClient to maintain compatibility with existing module imports
 * while enforcing the strict GraphQL-only requirement.
 */
export const client = graphqlClient;
