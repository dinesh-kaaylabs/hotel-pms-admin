
import { UserRole } from '../../auth/auth.types';

export type BookingAction = 
  | 'VIEW_BOOKINGS'
  | 'CHECK_IN'
  | 'CHECK_OUT'
  | 'CANCEL_BOOKING'
  | 'VIEW_INVOICE'
  | 'REFUND_PAYMENT'
  | 'rooms:edit'
  | 'pricing:edit';

const PERMISSION_MAP: Record<UserRole, BookingAction[]> = {
  [UserRole.SUPER_ADMIN]: [
    'VIEW_BOOKINGS', 
    'CHECK_IN', 
    'CHECK_OUT', 
    'CANCEL_BOOKING', 
    'VIEW_INVOICE', 
    'REFUND_PAYMENT',
    'rooms:edit',
    'pricing:edit'
  ],
  [UserRole.HOTEL_ADMIN]: [
    'VIEW_BOOKINGS', 
    'CHECK_IN', 
    'CHECK_OUT', 
    'CANCEL_BOOKING', 
    'VIEW_INVOICE',
    'rooms:edit',
    'pricing:edit'
  ],
  [UserRole.STAFF]: [
    'VIEW_BOOKINGS',
    'CHECK_IN',
    'CHECK_OUT'
  ]
};

/**
 * Pure function to check if a specific operational action can be performed
 * by a user based on their role within the bookings module.
 */
export const canPerform = (action: BookingAction, role: UserRole | undefined): boolean => {
  if (!role) return false;
  return PERMISSION_MAP[role]?.includes(action) ?? false;
};
