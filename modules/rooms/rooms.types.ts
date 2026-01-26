
export type RoomStatus = "CLEAN" | "DIRTY" | "OCCUPIED" | "MAINTENANCE" | "AVAILABLE" | "BOOKED" | "BLOCKED";

export interface Room {
  id: string;
  hotelId: string;
  roomNumber: string;
  roomTypeId: string;
  status: RoomStatus;
  floor: number;
  lastCleanedAt: string;
  lastInspectedAt: string;
  viewType: string;
  outOfOrderReason?: string;
  maintenanceTicketId?: string;
}

export interface RoomType {
  id: string;
  hotelId: string;
  name: string;
  capacity: number;
  basePrice: number;
  maxAdults: number;
  maxChildren: number;
  extraBedAllowed: boolean;
  extraBedPrice: number | null;
  // Legacy fields for backward compatibility
  baseOccupancy?: number;
  maxOccupancy?: number;
  active?: boolean;
}

export interface RoomInventory {
  id: string;
  roomTypeId: string;
  date: string;
  totalRooms: number;
  availableRooms: number;
  status: RoomStatus;
}

export interface BulkUpdateInventoryPayload {
  startDate: string;
  endDate: string;
  roomTypeIds: string[];
  status?: RoomStatus;
  totalRooms?: number;
}
