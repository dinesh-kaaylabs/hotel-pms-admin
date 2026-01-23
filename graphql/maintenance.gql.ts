
export const MAINTENANCE_ISSUES_QUERY = `
  query MaintenanceIssues($status: String) {
    maintenanceIssues(status: $status) {
      id roomId roomNumber roomType reason status blockedFrom blockedTo createdAt reportedBy resolvedAt
    }
  }
`;

export const CREATE_MAINTENANCE_MUTATION = `
  mutation CreateMaintenance($input: CreateMaintenanceInput!) {
    createMaintenance(input: $input) {
      success
    }
  }
`;

export const RESOLVE_MAINTENANCE_MUTATION = `
  mutation ResolveMaintenance($id: ID!) {
    resolveMaintenance(id: $id) {
      success
    }
  }
`;
