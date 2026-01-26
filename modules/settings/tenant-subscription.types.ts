export interface Plan {
  id: string;
  name: string;
  maxHotels: number;
  maxUsers: number;
  price: number;
  billingCycle: string;
}

export interface Tenant {
  id: string;
  name: string;
  status: string;
  subscriptionId: string;
  createdAt: string;
  contactEmail?: string;
  contactPhone?: string;
  billingAddress?: string;
}

export interface Subscription {
  id: string;
  tenantId: string;
  planId: string;
  status: string;
  amount: number;
  currentPeriodEnd: string;
}

export interface FeatureEntitlement {
  id: string;
  tenantId: string;
  featureKey: string;
  enabled: boolean;
}

export interface BillingRecord {
  id: string;
  tenantId: string;
  amount: number;
  status: string;
  paidAt: string;
  invoiceNumber: string;
}

export interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  defaultValue: boolean;
  tenantId: string;
}
