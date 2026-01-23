import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlRequest } from '../../api/graphqlRequest';
import { Guest, GuestStay, GuestNote, GuestFilters } from './guests.types';
import { 
  GUESTS_QUERY, 
  GUEST_PROFILE_QUERY, 
  GUEST_STAYS_QUERY, 
  GUEST_NOTES_QUERY, 
  ADD_GUEST_NOTE_MUTATION 
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

export const useGuestStays = (id: string | undefined) => {
  return useQuery<GuestStay[]>({
    queryKey: ['guests', 'stays', id],
    queryFn: async () => {
      const data = await graphqlRequest<{ guestStays: GuestStay[] }>(GUEST_STAYS_QUERY, { id });
      return data.guestStays;
    },
    enabled: !!id,
  });
};

export const useGuestNotes = (id: string | undefined) => {
  return useQuery<GuestNote[]>({
    queryKey: ['guests', 'notes', id],
    queryFn: async () => {
      const data = await graphqlRequest<{ guestNotes: GuestNote[] }>(GUEST_NOTES_QUERY, { id });
      return data.guestNotes;
    },
    enabled: !!id,
  });
};

export const useAddGuestNote = (guestId: string | undefined) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (note: string) => {
      return graphqlRequest<{ addGuestNote: GuestNote }>(ADD_GUEST_NOTE_MUTATION, { guestId, note });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guests', 'notes', guestId] });
    },
  });
};
