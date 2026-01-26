/**
 * GraphQL Operations for Check-in / Check-out Workflow
 * Phase 1 - Go-Live Ready PMS
 * 
 * Backend is SINGLE source of truth for:
 * - Room availability
 * - Price calculations
 * - Tax calculations
 * - Invoice generation
 */

// ============================================================================
// ENUMS
// ============================================================================

export const BOOKING_STATUS_ENUM = `
  enum BookingStatus {
    CONFIRMED
    CHECKED_IN
    CHECKED_OUT
    CANCELLED
    PENDING
  }
`;

export const ROOM_STATUS_ENUM = `
  enum RoomStatus {
    AVAILABLE
    OCCUPIED
    DIRTY
    MAINTENANCE
    RESERVED
  }
`;

export const PAYMENT_METHOD_ENUM = `
  enum PaymentMethod {
    CASH
    CREDIT_CARD
    UPI
    BANK_TRANSFER
  }
`;

export const REFUND_METHOD_ENUM = `
  enum RefundMethod {
    SAME_METHOD
    BANK_TRANSFER
    CASH
  }
`;

export const REFUND_REASON_ENUM = `
  enum RefundReason {
    CANCELLATION
    NO_SHOW
    COMPLAINT
    OTHER
  }
`;

export const REFUND_STATUS_ENUM = `
  enum RefundStatus {
    PENDING
    APPROVED
    PROCESSED
    FAILED
  }
`;

export const ADDITIONAL_CHARGE_CATEGORY_ENUM = `
  enum AdditionalChargeCategory {
    MINIBAR
    DAMAGE
    LATE_CHECKOUT
    EXTRA_SERVICE
    OTHER
  }
`;

// ============================================================================
// INPUT TYPES
// ============================================================================

export const CHECK_IN_INPUT = `
  input CheckInInput {
    roomId: ID!
    guestIdDocument: String
    paymentMethod: PaymentMethod
    specialRequests: String
    idempotencyKey: String
  }
`;

export const CHECK_OUT_INPUT = `
  input CheckOutInput {
    additionalCharges: [AdditionalChargeInput!]
    paymentMethod: PaymentMethod!
    paymentAmount: Float!
    guestFeedback: String
    idempotencyKey: String
  }
`;

export const ADDITIONAL_CHARGE_INPUT = `
  input AdditionalChargeInput {
    description: String!
    amount: Float!
    category: AdditionalChargeCategory!
  }
`;

export const RECORD_PAYMENT_INPUT = `
  input RecordPaymentInput {
    bookingId: ID!
    amount: Float!
    method: PaymentMethod!
    transactionId: String
    notes: String
    idempotencyKey: String
  }
`;

export const REFUND_INPUT = `
  input RefundInput {
    bookingId: ID!
    amount: Float!
    reason: RefundReason!
    refundMethod: RefundMethod!
  }
`;

// ============================================================================
// TYPES
// ============================================================================

export const ROOM_TYPE = `
  type RoomType {
    id: ID!
    name: String!
  }
`;

export const ROOM = `
  type Room {
    id: ID!
    number: String!
    floor: Int!
    status: RoomStatus!
    roomType: RoomType!
  }
`;

export const GUEST = `
  type Guest {
    id: ID!
    name: String!
    email: String!
    gstin: String
  }
`;

export const BOOKING = `
  type Booking {
    id: ID!
    bookingNumber: String!
    status: BookingStatus!
    room: Room
    guest: Guest!
    checkInDate: String!
    checkOutDate: String!
    totalAmount: Float!
    paidAmount: Float!
    outstandingAmount: Float!
  }
`;

export const INVOICE_LINE_ITEM = `
  type InvoiceLineItem {
    description: String!
    quantity: Int!
    unitPrice: Float!
    amount: Float!
    hsnCode: String!
    taxRate: Float!
    taxAmount: Float!
  }
`;

export const INVOICE = `
  type Invoice {
    id: ID!
    invoiceNumber: String!
    issueDate: String!
    booking: Booking!
    guest: Guest!
    lineItems: [InvoiceLineItem!]!
    subtotal: Float!
    gstAmount: Float!
    totalAmount: Float!
    pdfUrl: String
  }
`;

export const PAYMENT = `
  type Payment {
    id: ID!
    amount: Float!
    method: PaymentMethod!
    status: String!
    transactionId: String
    timestamp: String!
  }
`;

export const REFUND = `
  type Refund {
    id: ID!
    amount: Float!
    status: RefundStatus!
    reason: RefundReason!
    approvedBy: String
    processedAt: String
  }
`;

export const CHECK_IN_RESPONSE = `
  type CheckInResponse {
    success: Boolean!
    message: String!
    booking: Booking!
  }
`;

export const CHECK_OUT_RESPONSE = `
  type CheckOutResponse {
    success: Boolean!
    message: String!
    booking: Booking!
    invoice: Invoice!
  }
`;

export const GENERATE_INVOICE_RESPONSE = `
  type GenerateInvoiceResponse {
    success: Boolean!
    message: String!
    invoice: Invoice!
  }
`;

export const RECORD_PAYMENT_RESPONSE = `
  type RecordPaymentResponse {
    success: Boolean!
    message: String!
    payment: Payment!
  }
`;

export const PROCESS_REFUND_RESPONSE = `
  type ProcessRefundResponse {
    success: Boolean!
    message: String!
    refund: Refund!
  }
`;

// ============================================================================
// QUERIES
// ============================================================================

export const AVAILABLE_ROOMS_QUERY = `
  query AvailableRooms($roomTypeId: ID!, $checkInDate: String!, $checkOutDate: String!) {
    availableRooms(roomTypeId: $roomTypeId, checkInDate: $checkInDate, checkOutDate: $checkOutDate) {
      id
      number
      floor
      status
      roomType {
        id
        name
      }
    }
  }
`;

// ============================================================================
// MUTATIONS
// ============================================================================

export const CHECK_IN_MUTATION = `
  mutation CheckIn($bookingId: ID!, $input: CheckInInput!) {
    checkIn(bookingId: $bookingId, input: $input) {
      success
      message
      booking {
        id
        status
        room {
          id
          number
          status
        }
      }
    }
  }
`;

export const CHECK_OUT_MUTATION = `
  mutation CheckOut($bookingId: ID!, $input: CheckOutInput!) {
    checkOut(bookingId: $bookingId, input: $input) {
      success
      message
      booking {
        id
        status
      }
      invoice {
        id
        invoiceNumber
        pdfUrl
      }
    }
  }
`;

export const GENERATE_INVOICE_MUTATION = `
  mutation GenerateInvoice($bookingId: ID!) {
    generateInvoice(bookingId: $bookingId) {
      success
      message
      invoice {
        id
        invoiceNumber
        issueDate
        booking {
          id
          bookingNumber
        }
        guest {
          name
          email
          gstin
        }
        lineItems {
          description
          quantity
          unitPrice
          amount
          hsnCode
          taxRate
          taxAmount
        }
        subtotal
        gstAmount
        totalAmount
        pdfUrl
      }
    }
  }
`;

export const RECORD_PAYMENT_MUTATION = `
  mutation RecordPayment($input: RecordPaymentInput!) {
    recordPayment(input: $input) {
      success
      message
      payment {
        id
        amount
        method
        status
        transactionId
        timestamp
      }
    }
  }
`;

export const PROCESS_REFUND_MUTATION = `
  mutation ProcessRefund($input: RefundInput!) {
    processRefund(input: $input) {
      success
      message
      refund {
        id
        amount
        status
        reason
        approvedBy
        processedAt
      }
    }
  }
`;
