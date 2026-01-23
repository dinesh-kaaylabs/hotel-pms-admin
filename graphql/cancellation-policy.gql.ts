export const GET_CANCELLATION_POLICIES = `
  query GetCancellationPolicies {
    cancellationPolicies {
      id
      hotelId
      name
      description
      rules {
        hoursBeforeCheckIn
        penaltyType
        penaltyValue
      }
      isDefault
    }
  }
`;

export const GET_NO_SHOW_POLICIES = `
  query GetNoShowPolicies {
    noShowPolicies {
      id
      hotelId
      name
      description
      penaltyType
      penaltyValue
      gracePeriodHours
      isDefault
    }
  }
`;

export const GET_REFUND_RULES = `
  query GetRefundRules {
    refundRules {
      id
      hotelId
      reason
      processingDays
      refundMethod
      deductionType
      deductionValue
      requiresApproval
      approvalThreshold
    }
  }
`;

export const CALCULATE_REFUND = `
  query CalculateRefund($bookingId: String!) {
    refundCalculation(bookingId: $bookingId) {
      bookingId
      bookingAmount
      cancellationPolicyId
      hoursBeforeCheckIn
      penaltyAmount
      refundAmount
      processingFee
      netRefund
    }
  }
`;
