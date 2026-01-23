/**
 * API Hooks for Check-in / Check-out Workflow
 * Phase 1 - Go-Live Ready PMS
 * 
 * Uses React Query for all API calls
 * Backend is source of truth (no calculations in UI)
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlRequest } from '../../api/graphqlRequest';
import {
  CHECK_IN_MUTATION,
  CHECK_OUT_MUTATION,
  GENERATE_INVOICE_MUTATION,
  RECORD_PAYMENT_MUTATION,
  PROCESS_REFUND_MUTATION,
  AVAILABLE_ROOMS_QUERY,
} from '../../graphql/checkin-checkout.gql';
import { Booking } from './bookings.types';

// ============================================================================
// TYPES
// ============================================================================

export interface Room {
  id: string;
  number: string;
  floor: number;
  status: string;
  roomType: {
    id: string;
    name: string;
  };
}

export interface CheckInInput {
  roomId: string;
  guestIdDocument?: string;
  paymentMethod?: string;
  specialRequests?: string;
}

export interface AdditionalChargeInput {
  description: string;
  amount: number;
  category: string;
}

export interface CheckOutInput {
  additionalCharges?: AdditionalChargeInput[];
  paymentMethod: string;
  paymentAmount: number;
  guestFeedback?: string;
}

export interface RecordPaymentInput {
  bookingId: string;
  amount: number;
  method: string;
  transactionId?: string;
  notes?: string;
}

export interface RefundInput {
  bookingId: string;
  amount: number;
  reason: string;
  refundMethod: string;
}

export interface CheckInResponse {
  success: boolean;
  message: string;
  booking: Booking;
}

export interface CheckOutResponse {
  success: boolean;
  message: string;
  booking: Booking;
  invoice: {
    id: string;
    invoiceNumber: string;
    pdfUrl?: string;
  };
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  booking: {
    id: string;
    bookingNumber: string;
  };
  guest: {
    name: string;
    email: string;
    gstin?: string;
  };
  lineItems: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
    hsnCode: string;
    taxRate: number;
    taxAmount: number;
  }>;
  subtotal: number;
  gstAmount: number;
  totalAmount: number;
  pdfUrl?: string;
}

export interface GenerateInvoiceResponse {
  success: boolean;
  message: string;
  invoice: Invoice;
}

export interface Payment {
  id: string;
  amount: number;
  method: string;
  status: string;
  transactionId?: string;
  timestamp: string;
}

export interface RecordPaymentResponse {
  success: boolean;
  message: string;
  payment: Payment;
}

export interface Refund {
  id: string;
  amount: number;
  status: string;
  reason: string;
  approvedBy?: string;
  processedAt?: string;
}

export interface ProcessRefundResponse {
  success: boolean;
  message: string;
  refund: Refund;
}

// ============================================================================
// QUERIES
// ============================================================================

export const useAvailableRooms = (
  roomTypeId: string | null,
  checkInDate: string,
  checkOutDate: string,
) => {
  return useQuery<Room[]>({
    queryKey: ['availableRooms', roomTypeId, checkInDate, checkOutDate],
    queryFn: async () => {
      const data = await graphqlRequest<{ availableRooms: Room[] }>(
        AVAILABLE_ROOMS_QUERY,
        { roomTypeId, checkInDate, checkOutDate }
      );
      return data.availableRooms;
    },
    enabled: !!roomTypeId && !!checkInDate && !!checkOutDate,
  });
};

// ============================================================================
// MUTATIONS
// ============================================================================

export const useCheckIn = () => {
  const queryClient = useQueryClient();
  
  return useMutation<CheckInResponse, Error, { bookingId: string; input: CheckInInput }>({
    mutationFn: async ({ bookingId, input }) => {
      const data = await graphqlRequest<{ checkIn: CheckInResponse }>(
        CHECK_IN_MUTATION,
        { bookingId, input }
      );
      return data.checkIn;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['availableRooms'] });
    },
  });
};

export const useCheckOut = () => {
  const queryClient = useQueryClient();
  
  return useMutation<CheckOutResponse, Error, { bookingId: string; input: CheckOutInput }>({
    mutationFn: async ({ bookingId, input }) => {
      const data = await graphqlRequest<{ checkOut: CheckOutResponse }>(
        CHECK_OUT_MUTATION,
        { bookingId, input }
      );
      return data.checkOut;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });
};

export const useGenerateInvoice = () => {
  const queryClient = useQueryClient();
  
  return useMutation<GenerateInvoiceResponse, Error, string>({
    mutationFn: async (bookingId: string) => {
      const data = await graphqlRequest<{ generateInvoice: GenerateInvoiceResponse }>(
        GENERATE_INVOICE_MUTATION,
        { bookingId }
      );
      return data.generateInvoice;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });
};

export const useRecordPayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation<RecordPaymentResponse, Error, RecordPaymentInput>({
    mutationFn: async (input: RecordPaymentInput) => {
      const data = await graphqlRequest<{ recordPayment: RecordPaymentResponse }>(
        RECORD_PAYMENT_MUTATION,
        { input }
      );
      return data.recordPayment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
};

export const useProcessRefund = () => {
  const queryClient = useQueryClient();
  
  return useMutation<ProcessRefundResponse, Error, RefundInput>({
    mutationFn: async (input: RefundInput) => {
      const data = await graphqlRequest<{ processRefund: ProcessRefundResponse }>(
        PROCESS_REFUND_MUTATION,
        { input }
      );
      return data.processRefund;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
};
