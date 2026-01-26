
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

export const ROOMS_PAGINATED_QUERY = `
  query RoomsPaginated($page: Int!, $pageSize: Int!, $search: String, $status: String) {
    roomsPaginated(page: $page, pageSize: $pageSize, search: $search, status: $status) {
      data {
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
      totalCount
      page
      pageSize
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
      message
    }
  }
`;

// BACKEND VALIDATION REQUIRED:
// - Check if any rooms exist with this roomTypeId
// - Check if any active/future bookings reference this roomTypeId
// - Return error: "Cannot delete room type: X rooms are currently using this type"
// - Return error: "Cannot delete room type: Y active bookings exist for this type"

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

export const ROOM_STATS_QUERY = `
  query RoomStats {
    roomStats {
      total
      clean
      dirty
      occupied
      maintenance
      available
    }
  }
`;

// BACKEND IMPLEMENTATION REQUIRED:
// This query should return aggregated counts across ALL rooms for the current hotel
// Should NOT be affected by pagination, search, or status filters
// Example SQL:
// SELECT 
//   COUNT(*) as total,
//   COUNT(CASE WHEN status = 'CLEAN' THEN 1 END) as clean,
//   COUNT(CASE WHEN status = 'DIRTY' THEN 1 END) as dirty,
//   COUNT(CASE WHEN status = 'OCCUPIED' THEN 1 END) as occupied,
//   COUNT(CASE WHEN status = 'MAINTENANCE' THEN 1 END) as maintenance,
//   COUNT(CASE WHEN status IN ('CLEAN', 'AVAILABLE') THEN 1 END) as available
// FROM rooms
// WHERE hotel_id = ?
