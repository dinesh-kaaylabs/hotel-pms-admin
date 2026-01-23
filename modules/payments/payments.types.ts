
export type PaymentStatus = 'CREATED' | 'AUTHORIZED' | 'CAPTURED' | 'FAILED' | 'REFUNDED';

export type PaymentMethod = 'CARD' | 'UPI' | 'NETBANKING' | 'WALLET' | 'CASH' | 'OTA';

export type PaymentProvider = 'RAZORPAY' | 'STRIPE' | 'CASH' | 'OTA';

export interface Payment {
  id: string;
  bookingId: string;
  bookingNumber: string;
  provider: PaymentProvider;
  providerPaymentId?: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  currency: string;
  createdAt: string;
}

export interface PaymentFilters {
  search?: string;
  status?: PaymentStatus;
  provider?: PaymentProvider;
}
