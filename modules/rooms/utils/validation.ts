import { VALIDATION_RULES } from '../rooms.constants';

import { RoomStatus } from '../rooms.types';

export interface RoomFormData {
  roomNumber: string;
  roomTypeId: string;
  floor: number;
  viewType: string;
  status: RoomStatus | string;
}

export interface RoomTypeFormData {
  name: string;
  capacity: number;
  basePrice: number;
  maxAdults: number;
  maxChildren: number;
  extraBedAllowed: boolean;
  extraBedPrice: number;
}

export function validateRoomForm(data: RoomFormData): Partial<Record<keyof RoomFormData, string>> {
  const errors: Partial<Record<keyof RoomFormData, string>> = {};

  if (!data.roomNumber.trim()) {
    errors.roomNumber = 'Room number is required';
  } else if (data.roomNumber.length > VALIDATION_RULES.roomNumber.maxLength) {
    errors.roomNumber = `Room number must be ${VALIDATION_RULES.roomNumber.maxLength} characters or less`;
  } else if (!VALIDATION_RULES.roomNumber.pattern.test(data.roomNumber)) {
    errors.roomNumber = 'Room number can only contain letters, numbers, and hyphens';
  }

  if (!data.roomTypeId) {
    errors.roomTypeId = 'Room type is required';
  }

  if (data.floor < VALIDATION_RULES.floor.min || data.floor > VALIDATION_RULES.floor.max) {
    errors.floor = `Floor must be between ${VALIDATION_RULES.floor.min} and ${VALIDATION_RULES.floor.max}`;
  }

  return errors;
}

export function validateRoomTypeForm(data: RoomTypeFormData): Partial<Record<keyof RoomTypeFormData, string>> {
  const errors: Partial<Record<keyof RoomTypeFormData, string>> = {};

  if (!data.name.trim()) {
    errors.name = 'Room type name is required';
  } else if (data.name.length > 50) {
    errors.name = 'Room type name must be 50 characters or less';
  }

  if (data.basePrice < VALIDATION_RULES.basePrice.min || data.basePrice > VALIDATION_RULES.basePrice.max) {
    errors.basePrice = `Base price must be between ${VALIDATION_RULES.basePrice.min} and ${VALIDATION_RULES.basePrice.max}`;
  }

  if (data.capacity < VALIDATION_RULES.capacity.min || data.capacity > VALIDATION_RULES.capacity.max) {
    errors.capacity = `Capacity must be between ${VALIDATION_RULES.capacity.min} and ${VALIDATION_RULES.capacity.max}`;
  }

  if (data.maxAdults < VALIDATION_RULES.maxAdults.min || data.maxAdults > VALIDATION_RULES.maxAdults.max) {
    errors.maxAdults = `Max adults must be between ${VALIDATION_RULES.maxAdults.min} and ${VALIDATION_RULES.maxAdults.max}`;
  }

  if (data.maxChildren < VALIDATION_RULES.maxChildren.min || data.maxChildren > VALIDATION_RULES.maxChildren.max) {
    errors.maxChildren = `Max children must be between ${VALIDATION_RULES.maxChildren.min} and ${VALIDATION_RULES.maxChildren.max}`;
  }

  if (data.extraBedAllowed) {
    if (data.extraBedPrice < VALIDATION_RULES.extraBedPrice.min || data.extraBedPrice > VALIDATION_RULES.extraBedPrice.max) {
      errors.extraBedPrice = `Extra bed price must be between ${VALIDATION_RULES.extraBedPrice.min} and ${VALIDATION_RULES.extraBedPrice.max}`;
    }
  }

  return errors;
}
