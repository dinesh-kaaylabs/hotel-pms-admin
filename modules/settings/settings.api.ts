import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlRequest } from '../../api/graphqlRequest';
import { HotelSettings, AppUser, CreateUserPayload, BrandConfig } from './settings.types';

export const useHotelSettings = () => {
  return useQuery<HotelSettings>({
    queryKey: ['hotel-settings'],
    queryFn: async () => {
      const data = await graphqlRequest<{ hotelSettings: HotelSettings }>(`
        query GetHotelSettings {
          hotelSettings { id name address city timezone currency contactEmail contactPhone brand { name primaryColor theme logoUrl } }
        }
      `);
      return data.hotelSettings;
    },
  });
};

export const useBranding = (enabled: boolean = true) => {
  return useQuery<BrandConfig>({
    queryKey: ['branding'],
    queryFn: async () => {
      const data = await graphqlRequest<{ branding: BrandConfig }>(`
        query GetBranding { branding { name primaryColor theme logoUrl font } }
      `);
      return data.branding;
    },
    enabled,
    staleTime: 1000 * 60 * 30,
  });
};

export const useUpdateHotelSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Partial<HotelSettings>) => {
      return graphqlRequest(`
        mutation UpdateHotelSettings($input: HotelSettingsInput!) {
          updateHotelSettings(input: $input) { success }
        }
      `, { input: payload });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotel-settings'] });
      queryClient.invalidateQueries({ queryKey: ['branding'] });
    },
  });
};

export const useUsers = () => {
  return useQuery<AppUser[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const data = await graphqlRequest<{ staffUsers: AppUser[] }>(`
        query GetStaffUsers { staffUsers { id name email role active lastLogin } }
      `);
      return data.staffUsers;
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateUserPayload) => {
      return graphqlRequest(`
        mutation CreateUser($input: CreateUserInput!) {
          createUser(input: $input) { success }
        }
      `, { input: payload });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useToggleUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      return graphqlRequest(`
        mutation ToggleUserStatus($id: ID!, $active: Boolean!) {
          toggleUserStatus(id: $id, active: $active) { success }
        }
      `, { id, active });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
