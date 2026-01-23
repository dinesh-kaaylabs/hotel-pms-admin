
export const ROOMS_QUERY = `
  query Rooms {
    rooms {
      id
      roomNumber
      type
      status
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
      id name capacity baseOccupancy maxOccupancy active
    }
  }
`;

export const CREATE_ROOM_TYPE_MUTATION = `
  mutation CreateRoomType($input: RoomTypeInput!) {
    createRoomType(input: $input) { id success }
  }
`;

export const UPDATE_ROOM_TYPE_MUTATION = `
  mutation UpdateRoomType($id: ID!, $input: RoomTypeInput!) {
    updateRoomType(id: $id, input: $input) { success }
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
