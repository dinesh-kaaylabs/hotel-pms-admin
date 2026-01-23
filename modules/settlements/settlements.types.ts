
export type SettlementSource = 'RAZORPAY' | 'BOOKING_COM' | 'EXPEDIA' | 'AGODA' | 'DIRECT';

export type SettlementStatus = 'PENDING' | 'PROCESSING' | 'SETTLED' | 'FAILED';

export interface Settlement {
  id: string;
  source: SettlementSource;
  referenceId: string; // Internal booking ID or Gateway payout ID
  grossAmount: number;
  commission: number;
  gatewayFee: number;
  netAmount: number;
  currency: string;
  status: SettlementStatus;
  expectedAt?: string;
  settledAt?: string;
  createdAt: string;
}

export interface SettlementSummary {
  grossRevenue: number;
  netReceivable: number;
  pendingPayout: number;
  currency: string;
}

export interface SettlementFilters {
  source?: SettlementSource;
  status?: SettlementStatus;
  startDate?: string;
  endDate?: string;
}
