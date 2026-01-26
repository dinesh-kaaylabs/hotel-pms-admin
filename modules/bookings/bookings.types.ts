/**
 * Booking lifecycle status enum
 * Represents the current state of a booking from creation to completion
 */
export enum BookingStatus {
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  CHECKED_IN = 'CHECKED_IN',
  CHECKED_OUT = 'CHECKED_OUT',
  PENDING = 'PENDING'
}

/**
 * Payment status enum
 * Tracks the financial settlement status of a booking
 */
export enum PaymentStatus {
  PAID = 'PAID',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

/**
 * Core booking entity
 * Represents a guest reservation with room assignment, dates, and payment details
 * 
 * @property id - Unique booking identifier (UUID)
 * @property bookingNumber - Human-readable booking reference (e.g., BK-2026-001)
 * @property hotelId - Hotel context identifier (multi-tenancy)
 * @property guestId - Reference to guest profile
 * @property guestName - Guest full name (denormalized for quick access)
 * @property roomType - Room category (e.g., "Deluxe", "Suite")
 * @property roomNumber - Assigned room number (e.g., "101")
 * @property checkInDate - ISO 8601 date string (e.g., "2026-01-26")
 * @property checkOutDate - ISO 8601 date string
 * @property status - Current booking lifecycle state
 * @property paymentStatus - Current payment settlement state
 * @property totalAmount - Base booking amount (backend-calculated, includes room rate)
 * @property paidAmount - Total amount paid so far (backend-provided)
 * @property outstandingAmount - Remaining balance due (backend-calculated)
 * @property finalAmount - Final amount including additional charges (backend-calculated)
 * @property gstAmount - GST/tax amount (backend-calculated, India-specific)
 * @property source - Booking channel (e.g., "Direct", "Booking.com", "Expedia")
 * @property sourceId - External booking reference from OTA
 * @property arrivalTime - Expected guest arrival time (ISO 8601 datetime)
 * @property departureTime - Expected guest departure time (ISO 8601 datetime)
 * @property cancellationPolicy - Cancellation terms (free-text or policy code)
 * @property noShowPolicy - No-show penalty terms
 * @property assignedAt - Timestamp when room was assigned (ISO 8601 datetime)
 * @property createdAt - Booking creation timestamp (ISO 8601 datetime)
 * 
 * @remarks
 * - All monetary calculations are performed by backend (frontend never calculates prices)
 * - Dates are stored as ISO 8601 strings for timezone consistency
 * - Backend is source of truth for all financial fields
 */
export interface Booking {
  id: string;
  bookingNumber: string;
  hotelId?: string;
  guestId?: string;
  guestName: string;
  roomType: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  paidAmount?: number;
  outstandingAmount?: number;
  finalAmount?: number;
  gstAmount?: number;
  source?: string;
  sourceId?: string;
  arrivalTime?: string;
  departureTime?: string;
  cancellationPolicy?: string;
  noShowPolicy?: string;
  assignedAt?: string;
  createdAt: string;
}

/**
 * Generic paginated response wrapper
 * Used for all list endpoints to provide consistent pagination metadata
 * 
 * @template T - The type of items in the data array
 * @property data - Array of items for current page
 * @property totalCount - Total number of items across all pages
 * @property page - Current page number (1-indexed)
 * @property pageSize - Number of items per page
 * 
 * @example
 * ```typescript
 * const response: PaginatedResponse<Booking> = {
 *   data: [...],
 *   totalCount: 150,
 *   page: 1,
 *   pageSize: 20
 * };
 * ```
 */
export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

/**
 * GST-compliant invoice entity
 * Represents a tax invoice generated for a booking (India-specific)
 * 
 * @property invoiceNumber - Sequential invoice number (e.g., INV-2026-001)
 * @property issueDate - Invoice generation date (ISO 8601)
 * @property taxAmount - Total GST amount (backend-calculated)
 * @property netAmount - Pre-tax amount (backend-calculated)
 * @property totalAmount - Final amount including tax (backend-calculated)
 * @property pdfUrl - Signed URL for downloadable PDF invoice
 * 
 * @remarks
 * - All amounts are backend-calculated and include proper HSN/SAC codes
 * - PDF generation is handled by backend service
 */
export interface Invoice {
  invoiceNumber: string;
  issueDate: string;
  taxAmount: number;
  netAmount: number;
  totalAmount: number;
  pdfUrl: string;
}

/**
 * Payment transaction record
 * Represents a single payment transaction for a booking
 * 
 * @property id - Unique payment identifier (UUID)
 * @property method - Payment method used
 * @property status - Current payment status
 * @property amount - Transaction amount
 * @property transactionId - Gateway transaction reference (e.g., Razorpay/Stripe ID)
 * @property timestamp - Payment timestamp (ISO 8601 datetime)
 * 
 * @remarks
 * - Payment processing is handled by backend gateway integration
 * - Frontend only displays payment records, never processes payments
 */
export interface Payment {
  id: string;
  method: 'CREDIT_CARD' | 'CASH' | 'BANK_TRANSFER';
  status: PaymentStatus;
  amount: number;
  transactionId: string;
  timestamp: string;
}
