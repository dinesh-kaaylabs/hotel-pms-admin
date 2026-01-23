
export interface ReportSummary {
  totalRevenue: number;
  totalBookings: number;
  occupancyRate: number; // Percentage 0-100
  adr: number; // Average Daily Rate
}

export interface RevenueTrend {
  date: string;
  revenue: number;
}

export interface OccupancyTrend {
  date: string;
  occupancyRate: number;
}

export interface TopRoomType {
  roomType: string;
  bookings: number;
  revenue: number;
}

export interface ReportParams {
  startDate: string;
  endDate: string;
}
