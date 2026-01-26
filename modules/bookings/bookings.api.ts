import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlRequest } from '../../api/graphqlRequest';
import { Booking, BookingStatus, PaginatedResponse, Invoice, Payment } from './bookings.types';
import { BOOKINGS_QUERY, BOOKINGS_PAGINATED_QUERY, UPDATE_BOOKING_STATUS_MUTATION } from '../../graphql/booking.gql';

export const useBookings = (params: { page: number; pageSize: number; search?: string; status?: string }) => {
  return useQuery<PaginatedResponse<Booking>>({
    queryKey: ['bookings', params],
    queryFn: async () => {
      // Try paginated query first, fallback to legacy if not supported
      try {
        const data = await graphqlRequest<{ bookingsPaginated: PaginatedResponse<Booking> }>(
          BOOKINGS_PAGINATED_QUERY, 
          params
        );
        return data.bookingsPaginated;
      } catch (err: any) {
        // Fallback to legacy query if paginated not available
        if (err.extensions?.code === 'FIELD_NOT_FOUND' || err.message?.includes('bookingsPaginated')) {
          const data = await graphqlRequest<{ bookings: Booking[] }>(BOOKINGS_QUERY, params);
          
          // Client-side pagination fallback (limited functionality)
          // Note: This won't have accurate totalCount for server-side filtering
          return {
            data: data.bookings,
            totalCount: data.bookings.length, // Inaccurate - only current page count
            page: params.page,
            pageSize: params.pageSize
          };
        }
        throw err;
      }
    },
    placeholderData: (previousData) => previousData,
  });
};

export const useBookingDetails = (id: string | null) => {
  return useQuery<Booking>({
    queryKey: ['bookings', id],
    queryFn: async () => {
      const data = await graphqlRequest<{ booking: Booking }>(`
        query GetBooking($id: ID!) {
          booking(id: $id) {
            id bookingNumber hotelId guestId guestName roomType roomNumber checkInDate checkOutDate status paymentStatus totalAmount paidAmount outstandingAmount finalAmount gstAmount source sourceId arrivalTime departureTime cancellationPolicy noShowPolicy assignedAt createdAt
          }
        }
      `, { id });
      return data.booking;
    },
    enabled: !!id,
  });
};

// Fix: Added missing useBookingInvoice hook to resolve module export error in BookingInvoicePanel.tsx
export const useBookingInvoice = (bookingId: string | null, enabled: boolean = true) => {
  return useQuery<Invoice>({
    queryKey: ['bookings', 'invoice', bookingId],
    queryFn: async () => {
      const data = await graphqlRequest<{ bookingInvoice: Invoice }>(`
        query GetBookingInvoice($bookingId: ID!) {
          bookingInvoice(bookingId: $bookingId) {
            invoiceNumber issueDate taxAmount netAmount totalAmount pdfUrl
          }
        }
      `, { bookingId });
      return data.bookingInvoice;
    },
    enabled: enabled && !!bookingId,
  });
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: BookingStatus }) => {
      return graphqlRequest<{ updateBookingStatus: { success: boolean } }>(UPDATE_BOOKING_STATUS_MUTATION, { bookingId: id, status });
    },
    onSuccess: (_, variables) => {
      // Update specific booking in cache
      queryClient.setQueriesData<PaginatedResponse<Booking>>(
        { queryKey: ['bookings'] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.map(booking => 
              booking.id === variables.id ? { ...booking, status: variables.status } : booking
            ),
          };
        }
      );
      
      // Only invalidate the specific booking details query
      queryClient.invalidateQueries({ 
        queryKey: ['bookings', variables.id],
        exact: true 
      });
    },
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      guestId: string;
      roomTypeId: string;
      checkInDate: string;
      checkOutDate: string;
      specialRequests?: string;
    }) => {
      const data = await graphqlRequest<{ createBooking: Booking }>(`
        mutation CreateBooking($input: CreateBookingInput!) {
          createBooking(input: $input) {
            id bookingNumber status totalAmount
          }
        }
      `, { input });
      return data.createBooking;
    },
    onSuccess: () => {
      // Invalidate bookings list (new booking should appear)
      queryClient.invalidateQueries({ 
        queryKey: ['bookings'],
        exact: false 
      });
      
      // Also invalidate room inventory as availability changed
      queryClient.invalidateQueries({ 
        queryKey: ['room-inventory'],
        exact: false 
      });
    },
  });
};

export const useBookingPricing = (roomTypeId: string | null, checkInDate: string, checkOutDate: string) => {
  return useQuery({
    queryKey: ['booking-pricing', roomTypeId, checkInDate, checkOutDate],
    queryFn: async () => {
      const data = await graphqlRequest<{ bookingPricing: {
        baseAmount: number;
        taxAmount: number;
        totalAmount: number;
        currency: string;
        breakdown: Array<{ date: string; rate: number; nights: number }>;
      } }>(`
        query GetBookingPricing($roomTypeId: ID!, $checkInDate: String!, $checkOutDate: String!) {
          bookingPricing(roomTypeId: $roomTypeId, checkInDate: $checkInDate, checkOutDate: $checkOutDate) {
            baseAmount taxAmount totalAmount currency
            breakdown { date rate nights }
          }
        }
      `, { roomTypeId, checkInDate, checkOutDate });
      return data.bookingPricing;
    },
    enabled: !!roomTypeId && !!checkInDate && !!checkOutDate,
  });
};
