export const GET_OVERBOOKING_RULES = `
  query GetOverbookingRules {
    overbookingRules {
      id
      hotelId
      roomTypeId
      allowOverbooking
      overbookingPercentage
      maxOverbookings
      isActive
    }
  }
`;

export const GET_AUTO_ROOM_ASSIGNMENT = `
  query GetAutoRoomAssignment {
    autoRoomAssignment {
      id
      hotelId
      enabled
      assignmentStrategy
      preferredFloors
      avoidFloors
      considerGuestPreferences
      considerRoomStatus
    }
  }
`;

export const GET_LATE_CHECKOUT_FEES = `
  query GetLateCheckoutFees {
    lateCheckoutFees {
      id
      hotelId
      hoursLate
      feeType
      feeAmount
      isActive
    }
  }
`;

export const GET_FEATURE_TOGGLES = `
  query GetFeatureToggles {
    featureToggles {
      id
      tenantId
      feature
      enabled
      description
    }
  }
`;

export const GET_EMAIL_TEMPLATES = `
  query GetEmailTemplates {
    emailTemplates {
      id
      hotelId
      templateType
      subject
      body
      isActive
    }
  }
`;
