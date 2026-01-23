export const GET_PERMISSIONS = `
  query GetPermissions {
    permissions {
      id
      key
      name
      category
      description
    }
  }
`;

export const GET_ROLE_PERMISSIONS = `
  query GetRolePermissions($roleId: String!) {
    rolePermissions(roleId: $roleId) {
      roleId
      permissions
    }
  }
`;

export const GET_USER_PERMISSION_OVERRIDES = `
  query GetUserPermissionOverrides($userId: String!) {
    userPermissionOverrides(userId: $userId) {
      userId
      permission
      granted
      grantedBy
      grantedAt
      reason
    }
  }
`;
