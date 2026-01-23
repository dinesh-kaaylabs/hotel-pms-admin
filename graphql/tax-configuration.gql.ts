export const GET_TAX_RULES = `
  query GetTaxRules {
    taxRules {
      id
      hotelId
      taxName
      taxType
      rate
      isInclusive
      applicableOn
      hsnCode
      isActive
    }
  }
`;

export const GET_HSN_CODES = `
  query GetHSNCodes {
    hsnCodes {
      code
      description
      category
      gstRate
    }
  }
`;

export const GET_GST_CONFIGURATION = `
  query GetGSTConfiguration {
    gstConfiguration {
      hotelId
      gstin
      legalName
      address
      state
      stateCode
      panNumber
      isCompositionScheme
    }
  }
`;
