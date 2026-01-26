
export const GUESTS_QUERY = `
  query Guests($filters: GuestFilters) {
    guests(filters: $filters) {
      id
      name
      phone
      email
      idType
      idNumber
      nationality
      preferences {
        pillowType
        smoking
        dietaryNeeds
      }
      isVip
      privacyLevel
      tags
      totalStays
      lifetimeValue
      currency
    }
  }
`;

export const GUEST_PROFILE_QUERY = `
  query GuestProfile($id: ID!) {
    guest(id: $id) {
      id
      name
      phone
      email
      idType
      idNumber
      nationality
      preferences {
        pillowType
        smoking
        dietaryNeeds
      }
      isVip
      privacyLevel
      tags
      totalStays
      lifetimeValue
      currency
    }
  }
`;

export const GUEST_STAYS_QUERY = `
  query GuestStays($guestId: ID) {
    guestStays(guestId: $guestId) {
      id
      guestId
      hotelId
      checkInDate
      checkOutDate
      roomNumber
      totalSpent
      bookingId
      bookingNumber
      roomType
      amountPaid
      status
    }
  }
`;

export const GUEST_NOTES_QUERY = `
  query GuestNotes($guestId: ID) {
    guestNotes(guestId: $guestId) {
      id
      guestId
      hotelId
      content
      createdAt
      userId
    }
  }
`;

export const ADD_GUEST_NOTE_MUTATION = `
  mutation AddGuestNote($guestId: ID!, $content: String!) {
    addGuestNote(guestId: $guestId, content: $content) {
      id
      guestId
      hotelId
      content
      createdAt
      userId
    }
  }
`;

export const CREATE_GUEST_MUTATION = `
  mutation CreateGuest($input: CreateGuestInput!) {
    createGuest(input: $input) {
      id
      name
      phone
      email
      idType
      idNumber
      nationality
      preferences {
        pillowType
        smoking
        dietaryNeeds
      }
      isVip
      privacyLevel
    }
  }
`;

export const UPDATE_GUEST_MUTATION = `
  mutation UpdateGuest($id: ID!, $input: UpdateGuestInput!) {
    updateGuest(id: $id, input: $input) {
      id
      name
      phone
      email
      idType
      idNumber
      nationality
      preferences {
        pillowType
        smoking
        dietaryNeeds
      }
      isVip
      privacyLevel
    }
  }
`;

export const DELETE_GUEST_MUTATION = `
  mutation DeleteGuest($id: ID!) {
    deleteGuest(id: $id) {
      success
    }
  }
`;

export const EXPORT_GUESTS_QUERY = `
  query ExportGuests($filters: GuestFilters) {
    exportGuests(filters: $filters) {
      downloadUrl
      filename
    }
  }
`;
