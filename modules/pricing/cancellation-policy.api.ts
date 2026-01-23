import { graphqlRequest } from '../../api/graphqlRequest';
import {
  GET_CANCELLATION_POLICIES,
  GET_NO_SHOW_POLICIES,
  GET_REFUND_RULES,
  CALCULATE_REFUND,
} from '../../graphql/cancellation-policy.gql';

export const getCancellationPolicies = async () => {
  const data = await graphqlRequest(GET_CANCELLATION_POLICIES);
  return data.cancellationPolicies;
};

export const getNoShowPolicies = async () => {
  const data = await graphqlRequest(GET_NO_SHOW_POLICIES);
  return data.noShowPolicies;
};

export const getRefundRules = async () => {
  const data = await graphqlRequest(GET_REFUND_RULES);
  return data.refundRules;
};

export const calculateRefund = async (bookingId: string) => {
  const data = await graphqlRequest(CALCULATE_REFUND, { bookingId });
  return data.refundCalculation;
};
