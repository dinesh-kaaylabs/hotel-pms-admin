
export type RoomStatus = "AVAILABLE" | "BOOKED" | "BLOCKED";

export interface RoomType {
  id: string;
  name: string;
  capacity: number;
  baseOccupancy: number;
  maxOccupancy: number;
  active: boolean;
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
