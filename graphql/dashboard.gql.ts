
export const DASHBOARD_STATS_QUERY = `
  query DashboardStats {
    dashboardStats {
      totalBookings
      occupancyRate
      revenueToday
    }
  }
`;
