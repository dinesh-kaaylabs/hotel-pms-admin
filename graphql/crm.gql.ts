
export const GUESTS_QUERY = `
  query Guests($filters: GuestFilters) {
    guests(filters: $filters) {
      id name phone email tags totalStays lifetimeValue currency
    }
  }
`;

export const GUEST_PROFILE_QUERY = `
  query GuestProfile($id: ID!) {
    guest(id: $id) {
      id name phone email tags totalStays lifetimeValue currency
    }
  }
`;

export const GUEST_STAYS_QUERY = `
  query GuestStays($id: ID!) {
    guestStays(guestId: $id) {
      bookingId bookingNumber roomType checkInDate checkOutDate amountPaid status
    }
  }
`;

export const GUEST_NOTES_QUERY = `
  query GuestNotes($id: ID!) {
    guestNotes(guestId: $id) {
      id note createdBy createdAt
    }
  }
`;

export const ADD_GUEST_NOTE_MUTATION = `
  mutation AddGuestNote($guestId: ID!, $note: String!) {
    addGuestNote(guestId: $guestId, note: $note) {
      id note createdBy createdAt
    }
  }
`;

export const CREATE_GUEST_MUTATION = `
  mutation CreateGuest($input: CreateGuestInput!) {
    createGuest(input: $input) {
      id name phone email
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
