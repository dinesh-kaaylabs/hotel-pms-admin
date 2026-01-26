
export type PaymentStatus = 'CREATED' | 'AUTHORIZED' | 'CAPTURED' | 'FAILED' | 'REFUNDED';

export type PaymentMethod = 'CARD' | 'UPI' | 'NETBANKING' | 'WALLET' | 'CASH' | 'OTA';

export type PaymentProvider = 'RAZORPAY' | 'STRIPE' | 'CASH' | 'OTA';

export interface Payment {
  id: string;
  hotelId?: string;
  bookingId: string;
  bookingNumber: string;
  provider: PaymentProvider;
  providerPaymentId?: string;
  paymentGatewayRef?: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  currency: string;
  settlementStatus?: string;
  businessDate?: string;
  createdAt: string;
  refunds?: Array<{
    amount: number;
    reason: string;
    date: string;
  }>;
}

export interface PaymentFilters {
  search?: string;
  status?: PaymentStatus;
  provider?: PaymentProvider;
}
