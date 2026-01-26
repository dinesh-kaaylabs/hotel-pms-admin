import { useQuery } from '@tanstack/react-query';
import { graphqlRequest } from '../../api/graphqlRequest';
import {
  GET_TENANT_INFO,
  GET_SUBSCRIPTION_INFO,
  GET_FEATURE_ENTITLEMENTS,
  GET_BILLING_HISTORY,
  GET_ALL_PLANS,
  GET_ALL_TENANTS,
  GET_ALL_SUBSCRIPTIONS,
  GET_ALL_FEATURE_FLAGS,
} from '../../graphql/tenant-subscription.gql';
import {
  Plan,
  Tenant,
  Subscription,
  FeatureEntitlement,
  BillingRecord,
  FeatureFlag,
} from './tenant-subscription.types';

export const getTenantInfo = async () => {
  const data = await graphqlRequest<{ tenant: Tenant }>(GET_TENANT_INFO);
  return data.tenant;
};

export const getSubscriptionInfo = async () => {
  const data = await graphqlRequest<{ subscription: any }>(GET_SUBSCRIPTION_INFO);
  return data.subscription;
};

export const getFeatureEntitlements = async () => {
  const data = await graphqlRequest<{ featureEntitlements: FeatureEntitlement[] }>(GET_FEATURE_ENTITLEMENTS);
  return data.featureEntitlements;
};

export const getBillingHistory = async () => {
  const data = await graphqlRequest<{ billingHistory: BillingRecord[] }>(GET_BILLING_HISTORY);
  return data.billingHistory;
};

export const useAllPlans = () => {
  return useQuery<Plan[]>({
    queryKey: ['plans'],
    queryFn: async () => {
      const data = await graphqlRequest<{ plans: Plan[] }>(GET_ALL_PLANS);
      return data.plans;
    },
  });
};

export const useAllTenants = () => {
  return useQuery<Tenant[]>({
    queryKey: ['tenants'],
    queryFn: async () => {
      const data = await graphqlRequest<{ tenants: Tenant[] }>(GET_ALL_TENANTS);
      return data.tenants;
    },
  });
};

export const useAllSubscriptions = () => {
  return useQuery<Subscription[]>({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      const data = await graphqlRequest<{ subscriptions: Subscription[] }>(GET_ALL_SUBSCRIPTIONS);
      return data.subscriptions;
    },
  });
};

export const useAllFeatureFlags = () => {
  return useQuery<FeatureFlag[]>({
    queryKey: ['featureFlags'],
    queryFn: async () => {
      const data = await graphqlRequest<{ featureFlags: FeatureFlag[] }>(GET_ALL_FEATURE_FLAGS);
      return data.featureFlags;
    },
  });
};

export const useTenantInfo = () => {
  return useQuery<Tenant>({
    queryKey: ['tenant'],
    queryFn: getTenantInfo,
  });
};

export const useSubscriptionInfo = () => {
  return useQuery({
    queryKey: ['subscription'],
    queryFn: getSubscriptionInfo,
  });
};

export const useFeatureEntitlements = () => {
  return useQuery<FeatureEntitlement[]>({
    queryKey: ['featureEntitlements'],
    queryFn: getFeatureEntitlements,
  });
};

export const useBillingHistory = () => {
  return useQuery<BillingRecord[]>({
    queryKey: ['billingHistory'],
    queryFn: getBillingHistory,
  });
};
