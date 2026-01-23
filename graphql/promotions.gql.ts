export const GET_PROMO_CODES = `
  query GetPromoCodes {
    promoCodes {
      id
      hotelId
      code
      name
      discountType
      discountValue
      validFrom
      validTo
      minNights
      maxNights
      minAmount
      maxUsage
      usageCount
      isActive
      applicableRoomTypes
      blackoutDates
    }
  }
`;

export const VALIDATE_PROMO_CODE = `
  query ValidatePromoCode($code: String!, $hotelId: String!) {
    promoCode(code: $code, hotelId: $hotelId) {
      id
      code
      name
      discountType
      discountValue
      validFrom
      validTo
      minNights
      maxNights
      minAmount
      applicableRoomTypes
      blackoutDates
    }
    valid
  }
`;

export const GET_SEASONAL_PRICING = `
  query GetSeasonalPricing {
    seasonalPricing {
      id
      hotelId
      name
      startDate
      endDate
      priceMultiplier
      applicableRoomTypes
      isActive
    }
  }
`;

export const GET_CORPORATE_RATES = `
  query GetCorporateRates {
    corporateRates {
      id
      hotelId
      companyName
      contactPerson
      contactEmail
      discountType
      discountValue
      validFrom
      validTo
      applicableRoomTypes
      isActive
    }
  }
`;

export const GET_BLACKOUT_DATES = `
  query GetBlackoutDates {
    blackoutDates {
      id
      hotelId
      date
      reason
      affectsPromoCodes
      affectsSeasonalPricing
    }
  }
`;
