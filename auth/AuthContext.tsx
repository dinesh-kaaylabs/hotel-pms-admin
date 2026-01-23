import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from './auth.api';
import { AuthUser, AppPermission } from './auth.types';
import { hasPermission as checkPermission } from './permissions';
import { useSyncUserHotels } from '../stores/hotelStore';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  hasPermission: (permission: AppPermission) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const activeHotelId = sessionStorage.getItem('pms_active_hotel_id');
  
  const { data: userResponse, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      try {
        const data = await authApi.getMe();
        return data.me as AuthUser;
      } catch (err: any) {
        if (err.code === 'UNAUTHENTICATED') return null;
        throw err;
      }
    },
    // Only fetch user data once hotel context is available
    enabled: !!activeHotelId,
    retry: (count, err: any) => {
      const code = err.code || err.extensions?.code;
      if (code === 'UNAUTHENTICATED') return false;
      return count < 1;
    },
    staleTime: 1000 * 60 * 5,
  });  

  // Sync user data to hotel store
  useSyncUserHotels(userResponse);

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (e) {
      // Ignore
    } finally {
      queryClient.setQueryData(['me'], null);
      sessionStorage.removeItem('pms_active_hotel_id');
      // Emit logout event for app-level handling
      window.dispatchEvent(new CustomEvent('auth:logout-complete'));
    }
  };

  const hasPermission = (permission: AppPermission) => {
    return checkPermission(userResponse?.role, permission);
  };

  const value = {
    user: userResponse || null,
    isLoading,
    isAuthenticated: !!userResponse,
    logout,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
