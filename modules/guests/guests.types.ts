
export type GuestTag = 'VIP' | 'BLACKLISTED';

export interface Guest {
  id: string;
  name: string;
  phone: string;
  email?: string;
  tags: GuestTag[];
  totalStays: number;
  lifetimeValue: number;
  currency: string;
}

export interface GuestStay {
  bookingId: string;
  bookingNumber: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  amountPaid: number;
  status: string;
}

export interface GuestNote {
  id: string;
  note: string;
  createdBy: string;
  createdAt: string;
}

export interface GuestFilters {
  search?: string;
  tag?: GuestTag;
}
