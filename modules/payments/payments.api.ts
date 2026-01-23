import { useQuery } from '@tanstack/react-query';
import { graphqlRequest } from '../../api/graphqlRequest';
import { Payment, PaymentFilters } from './payments.types';
import { PAYMENTS_QUERY } from '../../graphql/finance.gql';

export const usePayments = (filters: PaymentFilters) => {
  return useQuery<Payment[]>({
    queryKey: ['payments', filters],
    queryFn: async () => {
      const data = await graphqlRequest<{ payments: Payment[] }>(PAYMENTS_QUERY, { filters });
      return data.payments;
    },
  });
};

export const usePaymentDetails = (id: string | null) => {
  return useQuery<Payment>({
    queryKey: ['payments', id],
    queryFn: async () => {
      const data = await graphqlRequest<{ payment: Payment }>(`
        query GetPayment($id: ID!) {
          payment(id: $id) {
            id bookingNumber provider providerPaymentId method status amount currency createdAt
          }
        }
      `, { id });
      return data.payment;
    },
    enabled: !!id,
  });
};

export const useExportPayments = () => {
  return useMutation({
    mutationFn: async (filters?: PaymentFilters) => {
      const data = await graphqlRequest<{ exportPayments: { downloadUrl: string; filename: string } }>(`
        query ExportPayments($filters: PaymentFilters) {
          exportPayments(filters: $filters) {
            downloadUrl filename
          }
        }
      `, { filters });
      return data.exportPayments;
    },
  });
};
