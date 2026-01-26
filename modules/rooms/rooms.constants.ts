import { RoomStatus } from './rooms.types';

/**
 * Room status constants
 */
export const ROOM_STATUSES: readonly RoomStatus[] = ['CLEAN', 'DIRTY', 'OCCUPIED', 'MAINTENANCE', 'AVAILABLE', 'BOOKED', 'BLOCKED'] as const;

export const ROOM_STATUS_OPTIONS = [
  { value: 'ALL', label: 'All Status' },
  { value: 'CLEAN', label: 'Clean' },
  { value: 'DIRTY', label: 'Dirty' },
  { value: 'OCCUPIED', label: 'Occupied' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
] as const;

/**
 * View type constants
 */
export const VIEW_TYPES = [
  { value: 'CITY_VIEW', label: 'City View' },
  { value: 'SEA_VIEW', label: 'Sea View' },
  { value: 'GARDEN_VIEW', label: 'Garden View' },
  { value: 'POOL_VIEW', label: 'Pool View' },
] as const;

export type ViewType = typeof VIEW_TYPES[number]['value'];

/**
 * Form validation rules
 */
export const VALIDATION_RULES = {
  roomNumber: {
    required: true,
    minLength: 1,
    maxLength: 20,
    pattern: /^[A-Z0-9\-]+$/i,
  },
  floor: {
    min: 0,
    max: 100,
  },
  basePrice: {
    min: 0,
    max: 1000000,
  },
  capacity: {
    min: 1,
    max: 20,
  },
  maxAdults: {
    min: 1,
    max: 20,
  },
  maxChildren: {
    min: 0,
    max: 20,
  },
  extraBedPrice: {
    min: 0,
    max: 100000,
  },
} as const;
