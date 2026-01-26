
export const DASHBOARD_STATS_QUERY = `
  query DashboardStats {
    dashboardStats {
      totalBookings
      occupancyRate
      revenueToday
    }
  }
`;

export const GENERATE_AI_PULSE_MUTATION = `
  mutation GenerateAIPulse($summary: ReportSummaryInput!) {
    generateAIPulse(summary: $summary) {
      pulse
      success
    }
  }
`;
