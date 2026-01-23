import { graphqlRequest } from '../../api/graphqlRequest';
import {
  GET_GUEST_DOCUMENTS,
  GET_BOOKING_ATTACHMENTS,
  GET_INVOICE_DOCUMENTS,
  GET_DOCUMENT_CATEGORIES,
} from '../../graphql/documents.gql';

interface GuestDocument {
  id: string;
  guestId: string;
  bookingId?: string;
  documentType: string;
  fileUrl: string;
  uploadedAt: string;
}

interface BookingAttachment {
  id: string;
  bookingId: string;
  fileName: string;
  fileUrl: string;
  uploadedBy: string;
  uploadedAt: string;
}

interface InvoiceDocument {
  id: string;
  invoiceId: string;
  documentUrl: string;
  generatedAt: string;
}

interface DocumentCategory {
  id: string;
  name: string;
  description?: string;
}

export const getGuestDocuments = async (filters?: { guestId?: string; bookingId?: string }) => {
  const data = await graphqlRequest<{ guestDocuments: GuestDocument[] }>(GET_GUEST_DOCUMENTS, filters);
  return data.guestDocuments;
};

export const getBookingAttachments = async (bookingId: string) => {
  const data = await graphqlRequest<{ bookingAttachments: BookingAttachment[] }>(GET_BOOKING_ATTACHMENTS, { bookingId });
  return data.bookingAttachments;
};

export const getInvoiceDocuments = async (invoiceId: string) => {
  const data = await graphqlRequest<{ invoiceDocuments: InvoiceDocument[] }>(GET_INVOICE_DOCUMENTS, { invoiceId });
  return data.invoiceDocuments;
};

export const getDocumentCategories = async () => {
  const data = await graphqlRequest<{ documentCategories: DocumentCategory[] }>(GET_DOCUMENT_CATEGORIES);
  return data.documentCategories;
};
