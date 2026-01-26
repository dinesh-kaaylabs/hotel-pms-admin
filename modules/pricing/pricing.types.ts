
export type RatePlanStatus = 'ACTIVE' | 'INACTIVE';

export interface RatePlan {
  id: string;
  name: string;
  hotelId?: string;
  roomTypeId: string;
  roomTypeName?: string; // Populated by join or frontend mapping
  mealPlan?: string;
  status: RatePlanStatus;
  refundable: boolean;
  minNights?: number;
  maxNights?: number;
}

export interface RoomPrice {
  id: string;
  date: string;
  roomTypeId: string;
  ratePlanId: string;
  basePrice?: number;
  adjustedPrice?: number;
  price: number;
  occupancy?: number;
  availableRooms: number;
  closed: boolean;
}

export interface BulkPricingUpdatePayload {
  startDate: string;
  endDate: string;
  ratePlanIds: string[];
  price?: number;
  closed?: boolean;
}
