import { graphqlRequest } from '../../api/graphqlRequest';
import {
  GET_TENANT_INFO,
  GET_SUBSCRIPTION_INFO,
  GET_FEATURE_ENTITLEMENTS,
  GET_BILLING_HISTORY,
} from '../../graphql/tenant-subscription.gql';

export const getTenantInfo = async () => {
  const data = await graphqlRequest(GET_TENANT_INFO);
  return data.tenant;
};

export const getSubscriptionInfo = async () => {
  const data = await graphqlRequest(GET_SUBSCRIPTION_INFO);
  return data.subscription;
};

export const getFeatureEntitlements = async () => {
  const data = await graphqlRequest(GET_FEATURE_ENTITLEMENTS);
  return data.featureEntitlements;
};

export const getBillingHistory = async () => {
  const data = await graphqlRequest(GET_BILLING_HISTORY);
  return data.billingHistory;
};
