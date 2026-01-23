
export const BOOKINGS_QUERY = `
  query Bookings($page: Int, $pageSize: Int, $search: String, $status: String) {
    bookings(page: $page, pageSize: $pageSize, search: $search, status: $status) {
      id
      bookingNumber
      guestName
      roomType
      roomNumber
      checkInDate
      checkOutDate
      status
      paymentStatus
      totalAmount
      createdAt
    }
  }
`;

export const UPDATE_BOOKING_STATUS_MUTATION = `
  mutation UpdateBookingStatus($bookingId: ID!, $status: String!) {
    updateBookingStatus(bookingId: $bookingId, status: $status) {
      success
    }
  }
`;
