import { graphqlRequest } from '../../api/graphqlRequest';
import {
  GET_PERMISSIONS,
  GET_ROLE_PERMISSIONS,
  GET_USER_PERMISSION_OVERRIDES,
} from '../../graphql/permissions.gql';

export const getPermissions = async () => {
  const data = await graphqlRequest(GET_PERMISSIONS);
  return data.permissions;
};

export const getRolePermissions = async (roleId: string) => {
  const data = await graphqlRequest(GET_ROLE_PERMISSIONS, { roleId });
  return data.rolePermissions;
};

export const getUserPermissionOverrides = async (userId: string) => {
  const data = await graphqlRequest(GET_USER_PERMISSION_OVERRIDES, { userId });
  return data.userPermissionOverrides;
};
