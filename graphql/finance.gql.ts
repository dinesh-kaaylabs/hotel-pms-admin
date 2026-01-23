
export const INVOICES_QUERY = `
  query Invoices($filters: InvoiceFilters) {
    invoices(filters: $filters) {
      id invoiceNumber bookingId bookingNumber guestName gstin status totalAmount currency issuedAt pdfUrl
    }
  }
`;

export const PAYMENTS_QUERY = `
  query Payments($filters: PaymentFilters) {
    payments(filters: $filters) {
      id bookingId bookingNumber provider method status amount currency createdAt
    }
  }
`;

export const SETTLEMENTS_QUERY = `
  query Settlements($filters: SettlementFilters) {
    settlements(filters: $filters) {
      id source referenceId grossAmount commission gatewayFee netAmount currency status expectedAt settledAt createdAt
    }
  }
`;

export const SETTLEMENT_SUMMARY_QUERY = `
  query SettlementSummary($startDate: String!, $endDate: String!) {
    settlementSummary(startDate: $startDate, endDate: $endDate) {
      grossRevenue netReceivable pendingPayout currency
    }
  }
`;

export const EXPORT_PAYMENTS_QUERY = `
  query ExportPayments($filters: PaymentFilters) {
    exportPayments(filters: $filters) {
      downloadUrl
      filename
    }
  }
`;

export const EXPORT_INVOICES_QUERY = `
  query ExportInvoices($filters: InvoiceFilters) {
    exportInvoices(filters: $filters) {
      downloadUrl
      filename
    }
  }
`;
