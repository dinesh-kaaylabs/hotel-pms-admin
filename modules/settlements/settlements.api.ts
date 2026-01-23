import { useQuery } from '@tanstack/react-query';
import { graphqlRequest } from '../../api/graphqlRequest';
import { Settlement, SettlementFilters, SettlementSummary } from './settlements.types';
import { SETTLEMENTS_QUERY, SETTLEMENT_SUMMARY_QUERY } from '../../graphql/finance.gql';

export const useSettlements = (filters: SettlementFilters) => {
  return useQuery<Settlement[]>({
    queryKey: ['settlements', filters],
    queryFn: async () => {
      const data = await graphqlRequest<{ settlements: Settlement[] }>(SETTLEMENTS_QUERY, { filters });
      return data.settlements;
    },
  });
};

export const useSettlementSummary = (params: { startDate: string; endDate: string }) => {
  return useQuery<SettlementSummary>({
    queryKey: ['settlements-summary', params],
    queryFn: async () => {
      const data = await graphqlRequest<{ settlementSummary: SettlementSummary }>(SETTLEMENT_SUMMARY_QUERY, params);
      return data.settlementSummary;
    },
  });
};
