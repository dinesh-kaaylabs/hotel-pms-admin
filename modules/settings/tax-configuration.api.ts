import { graphqlRequest } from '../../api/graphqlRequest';
import {
  GET_TAX_RULES,
  GET_HSN_CODES,
  GET_GST_CONFIGURATION,
} from '../../graphql/tax-configuration.gql';

export const getTaxRules = async () => {
  const data = await graphqlRequest(GET_TAX_RULES);
  return data.taxRules;
};

export const getHSNCodes = async () => {
  const data = await graphqlRequest(GET_HSN_CODES);
  return data.hsnCodes;
};

export const getGSTConfiguration = async () => {
  const data = await graphqlRequest(GET_GST_CONFIGURATION);
  return data.gstConfiguration;
};
