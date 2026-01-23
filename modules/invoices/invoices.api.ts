import { useQuery } from '@tanstack/react-query';
import { graphqlRequest } from '../../api/graphqlRequest';
import { Invoice, InvoiceFilters } from './invoices.types';
import { INVOICES_QUERY } from '../../graphql/finance.gql';

export const useInvoices = (filters: InvoiceFilters) => {
  return useQuery<Invoice[]>({
    queryKey: ['invoices', filters],
    queryFn: async () => {
      const data = await graphqlRequest<{ invoices: Invoice[] }>(INVOICES_QUERY, { filters });
      return data.invoices;
    },
  });
};

export const useInvoiceDetails = (id: string | null) => {
  return useQuery<Invoice>({
    queryKey: ['invoices', id],
    queryFn: async () => {
      const data = await graphqlRequest<{ invoice: Invoice }>(`
        query GetInvoice($id: ID!) {
          invoice(id: $id) {
            id invoiceNumber bookingNumber guestName gstin status subtotal totalAmount currency issuedAt pdfUrl
            gst { cgst sgst igst gstRate }
          }
        }
      `, { id });
      return data.invoice;
    },
    enabled: !!id,
  });
};

export const useExportInvoices = () => {
  return useMutation({
    mutationFn: async (filters?: InvoiceFilters) => {
      const data = await graphqlRequest<{ exportInvoices: { downloadUrl: string; filename: string } }>(`
        query ExportInvoices($filters: InvoiceFilters) {
          exportInvoices(filters: $filters) {
            downloadUrl filename
          }
        }
      `, { filters });
      return data.exportInvoices;
    },
  });
};
