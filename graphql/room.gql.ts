
export const ROOMS_QUERY = `
  query Rooms {
    rooms {
      id
      hotelId
      roomNumber
      roomTypeId
      status
      floor
      lastCleanedAt
      lastInspectedAt
      viewType
      outOfOrderReason
      maintenanceTicketId
    }
  }
`;

export const CREATE_ROOM_MUTATION = `
  mutation CreateRoom($input: CreateRoomInput!) {
    createRoom(input: $input) {
      id
      hotelId
      roomNumber
      roomTypeId
      status
      floor
      viewType
    }
  }
`;

export const UPDATE_ROOM_MUTATION = `
  mutation UpdateRoom($id: ID!, $input: UpdateRoomInput!) {
    updateRoom(id: $id, input: $input) {
      id
      hotelId
      roomNumber
      roomTypeId
      status
      floor
      viewType
    }
  }
`;

export const DELETE_ROOM_MUTATION = `
  mutation DeleteRoom($id: ID!) {
    deleteRoom(id: $id) {
      success
    }
  }
`;

export const UPDATE_ROOM_STATUS_MUTATION = `
  mutation UpdateRoomStatus($roomId: ID!, $status: String!) {
    updateRoomStatus(roomId: $roomId, status: $status) {
      success
    }
  }
`;

export const ROOM_TYPES_QUERY = `
  query GetRoomTypes {
    roomTypes {
      id
      hotelId
      name
      capacity
      basePrice
      maxAdults
      maxChildren
      extraBedAllowed
      extraBedPrice
    }
  }
`;

export const CREATE_ROOM_TYPE_MUTATION = `
  mutation CreateRoomType($input: RoomTypeInput!) {
    createRoomType(input: $input) {
      id
      hotelId
      name
      capacity
      basePrice
      maxAdults
      maxChildren
      extraBedAllowed
      extraBedPrice
    }
  }
`;

export const UPDATE_ROOM_TYPE_MUTATION = `
  mutation UpdateRoomType($id: ID!, $input: RoomTypeInput!) {
    updateRoomType(id: $id, input: $input) { success }
  }
`;

export const DELETE_ROOM_TYPE_MUTATION = `
  mutation DeleteRoomType($id: ID!) {
    deleteRoomType(id: $id) {
      success
    }
  }
`;

export const ROOM_INVENTORY_QUERY = `
  query GetRoomInventory($startDate: String!, $endDate: String!, $roomTypeId: ID) {
    roomInventory(startDate: $startDate, endDate: $endDate, roomTypeId: $roomTypeId) {
      id roomTypeId date totalRooms availableRooms status
    }
  }
`;

export const BULK_UPDATE_INVENTORY_MUTATION = `
  mutation BulkUpdateInventory($input: BulkUpdateInventoryInput!) {
    bulkUpdateInventory(input: $input) { success }
  }
`;

export const ROOM_INVENTORY_ADVANCED_FILTERS_QUERY = `
  query RoomInventoryAdvancedFilters($filters: RoomInventoryFilters!) {
    roomInventoryAdvanced(filters: $filters) {
      id roomTypeId date totalRooms availableRooms status
    }
  }
`;
