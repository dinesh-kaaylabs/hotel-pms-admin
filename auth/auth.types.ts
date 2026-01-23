
import { UserRole as LegacyRole } from '../types';

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN', // Platform/Owner
  HOTEL_ADMIN = 'HOTEL_ADMIN', // Property Manager
  STAFF = 'STAFF'             // Front Desk / Operations
}

export type AppPermission = 
  | 'dashboard:view'
  | 'bookings:view'
  | 'bookings:update'
  | 'rooms:view'
  | 'rooms:edit'
  | 'pricing:view'
  | 'pricing:edit'
  | 'payments:view'
  | 'reports:view'
  | 'settings:view'
  | 'users:manage';

export interface HotelContext {
  id: string;
  name: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  hotelId?: string;
  hotels?: HotelContext[]; // Assigned hotels for chain management
  avatar?: string;
}
