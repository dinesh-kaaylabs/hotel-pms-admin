
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

export const CREATE_BOOKING_MUTATION = `
  mutation CreateBooking($input: CreateBookingInput!) {
    createBooking(input: $input) {
      id
      bookingNumber
      status
      totalAmount
    }
  }
`;

export const GET_BOOKING_PRICING_QUERY = `
  query GetBookingPricing($roomTypeId: ID!, $checkInDate: String!, $checkOutDate: String!) {
    bookingPricing(roomTypeId: $roomTypeId, checkInDate: $checkInDate, checkOutDate: $checkOutDate) {
      baseAmount
      taxAmount
      totalAmount
      currency
      breakdown {
        date
        rate
        nights
      }
    }
  }
`;
