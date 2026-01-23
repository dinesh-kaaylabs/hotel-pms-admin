export const GET_OTA_CONNECTIONS = `
  query GetOTAConnections {
    otaConnections {
      id
      hotelId
      otaName
      otaCode
      status
      apiKey
      lastSyncAt
      syncFrequency
      roomsMapped
      isActive
      connectionDate
    }
  }
`;

export const GET_SYNC_LOGS = `
  query GetSyncLogs($otaConnectionId: String, $limit: Int) {
    syncLogs(otaConnectionId: $otaConnectionId, limit: $limit) {
      id
      hotelId
      otaConnectionId
      syncType
      direction
      status
      recordsProcessed
      recordsFailed
      startedAt
      completedAt
      errorMessage
    }
  }
`;

export const GET_CONFLICT_RESOLUTION = `
  query GetConflictResolution {
    conflicts {
      id
      hotelId
      otaConnectionId
      conflictType
      roomTypeId
      date
      pmsAvailability
      otaAvailability
      pmsPrice
      otaPrice
      status
      resolvedBy
      resolvedAt
      resolution
    }
  }
`;

export const GET_ROOM_MAPPING = `
  query GetRoomMapping($otaConnectionId: String) {
    roomMapping(otaConnectionId: $otaConnectionId) {
      id
      hotelId
      otaConnectionId
      pmsRoomTypeId
      pmsRoomTypeName
      otaRoomTypeId
      otaRoomTypeName
      isActive
    }
  }
`;
