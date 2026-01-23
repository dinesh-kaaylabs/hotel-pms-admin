
export const RATE_PLANS_QUERY = `
  query GetRatePlans {
    ratePlans {
      id
      name
      roomTypeId
      roomTypeName
      status
      refundable
      minNights
      maxNights
    }
  }
`;

export const CREATE_RATE_PLAN_MUTATION = `
  mutation CreateRatePlan($input: RatePlanInput!) {
    createRatePlan(input: $input) {
      id
      success
    }
  }
`;

export const UPDATE_RATE_PLAN_MUTATION = `
  mutation UpdateRatePlan($id: ID!, $input: RatePlanInput!) {
    updateRatePlan(id: $id, input: $input) {
      success
    }
  }
`;

export const PRICING_CALENDAR_QUERY = `
  query GetPricingCalendar($startDate: String!, $endDate: String!, $roomTypeId: ID) {
    pricingCalendar(startDate: $startDate, endDate: $endDate, roomTypeId: $roomTypeId) {
      id
      date
      roomTypeId
      ratePlanId
      price
      availableRooms
      closed
    }
  }
`;

export const BULK_UPDATE_PRICING_MUTATION = `
  mutation BulkUpdatePricing($input: BulkPricingUpdateInput!) {
    bulkUpdatePricing(input: $input) {
      success
    }
  }
`;
