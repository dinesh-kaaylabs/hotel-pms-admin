
export type GuestTag = 'VIP' | 'BLACKLISTED';

export interface Guest {
  id: string;
  name: string;
  phone: string;
  email: string;
  idType: string;
  idNumber: string;
  nationality: string;
  preferences?: {
    pillowType?: string;
    smoking?: boolean;
    dietaryNeeds?: string;
  };
  isVip: boolean;
  privacyLevel: string;
  // Legacy fields for backward compatibility
  tags?: GuestTag[];
  totalStays?: number;
  lifetimeValue?: number;
  currency?: string;
}

export interface GuestStay {
  id: string;
  guestId: string;
  hotelId: string;
  checkInDate: string;
  checkOutDate: string;
  roomNumber: string;
  totalSpent: number;
  // Legacy fields for backward compatibility
  bookingId?: string;
  bookingNumber?: string;
  roomType?: string;
  amountPaid?: number;
  status?: string;
}

export interface GuestNote {
  id: string;
  guestId: string;
  hotelId: string;
  content: string;
  createdAt: string;
  userId?: string;
  // Legacy fields for backward compatibility
  note?: string;
  createdBy?: string;
}

export interface GuestFilters {
  search?: string;
  tag?: GuestTag;
}
