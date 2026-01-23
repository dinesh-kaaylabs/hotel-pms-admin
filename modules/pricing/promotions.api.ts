import { graphqlRequest } from '../../api/graphqlRequest';
import {
  GET_PROMO_CODES,
  VALIDATE_PROMO_CODE,
  GET_SEASONAL_PRICING,
  GET_CORPORATE_RATES,
  GET_BLACKOUT_DATES,
} from '../../graphql/promotions.gql';

export const getPromoCodes = async () => {
  const data = await graphqlRequest(GET_PROMO_CODES);
  return data.promoCodes;
};

export const validatePromoCode = async (code: string, hotelId: string) => {
  const data = await graphqlRequest(VALIDATE_PROMO_CODE, { code, hotelId });
  return { promoCode: data.promoCode, valid: data.valid };
};

export const getSeasonalPricing = async () => {
  const data = await graphqlRequest(GET_SEASONAL_PRICING);
  return data.seasonalPricing;
};

export const getCorporateRates = async () => {
  const data = await graphqlRequest(GET_CORPORATE_RATES);
  return data.corporateRates;
};

export const getBlackoutDates = async () => {
  const data = await graphqlRequest(GET_BLACKOUT_DATES);
  return data.blackoutDates;
};
