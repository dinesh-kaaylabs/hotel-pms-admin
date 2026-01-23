
import { User } from '@/types';
import { graphqlRequest } from '../api/graphqlRequest';
import { LOGIN_MUTATION, LOGOUT_MUTATION, ME_QUERY, VERIFY_MFA_MUTATION } from '../graphql/auth.gql';

export interface LoginResponse {
  adminLogin: {
    status: 'SUCCESS' | 'MFA_REQUIRED' | 'FAILED';
    message: string;
    mfaEnabled: boolean;
    user: {
      id: string;
      name: string;
      hotels: Array<{ id: string; name: string }>;
    };
  };
}

/**
 * Enterprise Authentication API
 * Strictly GraphQL-only.
 */
export const authApi = {
  login: (email: string, password: string) => 
    graphqlRequest<LoginResponse>(LOGIN_MUTATION, { email, password }),
    
  verifyMfa: (code: string) =>
    graphqlRequest<{ verifyMFA: { success: boolean; message: string } }>(VERIFY_MFA_MUTATION, { code }),

  logout: () => 
    graphqlRequest<{ logout: { success: boolean } }>(LOGOUT_MUTATION),
    
  getMe: () => 
    graphqlRequest<{ me: any }>(ME_QUERY),
};
