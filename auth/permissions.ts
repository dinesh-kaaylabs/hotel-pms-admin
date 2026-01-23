
import { UserRole, AppPermission } from './auth.types';

export const ROLE_PERMISSIONS: Record<UserRole, AppPermission[]> = {
  [UserRole.SUPER_ADMIN]: [
    'dashboard:view',
    'bookings:view',
    'bookings:update',
    'rooms:view',
    'rooms:edit',
    'pricing:view',
    'pricing:edit',
    'payments:view',
    'reports:view',
    'settings:view',
    'users:manage',
  ],
  [UserRole.HOTEL_ADMIN]: [
    'dashboard:view',
    'bookings:view',
    'bookings:update',
    'rooms:view',
    'rooms:edit',
    'pricing:view',
    'pricing:edit',
    'payments:view',
    'reports:view',
    'settings:view',
  ],
  [UserRole.STAFF]: [
    'dashboard:view',
    'bookings:view',
    'bookings:update',
    'rooms:view',
  ],
};

/**
 * Pure function to check permissions.
 * Used by both UI components and Route Guards.
 */
export const hasPermission = (userRole: UserRole | undefined, permission: AppPermission): boolean => {
  if (!userRole) return false;
  const permissions = ROLE_PERMISSIONS[userRole];
  return permissions ? permissions.includes(permission) : false;
};
