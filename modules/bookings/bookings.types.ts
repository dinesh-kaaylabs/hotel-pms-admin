
export enum BookingStatus {
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  CHECKED_IN = 'CHECKED_IN',
  CHECKED_OUT = 'CHECKED_OUT',
  PENDING = 'PENDING'
}

export enum PaymentStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

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
  paidAmount?: number; // Backend-provided: total amount paid
  outstandingAmount?: number; // Backend-provided: amount still owed
  finalAmount?: number; // Backend-provided: final amount including additional charges
  gstAmount?: number; // Backend-provided: GST amount
  source?: string; // Booking source (Direct, Booking.com, Expedia, etc.)
  sourceId?: string; // Source identifier
  arrivalTime?: string; // Expected arrival time
  departureTime?: string; // Expected departure time
  cancellationPolicy?: string; // Cancellation policy details
  noShowPolicy?: string; // No-show policy details
  assignedAt?: string; // When room was assigned
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface Invoice {
  invoiceNumber: string;
  issueDate: string;
  taxAmount: number;
  netAmount: number;
  totalAmount: number;
  pdfUrl: string;
}

export interface Payment {
  id: string;
  method: 'CREDIT_CARD' | 'CASH' | 'BANK_TRANSFER';
  status: PaymentStatus;
  amount: number;
  transactionId: string;
  timestamp: string;
}
