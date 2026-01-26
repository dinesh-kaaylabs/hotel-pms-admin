import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlRequest } from '../../api/graphqlRequest';
import { Guest, GuestStay, GuestNote, GuestFilters } from './guests.types';
import { 
  GUESTS_QUERY, 
  GUEST_PROFILE_QUERY, 
  GUEST_STAYS_QUERY, 
  GUEST_NOTES_QUERY, 
  ADD_GUEST_NOTE_MUTATION,
  CREATE_GUEST_MUTATION,
  UPDATE_GUEST_MUTATION,
  DELETE_GUEST_MUTATION
} from '../../graphql/crm.gql';

export const useGuests = (filters?: GuestFilters) => {
  return useQuery<Guest[]>({
    queryKey: ['guests', filters],
    queryFn: async () => {
      const data = await graphqlRequest<{ guests: Guest[] }>(GUESTS_QUERY, { filters });
      return data.guests;
    },
  });
};

export const useGuestProfile = (id: string | undefined) => {
  return useQuery<Guest>({
    queryKey: ['guests', 'profile', id],
    queryFn: async () => {
      const data = await graphqlRequest<{ guest: Guest }>(GUEST_PROFILE_QUERY, { id });
      return data.guest;
    },
    enabled: !!id,
  });
};

export const useGuestStays = (guestId?: string) => {
  return useQuery<GuestStay[]>({
    queryKey: ['guests', 'stays', guestId],
    queryFn: async () => {
      const data = await graphqlRequest<{ guestStays: GuestStay[] }>(GUEST_STAYS_QUERY, { guestId });
      return data.guestStays;
    },
    enabled: true, // Always enabled, filtering happens server-side
  });
};

export const useGuestNotes = (guestId?: string) => {
  return useQuery<GuestNote[]>({
    queryKey: ['guests', 'notes', guestId],
    queryFn: async () => {
      const data = await graphqlRequest<{ guestNotes: GuestNote[] }>(GUEST_NOTES_QUERY, { guestId });
      return data.guestNotes;
    },
    enabled: true, // Always enabled, filtering happens server-side
  });
};

export const useAddGuestNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ guestId, content }: { guestId: string; content: string }) => {
      return graphqlRequest<{ addGuestNote: GuestNote }>(ADD_GUEST_NOTE_MUTATION, { guestId, content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guests', 'notes'] });
    },
  });
};

export const useCreateGuest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: Partial<Guest>) => {
      const data = await graphqlRequest<{ createGuest: Guest }>(CREATE_GUEST_MUTATION, { input });
      return data.createGuest;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guests'] });
    },
  });
};

export const useUpdateGuest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: Partial<Guest> }) => {
      const data = await graphqlRequest<{ updateGuest: Guest }>(UPDATE_GUEST_MUTATION, { id, input });
      return data.updateGuest;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guests'] });
    },
  });
};

export const useDeleteGuest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const data = await graphqlRequest<{ deleteGuest: { success: boolean } }>(DELETE_GUEST_MUTATION, { id });
      return data.deleteGuest;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guests'] });
    },
  });
};

export const useExportGuests = () => {
  return useMutation({
    mutationFn: async (filters?: GuestFilters) => {
      const data = await graphqlRequest<{ exportGuests: { downloadUrl: string; filename: string } }>(`
        query ExportGuests($filters: GuestFilters) {
          exportGuests(filters: $filters) {
            downloadUrl filename
          }
        }
      `, { filters });
      return data.exportGuests;
    },
  });
};
