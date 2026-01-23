export const GET_GUEST_DOCUMENTS = `
  query GetGuestDocuments($guestId: String, $bookingId: String) {
    guestDocuments(guestId: $guestId, bookingId: $bookingId) {
      id
      guestId
      bookingId
      documentType
      documentName
      fileName
      fileUrl
      fileSize
      uploadedBy
      uploadedAt
      verifiedBy
      verifiedAt
      status
    }
  }
`;

export const GET_BOOKING_ATTACHMENTS = `
  query GetBookingAttachments($bookingId: String!) {
    bookingAttachments(bookingId: $bookingId) {
      id
      bookingId
      attachmentType
      fileName
      fileUrl
      fileSize
      uploadedBy
      uploadedAt
      description
    }
  }
`;

export const GET_INVOICE_DOCUMENTS = `
  query GetInvoiceDocuments($invoiceId: String!) {
    invoiceDocuments(invoiceId: $invoiceId) {
      id
      invoiceId
      invoiceNumber
      documentType
      fileName
      fileUrl
      fileSize
      generatedAt
      sentToGuest
      sentAt
    }
  }
`;

export const GET_DOCUMENT_CATEGORIES = `
  query GetDocumentCategories {
    documentCategories {
      id
      name
      description
      requiredForCheckIn
      retentionDays
    }
  }
`;
