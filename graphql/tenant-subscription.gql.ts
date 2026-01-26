export const GET_TENANT_INFO = `
  query GetTenantInfo {
    tenant {
      id
      name
      status
      subscriptionId
      createdAt
      contactEmail
      contactPhone
      billingAddress
    }
  }
`;

export const GET_SUBSCRIPTION_INFO = `
  query GetSubscriptionInfo {
    subscription {
      id
      tenantId
      planId
      status
      billingCycle
      currentPeriodStart
      currentPeriodEnd
      autoRenew
      paymentMethod
      lastPaymentDate
      nextBillingDate
      amount
      currency
      plan {
        id
        name
        tier
        maxHotels
        maxRooms
        maxUsers
        priceMonthly
        priceYearly
        currency
        features
      }
    }
  }
`;

export const GET_FEATURE_ENTITLEMENTS = `
  query GetFeatureEntitlements {
    featureEntitlements {
      tenantId
      feature
      enabled
      limit
    }
  }
`;

export const GET_BILLING_HISTORY = `
  query GetBillingHistory {
    billingHistory {
      id
      tenantId
      subscriptionId
      invoiceNumber
      amount
      currency
      status
      billingDate
      paidDate
      paymentMethod
      description
    }
  }
`;

export const GET_ALL_PLANS = `
  query GetAllPlans {
    plans {
      id
      name
      maxHotels
      maxUsers
      price
      billingCycle
    }
  }
`;

export const GET_ALL_TENANTS = `
  query GetAllTenants {
    tenants {
      id
      name
      status
      subscriptionId
      createdAt
      contactEmail
      contactPhone
      billingAddress
    }
  }
`;

export const GET_ALL_SUBSCRIPTIONS = `
  query GetAllSubscriptions {
    subscriptions {
      id
      tenantId
      planId
      status
      amount
      currentPeriodEnd
    }
  }
`;

export const GET_ALL_FEATURE_FLAGS = `
  query GetAllFeatureFlags {
    featureFlags {
      id
      key
      name
      defaultValue
      tenantId
    }
  }
`;