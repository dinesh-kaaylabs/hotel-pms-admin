import { graphqlRequest } from '../../api/graphqlRequest';
import {
  GET_OVERBOOKING_RULES,
  GET_AUTO_ROOM_ASSIGNMENT,
  GET_LATE_CHECKOUT_FEES,
  GET_FEATURE_TOGGLES,
  GET_EMAIL_TEMPLATES,
} from '../../graphql/system-config.gql';

export const getOverbookingRules = async () => {
  const data = await graphqlRequest(GET_OVERBOOKING_RULES);
  return data.overbookingRules;
};

export const getAutoRoomAssignment = async () => {
  const data = await graphqlRequest(GET_AUTO_ROOM_ASSIGNMENT);
  return data.autoRoomAssignment;
};

export const getLateCheckoutFees = async () => {
  const data = await graphqlRequest(GET_LATE_CHECKOUT_FEES);
  return data.lateCheckoutFees;
};

export const getFeatureToggles = async () => {
  const data = await graphqlRequest(GET_FEATURE_TOGGLES);
  return data.featureToggles;
};

export const getEmailTemplates = async () => {
  const data = await graphqlRequest(GET_EMAIL_TEMPLATES);
  return data.emailTemplates;
};
