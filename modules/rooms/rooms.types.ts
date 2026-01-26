/**
 * Room operational status enum
 * Represents the current state of a room for housekeeping and availability tracking
 * 
 * @remarks
 * - CLEAN: Room is ready for guest check-in
 * - DIRTY: Room requires housekeeping after checkout
 * - OCCUPIED: Room is currently occupied by a guest
 * - MAINTENANCE: Room is under repair (Out of Order)
 * - AVAILABLE: Room is vacant and ready
 * - BOOKED: Room is reserved for future check-in
 * - BLOCKED: Room is manually blocked from booking
 */
export type RoomStatus = "CLEAN" | "DIRTY" | "OCCUPIED" | "MAINTENANCE" | "AVAILABLE" | "BOOKED" | "BLOCKED";

/**
 * Individual room entity
 * Represents a physical room unit in the hotel inventory
 * 
 * @property id - Unique room identifier (UUID)
 * @property hotelId - Hotel context identifier (multi-tenancy)
 * @property roomNumber - Physical room number (e.g., "101", "A-205")
 * @property roomTypeId - Reference to room type/category
 * @property status - Current operational status
 * @property floor - Floor number (0 for ground floor)
 * @property lastCleanedAt - Timestamp of last housekeeping completion (ISO 8601)
 * @property lastInspectedAt - Timestamp of last quality inspection (ISO 8601)
 * @property viewType - View category (e.g., "Sea View", "Garden View", "City View")
 * @property outOfOrderReason - Reason for maintenance status (free-text)
 * @property maintenanceTicketId - Reference to maintenance ticket if applicable
 * 
 * @remarks
 * - Room status is updated by housekeeping module and booking module
 * - lastCleanedAt and lastInspectedAt are used for housekeeping SLA tracking
 */
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

/**
 * Room type/category configuration
 * Defines a room category with pricing and occupancy rules
 * 
 * @property id - Unique room type identifier (UUID)
 * @property hotelId - Hotel context identifier (multi-tenancy)
 * @property name - Room type display name (e.g., "Deluxe", "Suite", "Standard")
 * @property capacity - Standard guest capacity
 * @property basePrice - Base nightly rate (backend-provided, used for pricing calculations)
 * @property maxAdults - Maximum number of adults allowed
 * @property maxChildren - Maximum number of children allowed
 * @property extraBedAllowed - Whether extra bed can be added
 * @property extraBedPrice - Additional charge for extra bed (backend-provided)
 * @property baseOccupancy - Legacy field for backward compatibility
 * @property maxOccupancy - Legacy field for backward compatibility
 * @property active - Legacy field for backward compatibility
 * 
 * @remarks
 * - Base price is reference only; actual pricing comes from pricing module
 * - Backend is source of truth for all pricing calculations
 * - Legacy fields maintained for backward compatibility during migration
 */
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
  baseOccupancy?: number;
  maxOccupancy?: number;
  active?: boolean;
}

/**
 * Daily room inventory snapshot
 * Tracks available rooms per type per date for booking availability
 * 
 * @property id - Unique inventory record identifier (UUID)
 * @property roomTypeId - Reference to room type
 * @property date - Inventory date (ISO 8601 date string)
 * @property totalRooms - Total rooms of this type
 * @property availableRooms - Number of rooms available for booking
 * @property status - Aggregated status for this room type on this date
 * 
 * @remarks
 * - Backend maintains inventory in real-time based on bookings and room status
 * - Frontend never calculates availability; always queries backend
 * - Used by booking engine to check room availability
 */
export interface RoomInventory {
  id: string;
  roomTypeId: string;
  date: string;
  totalRooms: number;
  availableRooms: number;
  status: RoomStatus;
}

/**
 * Bulk inventory update payload
 * Used for batch updating room inventory across date ranges
 * 
 * @property startDate - Start date of range (ISO 8601 date string)
 * @property endDate - End date of range (ISO 8601 date string)
 * @property roomTypeIds - Array of room type IDs to update
 * @property status - Optional status to set for all rooms in range
 * @property totalRooms - Optional total rooms count to set
 * 
 * @remarks
 * - Used by pricing module for bulk inventory management
 * - Backend validates date ranges and room type existence
 * - Useful for seasonal closures or bulk status changes
 */
export interface BulkUpdateInventoryPayload {
  startDate: string;
  endDate: string;
  roomTypeIds: string[];
  status?: RoomStatus;
  totalRooms?: number;
}
