
export const HOUSEKEEPING_ROOMS_QUERY = `
  query HousekeepingRooms {
    housekeepingRooms {
      id roomNumber roomType floor status assignedStaff { id name } lastCleanedAt
    }
  }
`;

export const HOUSEKEEPING_SUMMARY_QUERY = `
  query HousekeepingSummary {
    housekeepingSummary {
      dirty clean inspected outOfService
    }
  }
`;

export const UPDATE_HOUSEKEEPING_STATUS_MUTATION = `
  mutation UpdateHousekeepingStatus($roomId: ID!, $status: String!, $note: String) {
    updateHousekeepingStatus(roomId: $roomId, status: $status, note: $note) {
      success
    }
  }
`;

export const CLEANING_LOGS_QUERY = `
  query CleaningLogs($roomId: ID!) {
    cleaningLogs(roomId: $roomId) {
      id roomId staffName status note createdAt
    }
  }
`;
