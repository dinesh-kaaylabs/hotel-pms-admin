
export type InvoiceStatus = 'DRAFT' | 'ISSUED' | 'CANCELLED';

export interface GstBreakup {
  cgst: number;
  sgst: number;
  igst: number;
  gstRate: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  bookingId: string;
  bookingNumber: string;
  guestName: string;
  gstin?: string;
  status: InvoiceStatus;
  subtotal: number;
  gst: GstBreakup;
  totalAmount: number;
  currency: string;
  issuedAt: string;
  pdfUrl?: string;
}

export interface InvoiceFilters {
  search?: string;
  status?: InvoiceStatus;
  startDate?: string;
  endDate?: string;
}
