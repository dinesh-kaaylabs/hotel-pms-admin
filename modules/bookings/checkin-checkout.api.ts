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

/**
 * Available room entity for check-in
 * Simplified room representation for room assignment during check-in
 * 
 * @property id - Unique room identifier (UUID)
 * @property number - Physical room number (e.g., "101")
 * @property floor - Floor number
 * @property status - Current room status (e.g., "CLEAN", "AVAILABLE")
 * @property roomType - Room type details
 * @property roomType.id - Room type identifier
 * @property roomType.name - Room type display name
 */
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

/**
 * Check-in input payload
 * Data required to complete guest check-in process
 * 
 * @property roomId - Room to assign to guest (required)
 * @property guestIdDocument - Scanned/uploaded ID document reference (optional)
 * @property paymentMethod - Payment method for advance/deposit (optional)
 * @property specialRequests - Guest special requests (optional, free-text)
 * 
 * @remarks
 * - Backend validates room availability before check-in
 * - Backend updates room status to OCCUPIED
 * - Backend may require payment/deposit based on hotel policy
 */
export interface CheckInInput {
  roomId: string;
  guestIdDocument?: string;
  paymentMethod?: string;
  specialRequests?: string;
}

/**
 * Additional charge line item
 * Used for adding extra charges during check-out (minibar, room service, etc.)
 * 
 * @property description - Charge description (e.g., "Minibar", "Laundry")
 * @property amount - Charge amount (backend validates and calculates tax)
 * @property category - Charge category for reporting (e.g., "F&B", "Services")
 * 
 * @remarks
 * - Backend calculates GST/tax on additional charges
 * - Backend validates charge categories
 */
export interface AdditionalChargeInput {
  description: string;
  amount: number;
  category: string;
}

/**
 * Check-out input payload
 * Data required to complete guest check-out and settlement
 * 
 * @property additionalCharges - Extra charges to add to final bill (optional)
 * @property paymentMethod - Payment method for settlement (required)
 * @property paymentAmount - Amount being paid (backend validates against outstanding balance)
 * @property guestFeedback - Guest feedback/comments (optional, free-text)
 * 
 * @remarks
 * - Backend calculates final bill including additional charges and taxes
 * - Backend generates GST-compliant invoice
 * - Backend updates room status to DIRTY for housekeeping
 * - Backend may allow partial payment based on hotel policy
 */
export interface CheckOutInput {
  additionalCharges?: AdditionalChargeInput[];
  paymentMethod: string;
  paymentAmount: number;
  guestFeedback?: string;
}

/**
 * Payment recording input
 * Used for recording payments against a booking (advance, partial, full)
 * 
 * @property bookingId - Booking to record payment against (required)
 * @property amount - Payment amount (backend validates)
 * @property method - Payment method (e.g., "CASH", "CREDIT_CARD", "UPI")
 * @property transactionId - Gateway transaction reference (optional)
 * @property notes - Internal payment notes (optional)
 * 
 * @remarks
 * - Backend updates booking payment status
 * - Backend validates payment amount against outstanding balance
 * - Backend records transaction for audit trail
 */
export interface RecordPaymentInput {
  bookingId: string;
  amount: number;
  method: string;
  transactionId?: string;
  notes?: string;
}

/**
 * Refund processing input
 * Used for initiating refund requests (may require approval workflow)
 * 
 * @property bookingId - Booking to refund (required)
 * @property amount - Refund amount (backend validates against paid amount)
 * @property reason - Refund reason (required for audit)
 * @property refundMethod - Refund method (e.g., "ORIGINAL_PAYMENT_METHOD", "BANK_TRANSFER")
 * 
 * @remarks
 * - Backend may require approval for refunds above threshold
 * - Backend integrates with payment gateway for refund processing
 * - Backend updates booking payment status
 */
export interface RefundInput {
  bookingId: string;
  amount: number;
  reason: string;
  refundMethod: string;
}

/**
 * Check-in operation response
 * Response from check-in mutation
 * 
 * @property success - Operation success flag
 * @property message - User-friendly success/error message
 * @property booking - Updated booking entity with check-in details
 */
export interface CheckInResponse {
  success: boolean;
  message: string;
  booking: Booking;
}

/**
 * Check-out operation response
 * Response from check-out mutation
 * 
 * @property success - Operation success flag
 * @property message - User-friendly success/error message
 * @property booking - Updated booking entity with check-out details
 * @property invoice - Generated invoice details
 * @property invoice.id - Invoice identifier
 * @property invoice.invoiceNumber - Human-readable invoice number
 * @property invoice.pdfUrl - Signed URL for downloadable PDF invoice
 */
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

/**
 * GST-compliant invoice entity (detailed)
 * Complete invoice with line items for check-out and billing
 * 
 * @property id - Unique invoice identifier (UUID)
 * @property invoiceNumber - Sequential invoice number (e.g., INV-2026-001)
 * @property issueDate - Invoice generation date (ISO 8601)
 * @property booking - Booking reference
 * @property guest - Guest details for invoice
 * @property guest.gstin - Guest GSTIN for B2B invoices (India-specific)
 * @property lineItems - Invoice line items with HSN codes and tax breakdown
 * @property subtotal - Pre-tax total (backend-calculated)
 * @property gstAmount - Total GST amount (backend-calculated)
 * @property totalAmount - Final amount including tax (backend-calculated)
 * @property pdfUrl - Signed URL for downloadable PDF invoice
 * 
 * @remarks
 * - All amounts are backend-calculated
 * - HSN/SAC codes are backend-provided for GST compliance
 * - PDF generation is handled by backend service
 * - Invoice is immutable once generated
 */
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

/**
 * Invoice generation response
 * Response from generate invoice mutation
 * 
 * @property success - Operation success flag
 * @property message - User-friendly success/error message
 * @property invoice - Generated invoice entity
 */
export interface GenerateInvoiceResponse {
  success: boolean;
  message: string;
  invoice: Invoice;
}

/**
 * Payment transaction entity
 * Represents a recorded payment transaction
 * 
 * @property id - Unique payment identifier (UUID)
 * @property amount - Transaction amount
 * @property method - Payment method used
 * @property status - Payment status (e.g., "SUCCESS", "PENDING", "FAILED")
 * @property transactionId - Gateway transaction reference
 * @property timestamp - Payment timestamp (ISO 8601 datetime)
 */
export interface Payment {
  id: string;
  amount: number;
  method: string;
  status: string;
  transactionId?: string;
  timestamp: string;
}

/**
 * Payment recording response
 * Response from record payment mutation
 * 
 * @property success - Operation success flag
 * @property message - User-friendly success/error message
 * @property payment - Recorded payment entity
 */
export interface RecordPaymentResponse {
  success: boolean;
  message: string;
  payment: Payment;
}

/**
 * Refund entity
 * Represents a processed or pending refund
 * 
 * @property id - Unique refund identifier (UUID)
 * @property amount - Refund amount
 * @property status - Refund status (e.g., "PENDING", "APPROVED", "PROCESSED", "REJECTED")
 * @property reason - Refund reason (audit trail)
 * @property approvedBy - Staff member who approved refund (if applicable)
 * @property processedAt - Refund processing timestamp (ISO 8601 datetime)
 * 
 * @remarks
 * - Refunds may require approval workflow based on amount threshold
 * - Backend integrates with payment gateway for refund processing
 */
export interface Refund {
  id: string;
  amount: number;
  status: string;
  reason: string;
  approvedBy?: string;
  processedAt?: string;
}

/**
 * Refund processing response
 * Response from process refund mutation
 * 
 * @property success - Operation success flag
 * @property message - User-friendly success/error message
 * @property refund - Processed refund entity
 */
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
