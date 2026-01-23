import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlRequest } from '../../api/graphqlRequest';
import { RatePlan, RoomPrice, BulkPricingUpdatePayload } from './pricing.types';
import { 
  RATE_PLANS_QUERY, 
  CREATE_RATE_PLAN_MUTATION, 
  UPDATE_RATE_PLAN_MUTATION, 
  PRICING_CALENDAR_QUERY, 
  BULK_UPDATE_PRICING_MUTATION 
} from '../../graphql/pricing.gql';

export const useRatePlans = () => {
  return useQuery<RatePlan[]>({
    queryKey: ['rate-plans'],
    queryFn: async () => {
      const data = await graphqlRequest<{ ratePlans: RatePlan[] }>(RATE_PLANS_QUERY);
      return data.ratePlans;
    },
  });
};

export const useCreateRatePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Partial<RatePlan>) => {
      return graphqlRequest<{ createRatePlan: { id: string, success: boolean } }>(CREATE_RATE_PLAN_MUTATION, { input: payload });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rate-plans'] });
    },
  });
};

export const useUpdateRatePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }: Partial<RatePlan> & { id: string }) => {
      return graphqlRequest<{ updateRatePlan: { success: boolean } }>(UPDATE_RATE_PLAN_MUTATION, { id, input: payload });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rate-plans'] });
    },
  });
};

export const usePricingCalendar = (params: { startDate: string; endDate: string; roomTypeId?: string }) => {
  return useQuery<RoomPrice[]>({
    queryKey: ['pricing-calendar', params],
    queryFn: async () => {
      const data = await graphqlRequest<{ pricingCalendar: RoomPrice[] }>(PRICING_CALENDAR_QUERY, params);
      return data.pricingCalendar;
    },
    enabled: !!params.startDate && !!params.endDate,
  });
};

export const useBulkUpdatePricing = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: BulkPricingUpdatePayload) => {
      return graphqlRequest<{ bulkUpdatePricing: { success: boolean } }>(BULK_UPDATE_PRICING_MUTATION, { input: payload });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pricing-calendar'] });
    },
  });
};
