/**
 * Guest classification tags
 * Used for guest segmentation and special handling
 * 
 * @remarks
 * - VIP: High-value guests requiring special treatment
 * - BLACKLISTED: Guests with history of issues (payment defaults, property damage, etc.)
 */
export type GuestTag = 'VIP' | 'BLACKLISTED';

/**
 * Guest profile entity
 * Represents a hotel guest with contact details, preferences, and CRM data
 * 
 * @property id - Unique guest identifier (UUID)
 * @property name - Guest full name
 * @property phone - Primary contact number (international format)
 * @property email - Primary email address
 * @property idType - Government ID type (e.g., "Passport", "Aadhaar", "Driver's License")
 * @property idNumber - Government ID number (encrypted at rest)
 * @property nationality - Guest nationality (ISO 3166-1 alpha-2 code)
 * @property preferences - Guest preferences for personalized service
 * @property preferences.pillowType - Pillow preference (e.g., "Soft", "Firm")
 * @property preferences.smoking - Smoking preference
 * @property preferences.dietaryNeeds - Dietary restrictions or preferences
 * @property isVip - VIP status flag
 * @property privacyLevel - Privacy level (e.g., "PUBLIC", "PRIVATE", "RESTRICTED")
 * @property tags - Legacy guest classification tags (backward compatibility)
 * @property totalStays - Legacy total stays count (backward compatibility)
 * @property lifetimeValue - Legacy LTV calculation (backward compatibility)
 * @property currency - Legacy currency preference (backward compatibility)
 * 
 * @remarks
 * - Personal data (ID numbers) are encrypted at rest and in transit
 * - Preferences are used for personalized guest experience
 * - Legacy fields maintained during CRM module migration
 * - Backend enforces data privacy regulations (GDPR, etc.)
 */
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
  tags?: GuestTag[];
  totalStays?: number;
  lifetimeValue?: number;
  currency?: string;
}

/**
 * Guest stay history record
 * Represents a single stay/visit by a guest (linked to a booking)
 * 
 * @property id - Unique stay record identifier (UUID)
 * @property guestId - Reference to guest profile
 * @property hotelId - Hotel context identifier (multi-tenancy)
 * @property checkInDate - Actual check-in date (ISO 8601 date string)
 * @property checkOutDate - Actual check-out date (ISO 8601 date string)
 * @property roomNumber - Room number assigned during stay
 * @property totalSpent - Total amount spent during stay (backend-calculated)
 * @property bookingId - Reference to original booking (enriched field)
 * @property bookingNumber - Human-readable booking reference (enriched field)
 * @property roomType - Room type name (enriched field)
 * @property amountPaid - Amount paid for this stay (enriched field)
 * @property status - Stay status (enriched field)
 * 
 * @remarks
 * - Stay records are created upon check-in
 * - Enriched fields are populated from booking data for quick access
 * - Used for guest history and lifetime value calculations
 * - Backend is source of truth for financial data
 */
export interface GuestStay {
  id: string;
  guestId: string;
  hotelId: string;
  checkInDate: string;
  checkOutDate: string;
  roomNumber: string;
  totalSpent: number;
  bookingId?: string;
  bookingNumber?: string;
  roomType?: string;
  amountPaid?: number;
  status?: string;
}

/**
 * Guest note/comment entity
 * Internal staff notes about a guest (CRM feature)
 * 
 * @property id - Unique note identifier (UUID)
 * @property guestId - Reference to guest profile
 * @property hotelId - Hotel context identifier (multi-tenancy)
 * @property content - Note content (free-text, supports markdown)
 * @property createdAt - Note creation timestamp (ISO 8601 datetime)
 * @property userId - Reference to staff member who created note
 * @property note - Legacy field for backward compatibility
 * @property createdBy - Legacy field for backward compatibility
 * 
 * @remarks
 * - Notes are visible only to hotel staff (not guests)
 * - Used for tracking guest preferences, incidents, special requests
 * - Legacy fields maintained during CRM module migration
 * - Backend enforces RBAC for note access
 */
export interface GuestNote {
  id: string;
  guestId: string;
  hotelId: string;
  content: string;
  createdAt: string;
  userId?: string;
  note?: string;
  createdBy?: string;
}

/**
 * Guest list filter parameters
 * Used for filtering and searching guest records
 * 
 * @property search - Free-text search query (searches name, email, phone)
 * @property tag - Filter by guest classification tag
 * 
 * @remarks
 * - Backend performs case-insensitive search on multiple fields
 * - Search results are paginated for performance
 */
export interface GuestFilters {
  search?: string;
  tag?: GuestTag;
}
