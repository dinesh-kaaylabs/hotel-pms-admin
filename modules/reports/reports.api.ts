import { useQuery } from '@tanstack/react-query';
import { graphqlRequest } from '../../api/graphqlRequest';
import { ReportSummary, RevenueTrend, OccupancyTrend, TopRoomType, ReportParams } from './reports.types';

export const useReportSummary = (params: ReportParams) => {
  return useQuery<ReportSummary>({
    queryKey: ['reports-summary', params],
    queryFn: async () => {
      const data = await graphqlRequest<{ reportSummary: ReportSummary }>(`
        query GetReportSummary($startDate: String!, $endDate: String!) {
          reportSummary(startDate: $startDate, endDate: $endDate) { totalRevenue totalBookings occupancyRate adr }
        }
      `, params);
      return data.reportSummary;
    },
  });
};

export const useRevenueTrend = (params: ReportParams) => {
  return useQuery<RevenueTrend[]>({
    queryKey: ['reports-revenue', params],
    queryFn: async () => {
      const data = await graphqlRequest<{ revenueTrend: RevenueTrend[] }>(`
        query GetRevenueTrend($startDate: String!, $endDate: String!) {
          revenueTrend(startDate: $startDate, endDate: $endDate) { date revenue }
        }
      `, params);
      return data.revenueTrend;
    },
  });
};

export const useOccupancyTrend = (params: ReportParams) => {
  return useQuery<OccupancyTrend[]>({
    queryKey: ['reports-occupancy', params],
    queryFn: async () => {
      const data = await graphqlRequest<{ occupancyTrend: OccupancyTrend[] }>(`
        query GetOccupancyTrend($startDate: String!, $endDate: String!) {
          occupancyTrend(startDate: $startDate, endDate: $endDate) { date occupancyRate }
        }
      `, params);
      return data.occupancyTrend;
    },
  });
};

export const useTopRoomTypes = (params: ReportParams) => {
  return useQuery<TopRoomType[]>({
    queryKey: ['reports-top-rooms', params],
    queryFn: async () => {
      const data = await graphqlRequest<{ topRoomTypes: TopRoomType[] }>(`
        query GetTopRoomTypes($startDate: String!, $endDate: String!) {
          topRoomTypes(startDate: $startDate, endDate: $endDate) { roomType bookings revenue }
        }
      `, params);
      return data.topRoomTypes;
    },
  });
};
