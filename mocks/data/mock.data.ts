/**
 * 🏨 LUXESTAY PMS - CENTRALIZED MOCK DATA (2025–2026)
 * 
 * ENTERPRISE SINGLE SOURCE OF TRUTH
 * All mock data for GraphQL operations is defined here.
 * Handlers ONLY import and serve this data.
 * NO inline JSON. NO hardcoded responses.
 * 
 * Multi-tenant, multi-hotel, multi-user architecture.
 * 15+ records per entity for realistic dashboard experience.
 */

// ============================================================================
// AUTHENTICATION & IDENTITY (MULTI-TENANT, MULTI-USER)
// ============================================================================

export const authMockData = {
  adminUser: {
    id: 's-1',
    name: 'John Admin',
    email: 'admin@luxestay.com',
    password: 'Password123!',
    role: 'HOTEL_ADMIN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    hotels: [
      { id: 'h-101', name: 'LuxeStay Ocean View' },
      { id: 'h-102', name: 'LuxeStay City Express' }
    ]
  },
  staffUsers: [
    { id: 's-1', name: 'John Admin', email: 'admin@luxestay.com', role: 'HOTEL_ADMIN', hotelId: 'h-101', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s1' },
    { id: 's-2', name: 'Sarah Manager', email: 'sarah@luxestay.com', role: 'HOTEL_MANAGER', hotelId: 'h-101', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s2' },
    { id: 's-3', name: 'Priya FrontDesk', email: 'priya@luxestay.com', role: 'FRONT_DESK', hotelId: 'h-101', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s3' },
    { id: 's-4', name: 'Rajesh Housekeeping', email: 'rajesh@luxestay.com', role: 'HOUSEKEEPING', hotelId: 'h-101', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s4' },
    { id: 's-5', name: 'Maya Admin', email: 'maya@luxestay.com', role: 'HOTEL_ADMIN', hotelId: 'h-102', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s5' },
    { id: 's-6', name: 'Amit Manager', email: 'amit@luxestay.com', role: 'HOTEL_MANAGER', hotelId: 'h-102', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s6' },
    { id: 's-7', name: 'Lisa FrontDesk', email: 'lisa@luxestay.com', role: 'FRONT_DESK', hotelId: 'h-102', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s7' },
    { id: 's-8', name: 'Vikram Housekeeping', email: 'vikram@luxestay.com', role: 'HOUSEKEEPING', hotelId: 'h-102', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s8' }
  ],
  mfaCode: '123456',
  mfaToken: 'mfa-token-123'
};

// ============================================================================
// HOTELS (MULTI-TENANT)
// ============================================================================

export const hotelsMockData = {
  hotels: [
    { id: 'h-101', name: 'LuxeStay Ocean View', city: 'Goa', status: 'ACTIVE', tenantId: 't-1', address: '123 Ocean View Lane, Goa 403001', timezone: 'Asia/Kolkata', currency: 'USD' },
    { id: 'h-102', name: 'LuxeStay City Express', city: 'Mumbai', status: 'ACTIVE', tenantId: 't-1', address: '456 City Center, Mumbai 400001', timezone: 'Asia/Kolkata', currency: 'USD' },
    { id: 'h-103', name: 'LuxeStay Heritage Delhi', city: 'Delhi', status: 'ACTIVE', tenantId: 't-1', address: '789 Heritage Complex, Delhi 110001', timezone: 'Asia/Kolkata', currency: 'USD' },
    { id: 'h-104', name: 'LuxeStay Riverside Bangalore', city: 'Bangalore', status: 'ACTIVE', tenantId: 't-1', address: '321 Riverside Drive, Bangalore 560001', timezone: 'Asia/Kolkata', currency: 'USD' }
  ],
  defaultHotelId: 'h-101',
  branding: {
    name: 'LuxeStay PMS',
    primaryColor: '#4f46e5',
    theme: 'light',
    font: 'Inter',
    logoUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=luxestay'
  }
};

// ============================================================================
// BOOKINGS (15+ RECORDS, MULTI-HOTEL)
// ============================================================================

export const bookingsMockData = {
  bookings: [
    { id: 'b-1', bookingNumber: 'LS-9901', hotelId: 'h-101', guestName: 'Alice Margeret', guestEmail: 'alice@example.com', checkInDate: '2025-05-18', checkOutDate: '2025-05-22', checkIn: '2025-05-18', checkOut: '2025-05-22', status: 'CONFIRMED', roomType: 'Deluxe Suite', roomNumber: '101', totalAmount: 600, paymentStatus: 'PAID', createdAt: '2025-05-10' },
    { id: 'b-2', bookingNumber: 'LS-9902', hotelId: 'h-101', guestName: 'Robert Smith', guestEmail: 'robert@example.com', checkInDate: '2025-05-20', checkOutDate: '2025-05-25', checkIn: '2025-05-20', checkOut: '2025-05-25', status: 'CONFIRMED', roomType: 'Standard Room', roomNumber: '102', totalAmount: 400, paymentStatus: 'PAID', createdAt: '2025-05-12' },
    { id: 'b-3', bookingNumber: 'LS-9903', hotelId: 'h-101', guestName: 'Emma Johnson', guestEmail: 'emma@example.com', checkInDate: '2025-05-25', checkOutDate: '2025-05-28', checkIn: '2025-05-25', checkOut: '2025-05-28', status: 'CHECKED_IN', roomType: 'Deluxe Suite', roomNumber: '103', totalAmount: 450, paymentStatus: 'PAID', createdAt: '2025-05-15' },
    { id: 'b-4', bookingNumber: 'LS-9904', hotelId: 'h-101', guestName: 'Michael Chen', guestEmail: 'michael@example.com', checkInDate: '2025-05-26', checkOutDate: '2025-05-30', checkIn: '2025-05-26', checkOut: '2025-05-30', status: 'PENDING', roomType: 'Standard Room', roomNumber: '104', totalAmount: 500, paymentStatus: 'PENDING', createdAt: '2025-05-16' },
    { id: 'b-5', bookingNumber: 'LS-9905', hotelId: 'h-102', guestName: 'Jessica Williams', guestEmail: 'jessica@example.com', checkInDate: '2025-05-19', checkOutDate: '2025-05-23', checkIn: '2025-05-19', checkOut: '2025-05-23', status: 'CONFIRMED', roomType: 'Premium Suite', roomNumber: '201', totalAmount: 700, paymentStatus: 'PAID', createdAt: '2025-05-11' },
    { id: 'b-6', bookingNumber: 'LS-9906', hotelId: 'h-102', guestName: 'David Brown', guestEmail: 'david@example.com', checkInDate: '2025-05-21', checkOutDate: '2025-05-26', checkIn: '2025-05-21', checkOut: '2025-05-26', status: 'CHECKED_IN', roomType: 'Standard Room', roomNumber: '202', totalAmount: 450, paymentStatus: 'PAID', createdAt: '2025-05-13' },
    { id: 'b-7', bookingNumber: 'LS-9907', hotelId: 'h-102', guestName: 'Sophia Martinez', guestEmail: 'sophia@example.com', checkInDate: '2025-05-27', checkOutDate: '2025-05-31', checkIn: '2025-05-27', checkOut: '2025-05-31', status: 'PENDING', roomType: 'Deluxe Suite', roomNumber: '203', totalAmount: 550, paymentStatus: 'PENDING', createdAt: '2025-05-17' },
    { id: 'b-8', bookingNumber: 'LS-9908', hotelId: 'h-101', guestName: 'James Wilson', guestEmail: 'james@example.com', checkInDate: '2025-05-22', checkOutDate: '2025-05-27', checkIn: '2025-05-22', checkOut: '2025-05-27', status: 'CONFIRMED', roomType: 'Premium Suite', roomNumber: '105', totalAmount: 800, paymentStatus: 'PAID', createdAt: '2025-05-14' },
    { id: 'b-9', bookingNumber: 'LS-9909', hotelId: 'h-102', guestName: 'Olivia Taylor', guestEmail: 'olivia@example.com', checkInDate: '2025-05-23', checkOutDate: '2025-05-29', checkIn: '2025-05-23', checkOut: '2025-05-29', status: 'CHECKED_OUT', roomType: 'Standard Room', roomNumber: '204', totalAmount: 480, paymentStatus: 'PAID', createdAt: '2025-05-15' },
    { id: 'b-10', bookingNumber: 'LS-9910', hotelId: 'h-101', guestName: 'William Anderson', guestEmail: 'william@example.com', checkInDate: '2025-05-24', checkOutDate: '2025-05-28', checkIn: '2025-05-24', checkOut: '2025-05-28', status: 'CONFIRMED', roomType: 'Deluxe Suite', roomNumber: '106', totalAmount: 520, paymentStatus: 'PAID', createdAt: '2025-05-16' },
    { id: 'b-11', bookingNumber: 'LS-9911', hotelId: 'h-102', guestName: 'Ava Thomas', guestEmail: 'ava@example.com', checkInDate: '2025-05-25', checkOutDate: '2025-05-30', checkIn: '2025-05-25', checkOut: '2025-05-30', status: 'PENDING', roomType: 'Premium Suite', roomNumber: '205', totalAmount: 750, paymentStatus: 'PENDING', createdAt: '2025-05-18' },
    { id: 'b-12', bookingNumber: 'LS-9912', hotelId: 'h-101', guestName: 'Henry Garcia', guestEmail: 'henry@example.com', checkInDate: '2025-05-29', checkOutDate: '2025-06-02', checkIn: '2025-05-29', checkOut: '2025-06-02', status: 'CONFIRMED', roomType: 'Standard Room', roomNumber: '107', totalAmount: 420, paymentStatus: 'PAID', createdAt: '2025-05-19' },
    { id: 'b-13', bookingNumber: 'LS-9913', hotelId: 'h-102', guestName: 'Isabella Rodriguez', guestEmail: 'isabella@example.com', checkInDate: '2025-05-30', checkOutDate: '2025-06-03', checkIn: '2025-05-30', checkOut: '2025-06-03', status: 'CHECKED_IN', roomType: 'Deluxe Suite', roomNumber: '206', totalAmount: 590, paymentStatus: 'PAID', createdAt: '2025-05-20' },
    { id: 'b-14', bookingNumber: 'LS-9914', hotelId: 'h-101', guestName: 'Lucas Lee', guestEmail: 'lucas@example.com', checkInDate: '2025-06-01', checkOutDate: '2025-06-05', checkIn: '2025-06-01', checkOut: '2025-06-05', status: 'PENDING', roomType: 'Premium Suite', roomNumber: '108', totalAmount: 820, paymentStatus: 'PENDING', createdAt: '2025-05-21' },
    { id: 'b-15', bookingNumber: 'LS-9915', hotelId: 'h-102', guestName: 'Mia White', guestEmail: 'mia@example.com', checkInDate: '2025-06-02', checkOutDate: '2025-06-06', checkIn: '2025-06-02', checkOut: '2025-06-06', status: 'CONFIRMED', roomType: 'Standard Room', roomNumber: '207', totalAmount: 460, paymentStatus: 'PAID', createdAt: '2025-05-22' },
    { id: 'b-16', bookingNumber: 'LS-9916', hotelId: 'h-101', guestName: 'Benjamin Harris', guestEmail: 'benjamin@example.com', checkInDate: '2025-06-03', checkOutDate: '2025-06-07', checkIn: '2025-06-03', checkOut: '2025-06-07', status: 'CONFIRMED', roomType: 'Deluxe Suite', roomNumber: '109', totalAmount: 560, paymentStatus: 'PAID', createdAt: '2025-05-23' }
  ],
  invoices: [
    { id: 'inv-1', invoiceNumber: 'INV-LS-9901', bookingId: 'b-1', bookingNumber: 'LS-9901', hotelId: 'h-101', guestName: 'Alice Margeret', gstin: '18AABCT1234H1Z0', status: 'ISSUED', subtotal: 528, issueDate: '2025-05-23', taxAmount: 72, netAmount: 528, totalAmount: 600, currency: 'USD', issuedAt: '2025-05-23', pdfUrl: '#' },
    { id: 'inv-2', invoiceNumber: 'INV-LS-9902', bookingId: 'b-2', bookingNumber: 'LS-9902', hotelId: 'h-101', guestName: 'Robert Smith', gstin: '18AABCT1234H1Z0', status: 'ISSUED', subtotal: 352, issueDate: '2025-05-26', taxAmount: 48, netAmount: 352, totalAmount: 400, currency: 'USD', issuedAt: '2025-05-26', pdfUrl: '#' },
    { id: 'inv-3', invoiceNumber: 'INV-LS-9903', bookingId: 'b-3', bookingNumber: 'LS-9903', hotelId: 'h-101', guestName: 'Emma Johnson', gstin: '18AABCT1234H1Z0', status: 'ISSUED', subtotal: 396, issueDate: '2025-05-29', taxAmount: 54, netAmount: 396, totalAmount: 450, currency: 'USD', issuedAt: '2025-05-29', pdfUrl: '#' },
    { id: 'inv-4', invoiceNumber: 'INV-LS-9904', bookingId: 'b-4', bookingNumber: 'LS-9904', hotelId: 'h-101', guestName: 'Michael Chen', gstin: '18AABCT1234H1Z0', status: 'PENDING', subtotal: 440, issueDate: '2025-05-31', taxAmount: 60, netAmount: 440, totalAmount: 500, currency: 'USD', issuedAt: '2025-05-31', pdfUrl: '#' },
    { id: 'inv-5', invoiceNumber: 'INV-LS-9905', bookingId: 'b-5', bookingNumber: 'LS-9905', hotelId: 'h-102', guestName: 'Jessica Williams', gstin: '18AABCT1234H1Z0', status: 'ISSUED', subtotal: 616, issueDate: '2025-05-24', taxAmount: 84, netAmount: 616, totalAmount: 700, currency: 'USD', issuedAt: '2025-05-24', pdfUrl: '#' },
    { id: 'inv-6', invoiceNumber: 'INV-LS-9906', bookingId: 'b-6', bookingNumber: 'LS-9906', hotelId: 'h-102', guestName: 'David Brown', gstin: '18AABCT1234H1Z0', status: 'ISSUED', subtotal: 396, issueDate: '2025-05-27', taxAmount: 54, netAmount: 396, totalAmount: 450, currency: 'USD', issuedAt: '2025-05-27', pdfUrl: '#' },
    { id: 'inv-7', invoiceNumber: 'INV-LS-9907', bookingId: 'b-7', bookingNumber: 'LS-9907', hotelId: 'h-102', guestName: 'Sophia Martinez', gstin: '18AABCT1234H1Z0', status: 'PENDING', subtotal: 484, issueDate: '2025-06-01', taxAmount: 66, netAmount: 484, totalAmount: 550, currency: 'USD', issuedAt: '2025-06-01', pdfUrl: '#' },
    { id: 'inv-8', invoiceNumber: 'INV-LS-9908', bookingId: 'b-8', bookingNumber: 'LS-9908', hotelId: 'h-101', guestName: 'James Wilson', gstin: '18AABCT1234H1Z0', status: 'ISSUED', subtotal: 704, issueDate: '2025-05-28', taxAmount: 96, netAmount: 704, totalAmount: 800, currency: 'USD', issuedAt: '2025-05-28', pdfUrl: '#' },
    { id: 'inv-9', invoiceNumber: 'INV-LS-9909', bookingId: 'b-9', bookingNumber: 'LS-9909', hotelId: 'h-102', guestName: 'Olivia Taylor', gstin: '18AABCT1234H1Z0', status: 'ISSUED', subtotal: 422, issueDate: '2025-05-30', taxAmount: 58, netAmount: 422, totalAmount: 480, currency: 'USD', issuedAt: '2025-05-30', pdfUrl: '#' },
    { id: 'inv-10', invoiceNumber: 'INV-LS-9910', bookingId: 'b-10', bookingNumber: 'LS-9910', hotelId: 'h-101', guestName: 'William Anderson', gstin: '18AABCT1234H1Z0', status: 'ISSUED', subtotal: 458, issueDate: '2025-05-29', taxAmount: 62, netAmount: 458, totalAmount: 520, currency: 'USD', issuedAt: '2025-05-29', pdfUrl: '#' },
    { id: 'inv-11', invoiceNumber: 'INV-LS-9911', bookingId: 'b-11', bookingNumber: 'LS-9911', hotelId: 'h-102', guestName: 'Ava Thomas', gstin: '18AABCT1234H1Z0', status: 'PENDING', subtotal: 660, issueDate: '2025-06-02', taxAmount: 90, netAmount: 660, totalAmount: 750, currency: 'USD', issuedAt: '2025-06-02', pdfUrl: '#' },
    { id: 'inv-12', invoiceNumber: 'INV-LS-9912', bookingId: 'b-12', bookingNumber: 'LS-9912', hotelId: 'h-101', guestName: 'Henry Garcia', gstin: '18AABCT1234H1Z0', status: 'ISSUED', subtotal: 369, issueDate: '2025-06-03', taxAmount: 51, netAmount: 369, totalAmount: 420, currency: 'USD', issuedAt: '2025-06-03', pdfUrl: '#' },
    { id: 'inv-13', invoiceNumber: 'INV-LS-9913', bookingId: 'b-13', bookingNumber: 'LS-9913', hotelId: 'h-102', guestName: 'Isabella Rodriguez', gstin: '18AABCT1234H1Z0', status: 'ISSUED', subtotal: 519, issueDate: '2025-06-04', taxAmount: 71, netAmount: 519, totalAmount: 590, currency: 'USD', issuedAt: '2025-06-04', pdfUrl: '#' },
    { id: 'inv-14', invoiceNumber: 'INV-LS-9914', bookingId: 'b-14', bookingNumber: 'LS-9914', hotelId: 'h-101', guestName: 'Lucas Lee', gstin: '18AABCT1234H1Z0', status: 'PENDING', subtotal: 722, issueDate: '2025-06-05', taxAmount: 98, netAmount: 722, totalAmount: 820, currency: 'USD', issuedAt: '2025-06-05', pdfUrl: '#' },
    { id: 'inv-15', invoiceNumber: 'INV-LS-9915', bookingId: 'b-15', bookingNumber: 'LS-9915', hotelId: 'h-102', guestName: 'Mia White', gstin: '18AABCT1234H1Z0', status: 'ISSUED', subtotal: 404, issueDate: '2025-06-07', taxAmount: 56, netAmount: 404, totalAmount: 460, currency: 'USD', issuedAt: '2025-06-07', pdfUrl: '#' }
  ]
};

// ============================================================================
// GUESTS (15+ RECORDS, MULTI-HOTEL)
// ============================================================================

export const guestsMockData = {
  guests: [
    { id: 'g-1', hotelId: 'h-101', name: 'Alice Margeret', phone: '+91 9876543210', email: 'alice@example.com', tags: ['VIP'], totalStays: 4, lifetimeValue: 2400, currency: 'USD' },
    { id: 'g-2', hotelId: 'h-101', name: 'Robert Smith', phone: '+91 9876543211', email: 'robert@example.com', tags: ['FREQUENT'], totalStays: 8, lifetimeValue: 3200, currency: 'USD' },
    { id: 'g-3', hotelId: 'h-101', name: 'Emma Johnson', phone: '+91 9876543212', email: 'emma@example.com', tags: ['REGULAR'], totalStays: 3, lifetimeValue: 1350, currency: 'USD' },
    { id: 'g-4', hotelId: 'h-101', name: 'Michael Chen', phone: '+91 9876543213', email: 'michael@example.com', tags: [], totalStays: 1, lifetimeValue: 500, currency: 'USD' },
    { id: 'g-5', hotelId: 'h-102', name: 'Jessica Williams', phone: '+91 9876543214', email: 'jessica@example.com', tags: ['VIP'], totalStays: 6, lifetimeValue: 4200, currency: 'USD' },
    { id: 'g-6', hotelId: 'h-102', name: 'David Brown', phone: '+91 9876543215', email: 'david@example.com', tags: ['FREQUENT'], totalStays: 7, lifetimeValue: 3150, currency: 'USD' },
    { id: 'g-7', hotelId: 'h-102', name: 'Sophia Martinez', phone: '+91 9876543216', email: 'sophia@example.com', tags: ['REGULAR'], totalStays: 2, lifetimeValue: 1000, currency: 'USD' },
    { id: 'g-8', hotelId: 'h-101', name: 'James Wilson', phone: '+91 9876543217', email: 'james@example.com', tags: ['VIP'], totalStays: 5, lifetimeValue: 4000, currency: 'USD' },
    { id: 'g-9', hotelId: 'h-102', name: 'Olivia Taylor', phone: '+91 9876543218', email: 'olivia@example.com', tags: ['FREQUENT'], totalStays: 9, lifetimeValue: 3600, currency: 'USD' },
    { id: 'g-10', hotelId: 'h-101', name: 'William Anderson', phone: '+91 9876543219', email: 'william@example.com', tags: ['REGULAR'], totalStays: 2, lifetimeValue: 1040, currency: 'USD' },
    { id: 'g-11', hotelId: 'h-102', name: 'Ava Thomas', phone: '+91 9876543220', email: 'ava@example.com', tags: ['VIP'], totalStays: 4, lifetimeValue: 3000, currency: 'USD' },
    { id: 'g-12', hotelId: 'h-101', name: 'Henry Garcia', phone: '+91 9876543221', email: 'henry@example.com', tags: [], totalStays: 1, lifetimeValue: 420, currency: 'USD' },
    { id: 'g-13', hotelId: 'h-102', name: 'Isabella Rodriguez', phone: '+91 9876543222', email: 'isabella@example.com', tags: ['FREQUENT'], totalStays: 6, lifetimeValue: 3540, currency: 'USD' },
    { id: 'g-14', hotelId: 'h-101', name: 'Lucas Lee', phone: '+91 9876543223', email: 'lucas@example.com', tags: ['VIP'], totalStays: 3, lifetimeValue: 2460, currency: 'USD' },
    { id: 'g-15', hotelId: 'h-102', name: 'Mia White', phone: '+91 9876543224', email: 'mia@example.com', tags: ['REGULAR'], totalStays: 2, lifetimeValue: 920, currency: 'USD' }
  ],
  guestStays: [
    { bookingId: 'b-1', bookingNumber: 'LS-9901', guestId: 'g-1', roomType: 'Deluxe Suite', checkInDate: '2025-05-18', checkOutDate: '2025-05-22', amountPaid: 600, status: 'COMPLETED' },
    { bookingId: 'b-2', bookingNumber: 'LS-9902', guestId: 'g-2', roomType: 'Standard Room', checkInDate: '2025-05-20', checkOutDate: '2025-05-25', amountPaid: 400, status: 'COMPLETED' },
    { bookingId: 'b-3', bookingNumber: 'LS-9903', guestId: 'g-3', roomType: 'Deluxe Suite', checkInDate: '2025-05-25', checkOutDate: '2025-05-28', amountPaid: 450, status: 'ONGOING' },
    { bookingId: 'b-5', bookingNumber: 'LS-9905', guestId: 'g-5', roomType: 'Premium Suite', checkInDate: '2025-05-19', checkOutDate: '2025-05-23', amountPaid: 700, status: 'COMPLETED' },
    { bookingId: 'b-6', bookingNumber: 'LS-9906', guestId: 'g-6', roomType: 'Standard Room', checkInDate: '2025-05-21', checkOutDate: '2025-05-26', amountPaid: 450, status: 'ONGOING' }
  ],
  guestNotes: [
    { id: 'n-1', guestId: 'g-1', note: 'Prefers high floor', createdBy: 'Admin', createdAt: '2025-05-10' },
    { id: 'n-2', guestId: 'g-2', note: 'Business traveler, early checkout', createdBy: 'Sarah Manager', createdAt: '2025-05-12' },
    { id: 'n-3', guestId: 'g-5', note: 'VIP guest, arrange welcome amenities', createdBy: 'Priya FrontDesk', createdAt: '2025-05-11' },
    { id: 'n-4', guestId: 'g-8', note: 'Anniversary booking, complimentary upgrade', createdBy: 'Admin', createdAt: '2025-05-14' }
  ],
  newGuestNote: { id: 'n-20', guestId: 'g-1', note: 'Added note', createdBy: 'Admin', createdAt: '2025-05-20' }
};

// ============================================================================
// ROOMS & INVENTORY (MULTI-HOTEL, MULTI-TYPE)
// ============================================================================

export const roomsMockData = {
  rooms: [
    { id: 'r-101', hotelId: 'h-101', roomNumber: '101', type: 'Deluxe Suite', status: 'CLEAN', floor: 1 },
    { id: 'r-102', hotelId: 'h-101', roomNumber: '102', type: 'Standard Room', status: 'DIRTY', floor: 1 },
    { id: 'r-103', hotelId: 'h-101', roomNumber: '103', type: 'Deluxe Suite', status: 'OCCUPIED', floor: 1 },
    { id: 'r-104', hotelId: 'h-101', roomNumber: '104', type: 'Standard Room', status: 'CLEAN', floor: 2 },
    { id: 'r-105', hotelId: 'h-101', roomNumber: '105', type: 'Premium Suite', status: 'OCCUPIED', floor: 2 },
    { id: 'r-106', hotelId: 'h-101', roomNumber: '106', type: 'Deluxe Suite', status: 'CLEAN', floor: 2 },
    { id: 'r-107', hotelId: 'h-101', roomNumber: '107', type: 'Standard Room', status: 'DIRTY', floor: 3 },
    { id: 'r-108', hotelId: 'h-101', roomNumber: '108', type: 'Premium Suite', status: 'CLEAN', floor: 3 },
    { id: 'r-109', hotelId: 'h-101', roomNumber: '109', type: 'Deluxe Suite', status: 'OCCUPIED', floor: 3 },
    { id: 'r-201', hotelId: 'h-102', roomNumber: '201', type: 'Premium Suite', status: 'CLEAN', floor: 2 },
    { id: 'r-202', hotelId: 'h-102', roomNumber: '202', type: 'Standard Room', status: 'OCCUPIED', floor: 2 },
    { id: 'r-203', hotelId: 'h-102', roomNumber: '203', type: 'Deluxe Suite', status: 'DIRTY', floor: 2 },
    { id: 'r-204', hotelId: 'h-102', roomNumber: '204', type: 'Standard Room', status: 'CLEAN', floor: 3 },
    { id: 'r-205', hotelId: 'h-102', roomNumber: '205', type: 'Premium Suite', status: 'OCCUPIED', floor: 3 },
    { id: 'r-206', hotelId: 'h-102', roomNumber: '206', type: 'Deluxe Suite', status: 'CLEAN', floor: 3 },
    { id: 'r-207', hotelId: 'h-102', roomNumber: '207', type: 'Standard Room', status: 'DIRTY', floor: 4 }
  ],
  roomTypes: [
    { id: 'rt-1', hotelId: 'h-101', name: 'Deluxe Suite', roomTypeName: 'Deluxe Suite', capacity: 4, baseOccupancy: 2, maxOccupancy: 4, active: true, minNights: 1, maxNights: 30 },
    { id: 'rt-2', hotelId: 'h-101', name: 'Standard Room', roomTypeName: 'Standard Room', capacity: 2, baseOccupancy: 2, maxOccupancy: 2, active: true, minNights: 1, maxNights: 30 },
    { id: 'rt-3', hotelId: 'h-101', name: 'Premium Suite', roomTypeName: 'Premium Suite', capacity: 6, baseOccupancy: 2, maxOccupancy: 6, active: true, minNights: 2, maxNights: 30 },
    { id: 'rt-4', hotelId: 'h-102', name: 'Deluxe Suite', roomTypeName: 'Deluxe Suite', capacity: 4, baseOccupancy: 2, maxOccupancy: 4, active: true, minNights: 1, maxNights: 30 },
    { id: 'rt-5', hotelId: 'h-102', name: 'Standard Room', roomTypeName: 'Standard Room', capacity: 2, baseOccupancy: 2, maxOccupancy: 2, active: true, minNights: 1, maxNights: 30 },
    { id: 'rt-6', hotelId: 'h-102', name: 'Premium Suite', roomTypeName: 'Premium Suite', capacity: 6, baseOccupancy: 2, maxOccupancy: 6, active: true, minNights: 2, maxNights: 30 }
  ],
  inventory: [
    { id: 'inv-1', hotelId: 'h-101', roomTypeId: 'rt-1', date: '2025-05-18', totalRooms: 10, availableRooms: 7, status: 'AVAILABLE' },
    { id: 'inv-2', hotelId: 'h-101', roomTypeId: 'rt-2', date: '2025-05-18', totalRooms: 8, availableRooms: 6, status: 'AVAILABLE' },
    { id: 'inv-3', hotelId: 'h-101', roomTypeId: 'rt-3', date: '2025-05-18', totalRooms: 4, availableRooms: 2, status: 'AVAILABLE' },
    { id: 'inv-4', hotelId: 'h-102', roomTypeId: 'rt-4', date: '2025-05-18', totalRooms: 12, availableRooms: 9, status: 'AVAILABLE' },
    { id: 'inv-5', hotelId: 'h-102', roomTypeId: 'rt-5', date: '2025-05-18', totalRooms: 10, availableRooms: 7, status: 'AVAILABLE' },
    { id: 'inv-6', hotelId: 'h-102', roomTypeId: 'rt-6', date: '2025-05-18', totalRooms: 5, availableRooms: 3, status: 'AVAILABLE' }
  ],
  newRoomType: { id: 'rt-10', name: 'Premium Suite', roomTypeName: 'Premium Suite', capacity: 6, baseOccupancy: 2, maxOccupancy: 6, active: true, minNights: 1, maxNights: 30, success: true }
};

// ============================================================================
// FINANCE & PAYMENTS (15+ RECORDS, MULTI-HOTEL)
// ============================================================================

export const financeMockData = {
  invoices: [
    { id: 'inv-1', invoiceNumber: 'INV-LS-9901', bookingId: 'b-1', bookingNumber: 'LS-9901', hotelId: 'h-101', guestName: 'Alice Margeret', gstin: '18AABCT1234H1Z0', status: 'ISSUED', subtotal: 528, totalAmount: 600, currency: 'USD', issuedAt: '2025-05-23' },
    { id: 'inv-2', invoiceNumber: 'INV-LS-9902', bookingId: 'b-2', bookingNumber: 'LS-9902', hotelId: 'h-101', guestName: 'Robert Smith', gstin: '18AABCT1234H1Z0', status: 'ISSUED', subtotal: 352, totalAmount: 400, currency: 'USD', issuedAt: '2025-05-26' },
    { id: 'inv-3', invoiceNumber: 'INV-LS-9903', bookingId: 'b-3', bookingNumber: 'LS-9903', hotelId: 'h-101', guestName: 'Emma Johnson', gstin: '18AABCT1234H1Z0', status: 'ISSUED', subtotal: 396, totalAmount: 450, currency: 'USD', issuedAt: '2025-05-29' },
    { id: 'inv-4', invoiceNumber: 'INV-LS-9904', bookingId: 'b-4', bookingNumber: 'LS-9904', hotelId: 'h-101', guestName: 'Michael Chen', gstin: '18AABCT1234H1Z0', status: 'PENDING', subtotal: 440, totalAmount: 500, currency: 'USD', issuedAt: '2025-05-31' },
    { id: 'inv-5', invoiceNumber: 'INV-LS-9905', bookingId: 'b-5', bookingNumber: 'LS-9905', hotelId: 'h-102', guestName: 'Jessica Williams', gstin: '18AABCT1234H1Z0', status: 'ISSUED', subtotal: 616, totalAmount: 700, currency: 'USD', issuedAt: '2025-05-24' }
  ],
  payments: [
    { id: 'p-1', hotelId: 'h-101', bookingId: 'b-1', bookingNumber: 'LS-9901', provider: 'STRIPE', providerPaymentId: 'ch_1A8oz2L27z01l6scsHO9idqo', method: 'CARD', status: 'CAPTURED', amount: 600, currency: 'USD', createdAt: '2025-05-15' },
    { id: 'p-2', hotelId: 'h-101', bookingId: 'b-2', bookingNumber: 'LS-9902', provider: 'STRIPE', providerPaymentId: 'ch_1A8oz2L27z01l6scsHO9idqo1', method: 'CARD', status: 'CAPTURED', amount: 400, currency: 'USD', createdAt: '2025-05-17' },
    { id: 'p-3', hotelId: 'h-101', bookingId: 'b-3', bookingNumber: 'LS-9903', provider: 'RAZORPAY', providerPaymentId: 'pay_LKm8v4Xn8k1', method: 'CARD', status: 'CAPTURED', amount: 450, currency: 'USD', createdAt: '2025-05-20' },
    { id: 'p-4', hotelId: 'h-101', bookingId: 'b-4', bookingNumber: 'LS-9904', provider: 'STRIPE', providerPaymentId: 'ch_1A8oz2L27z01l6scsHO9idqo2', method: 'UPI', status: 'PENDING', amount: 500, currency: 'USD', createdAt: '2025-05-21' },
    { id: 'p-5', hotelId: 'h-102', bookingId: 'b-5', bookingNumber: 'LS-9905', provider: 'RAZORPAY', providerPaymentId: 'pay_LKm8v4Xn8k2', method: 'CARD', status: 'CAPTURED', amount: 700, currency: 'USD', createdAt: '2025-05-16' }
  ],
  settlements: [
    { id: 'set-1', hotelId: 'h-101', source: 'RAZORPAY', referenceId: 'pay_LKm8v4Xn8k', grossAmount: 1000, commission: 0, gatewayFee: 23, netAmount: 977, currency: 'USD', status: 'SETTLED', expectedAt: '2025-05-25', settledAt: '2025-05-18', createdAt: '2025-05-15' },
    { id: 'set-2', hotelId: 'h-102', source: 'STRIPE', referenceId: 'tr_1A8oz2L27z01l6scs', grossAmount: 1500, commission: 30, gatewayFee: 35, netAmount: 1435, currency: 'USD', status: 'SETTLED', expectedAt: '2025-05-26', settledAt: '2025-05-19', createdAt: '2025-05-16' }
  ],
  settlementSummary: { grossRevenue: 125000, netReceivable: 108000, pendingPayout: 17000, currency: 'USD' }
};

// ============================================================================
// HOUSEKEEPING (15+ RECORDS, MULTI-HOTEL)
// ============================================================================

export const housekeepingMockData = {
  housekeepingRooms: [
    { id: 'r-101', hotelId: 'h-101', roomNumber: '101', roomType: 'Deluxe Suite', floor: 1, status: 'CLEAN', assignedStaff: { id: 'st-1', name: 'Maria S.' }, lastCleanedAt: '2025-05-18' },
    { id: 'r-102', hotelId: 'h-101', roomNumber: '102', roomType: 'Standard Room', floor: 1, status: 'DIRTY', assignedStaff: { id: 'st-2', name: 'Raj K.' }, lastCleanedAt: '2025-05-16' },
    { id: 'r-103', hotelId: 'h-101', roomNumber: '103', roomType: 'Deluxe Suite', floor: 1, status: 'OCCUPIED', assignedStaff: { id: 'st-1', name: 'Maria S.' }, lastCleanedAt: '2025-05-15' },
    { id: 'r-201', hotelId: 'h-102', roomNumber: '201', roomType: 'Premium Suite', floor: 2, status: 'CLEAN', assignedStaff: { id: 'st-4', name: 'Vikram V.' }, lastCleanedAt: '2025-05-19' },
    { id: 'r-202', hotelId: 'h-102', roomNumber: '202', roomType: 'Standard Room', floor: 2, status: 'INSPECTED', assignedStaff: { id: 'st-5', name: 'Anita A.' }, lastCleanedAt: '2025-05-17' }
  ],
  housekeepingSummary: { dirty: 5, clean: 12, inspected: 3, outOfService: 2 },
  cleaningLogs: [
    { id: 'cl-1', hotelId: 'h-101', roomId: 'r-101', staffName: 'Maria S.', status: 'COMPLETED', note: 'Room cleaned', createdAt: '2025-05-18' },
    { id: 'cl-2', hotelId: 'h-101', roomId: 'r-102', staffName: 'Raj K.', status: 'IN_PROGRESS', note: 'Cleaning in progress', createdAt: '2025-05-19' },
    { id: 'cl-4', hotelId: 'h-102', roomId: 'r-201', staffName: 'Vikram V.', status: 'COMPLETED', note: 'Deep cleaning completed', createdAt: '2025-05-19' }
  ]
};

// ============================================================================
// MAINTENANCE (15+ RECORDS, MULTI-HOTEL)
// ============================================================================

export const maintenanceMockData = {
  maintenanceIssues: [
    { id: 'm-1', hotelId: 'h-101', roomId: 'r-102', roomNumber: '102', roomType: 'Standard Room', reason: 'AC Leak', status: 'OPEN', blockedFrom: '2025-05-20', blockedTo: '2025-05-22', reportedBy: 'Maria S.', resolvedAt: null, createdAt: '2025-05-20' },
    { id: 'm-2', hotelId: 'h-101', roomId: 'r-103', roomNumber: '103', roomType: 'Deluxe Suite', reason: 'Toilet Flush Issue', status: 'IN_PROGRESS', blockedFrom: '2025-05-18', blockedTo: '2025-05-20', reportedBy: 'Priya R.', resolvedAt: null, createdAt: '2025-05-18' },
    { id: 'm-4', hotelId: 'h-102', roomId: 'r-202', roomNumber: '202', roomType: 'Standard Room', reason: 'Door Lock Malfunction', status: 'OPEN', blockedFrom: '2025-05-21', blockedTo: '2025-05-23', reportedBy: 'Vikram V.', resolvedAt: null, createdAt: '2025-05-21' }
  ]
};

// ============================================================================
// PRICING (15+ RECORDS, MULTI-HOTEL)
// ============================================================================

export const pricingMockData = {
  ratePlans: [
    { id: 'rp-1', hotelId: 'h-101', name: 'Standard Rate', roomTypeId: 'rt-1', roomTypeName: 'Deluxe Suite', status: 'ACTIVE', refundable: true, minNights: 1, maxNights: 30 },
    { id: 'rp-2', hotelId: 'h-101', name: 'Weekend Rate', roomTypeId: 'rt-2', roomTypeName: 'Standard Room', status: 'ACTIVE', refundable: false, minNights: 2, maxNights: 7 },
    { id: 'rp-3', hotelId: 'h-101', name: 'Long Stay Rate', roomTypeId: 'rt-3', roomTypeName: 'Premium Suite', status: 'ACTIVE', refundable: true, minNights: 7, maxNights: 30 },
    { id: 'rp-4', hotelId: 'h-102', name: 'Standard Rate', roomTypeId: 'rt-4', roomTypeName: 'Deluxe Suite', status: 'ACTIVE', refundable: true, minNights: 1, maxNights: 30 },
    { id: 'rp-5', hotelId: 'h-102', name: 'Corporate Rate', roomTypeId: 'rt-5', roomTypeName: 'Standard Room', status: 'ACTIVE', refundable: true, minNights: 3, maxNights: 30 }
  ],
  pricingCalendar: [
    { id: 'pr-1', hotelId: 'h-101', date: '2025-05-18', roomTypeId: 'rt-1', ratePlanId: 'rp-1', price: 150, availableRooms: 8, closed: false },
    { id: 'pr-2', hotelId: 'h-101', date: '2025-05-19', roomTypeId: 'rt-1', ratePlanId: 'rp-1', price: 160, availableRooms: 7, closed: false },
    { id: 'pr-6', hotelId: 'h-102', date: '2025-05-18', roomTypeId: 'rt-4', ratePlanId: 'rp-4', price: 180, availableRooms: 10, closed: false },
    { id: 'pr-7', hotelId: 'h-102', date: '2025-05-19', roomTypeId: 'rt-4', ratePlanId: 'rp-4', price: 190, availableRooms: 9, closed: false }
  ],
  newRatePlan: { id: 'rp-7', name: 'Premium Rate', roomTypeId: 'rt-1', roomTypeName: 'Deluxe Suite', status: 'ACTIVE', refundable: true, minNights: 1, maxNights: 30, success: true }
};

// ============================================================================
// SETTINGS & ADMIN (MULTI-TENANT, MULTI-HOTEL)
// ============================================================================

export const settingsMockData = {
  hotelSettings: {
    id: 'h-101',
    name: 'LuxeStay Ocean View',
    address: '123 Ocean View Lane, Goa 403001',
    city: 'Goa',
    timezone: 'Asia/Kolkata',
    currency: 'USD',
    contactEmail: 'contact@luxestay.com',
    contactPhone: '+91 832 555 1234',
    brand: {
      name: 'LuxeStay',
      primaryColor: '#4f46e5',
      theme: 'light',
      logoUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=luxestay'
    }
  },
  staffUsers: [
    { id: 's-1', name: 'John Admin', role: 'HOTEL_ADMIN', active: true, email: 'admin@luxestay.com' },
    { id: 's-2', name: 'Sarah Manager', role: 'HOTEL_MANAGER', active: true, email: 'sarah@luxestay.com' },
    { id: 's-3', name: 'Priya FrontDesk', role: 'FRONT_DESK', active: true, email: 'priya@luxestay.com' },
    { id: 's-5', name: 'Maya Admin', role: 'HOTEL_ADMIN', active: true, email: 'maya@luxestay.com' }
  ]
};

// ============================================================================
// ANALYTICS & DASHBOARD (MULTI-HOTEL, TIME-SERIES)
// ============================================================================

export const analyticsMockData = {
  reportSummary: { totalRevenue: 12000, totalBookings: 45, occupancyRate: 85, adr: 250 },
  dashboardStats: { totalBookings: 45, occupancyRate: 85, revenueToday: 2400, avgRoomRate: 275 },
  revenueTrend: [
    { date: '2025-05-10', revenue: 1200, bookings: 3 },
    { date: '2025-05-11', revenue: 1500, bookings: 4 },
    { date: '2025-05-12', revenue: 1800, bookings: 5 },
    { date: '2025-05-13', revenue: 1600, bookings: 4 },
    { date: '2025-05-14', revenue: 2000, bookings: 5 },
    { date: '2025-05-15', revenue: 2200, bookings: 6 },
    { date: '2025-05-16', revenue: 1950, bookings: 5 },
    { date: '2025-05-17', revenue: 2100, bookings: 5 },
    { date: '2025-05-18', revenue: 2400, bookings: 6 },
    { date: '2025-05-19', revenue: 2300, bookings: 6 },
    { date: '2025-05-20', revenue: 2500, bookings: 7 },
    { date: '2025-05-21', revenue: 2600, bookings: 7 },
    { date: '2025-05-22', revenue: 2450, bookings: 6 },
    { date: '2025-05-23', revenue: 2550, bookings: 6 },
    { date: '2025-05-24', revenue: 2700, bookings: 7 }
  ],
  occupancyTrend: [
    { date: '2025-05-10', occupancy: 75 },
    { date: '2025-05-11', occupancy: 78 },
    { date: '2025-05-12', occupancy: 82 },
    { date: '2025-05-13', occupancy: 79 },
    { date: '2025-05-14', occupancy: 85 },
    { date: '2025-05-15', occupancy: 88 },
    { date: '2025-05-16', occupancy: 84 },
    { date: '2025-05-17', occupancy: 86 },
    { date: '2025-05-18', occupancy: 89 },
    { date: '2025-05-19', occupancy: 87 },
    { date: '2025-05-20', occupancy: 91 },
    { date: '2025-05-21', occupancy: 92 },
    { date: '2025-05-22', occupancy: 88 },
    { date: '2025-05-23', occupancy: 89 },
    { date: '2025-05-24', occupancy: 93 }
  ]
};

// ============================================================================
// CHECK-IN / CHECK-OUT MOCK DATA (Phase 1)
// ============================================================================

export const checkinCheckoutMockData = {
  availableRooms: [
    // Deluxe Suite rooms (rt-1)
    { id: 'r-101', number: '101', floor: 1, status: 'AVAILABLE', roomType: { id: 'rt-1', name: 'Deluxe Suite' } },
    { id: 'r-106', number: '106', floor: 2, status: 'AVAILABLE', roomType: { id: 'rt-1', name: 'Deluxe Suite' } },
    { id: 'r-109', number: '109', floor: 3, status: 'AVAILABLE', roomType: { id: 'rt-1', name: 'Deluxe Suite' } },
    // Standard Room rooms (rt-2)
    { id: 'r-104', number: '104', floor: 2, status: 'AVAILABLE', roomType: { id: 'rt-2', name: 'Standard Room' } },
    { id: 'r-107', number: '107', floor: 3, status: 'AVAILABLE', roomType: { id: 'rt-2', name: 'Standard Room' } },
    // Premium Suite rooms (rt-3)
    { id: 'r-108', number: '108', floor: 3, status: 'AVAILABLE', roomType: { id: 'rt-3', name: 'Premium Suite' } },
  ],
  checkInResponse: {
    success: true,
    message: 'Guest checked in successfully',
    booking: {
      id: 'b-1',
      status: 'CHECKED_IN',
      room: { id: 'r-101', number: '101', status: 'OCCUPIED' },
    },
  },
  checkOutResponse: {
    success: true,
    message: 'Guest checked out successfully',
    booking: {
      id: 'b-3',
      status: 'CHECKED_OUT',
    },
    invoice: {
      id: 'inv-new',
      invoiceNumber: 'INV-2025-00001',
      pdfUrl: '/invoices/inv-new.pdf',
    },
  },
  generateInvoiceResponse: {
    success: true,
    message: 'Invoice generated successfully',
    invoice: {
      id: 'inv-new',
      invoiceNumber: 'INV-2025-00001',
      issueDate: '2025-05-28',
      booking: {
        id: 'b-3',
        bookingNumber: 'LS-9903',
      },
      guest: {
        name: 'Emma Johnson',
        email: 'emma@example.com',
        gstin: undefined,
      },
      lineItems: [
        {
          description: 'Room Charges (3 nights)',
          quantity: 3,
          unitPrice: 150,
          amount: 450,
          hsnCode: '9963',
          taxRate: 18,
          taxAmount: 81,
        },
      ],
      subtotal: 450,
      gstAmount: 81,
      totalAmount: 531,
      pdfUrl: '/invoices/inv-new.pdf',
    },
  },
  recordPaymentResponse: {
    success: true,
    message: 'Payment recorded successfully',
    payment: {
      id: 'p-new',
      amount: 600,
      method: 'CASH',
      status: 'CAPTURED',
      transactionId: undefined,
      timestamp: new Date().toISOString(),
    },
  },
  processRefundResponse: {
    success: true,
    message: 'Refund processed successfully',
    refund: {
      id: 'ref-new',
      amount: 300,
      status: 'PROCESSED',
      reason: 'CANCELLATION',
      approvedBy: 'admin@luxestay.com',
      processedAt: new Date().toISOString(),
    },
  },
};

// ============================================================================
// PHASE-2 WAVE-1 MOCK DATA (Communication Automation)
// ============================================================================

export const phase2CommunicationMockData = {
  communicationLogs: [
    { id: 'comm-1', recipient: 'alice@example.com', channel: 'EMAIL', templateId: 'tpl-1', template: { id: 'tpl-1', name: 'Booking Confirmation' }, status: 'DELIVERED', sentAt: '2025-05-10T10:00:00Z', deliveredAt: '2025-05-10T10:00:05Z', error: undefined, retryCount: 0 },
    { id: 'comm-2', recipient: '+919876543210', channel: 'SMS', templateId: 'tpl-2', template: { id: 'tpl-2', name: 'Check-in Reminder' }, status: 'SENT', sentAt: '2025-05-18T08:00:00Z', deliveredAt: undefined, error: undefined, retryCount: 0 },
    { id: 'comm-3', recipient: '+919876543211', channel: 'WHATSAPP', templateId: 'tpl-3', template: { id: 'tpl-3', name: 'Check-out Confirmation' }, status: 'READ', sentAt: '2025-05-22T12:00:00Z', deliveredAt: '2025-05-22T12:00:02Z', error: undefined, retryCount: 0 },
    { id: 'comm-4', recipient: 'robert@example.com', channel: 'EMAIL', templateId: 'tpl-1', template: { id: 'tpl-1', name: 'Booking Confirmation' }, status: 'FAILED', sentAt: '2025-05-12T10:00:00Z', deliveredAt: undefined, error: 'SMTP connection timeout', retryCount: 3 },
    { id: 'comm-5', recipient: 'emma@example.com', channel: 'EMAIL', templateId: 'tpl-4', template: { id: 'tpl-4', name: 'Invoice' }, status: 'DELIVERED', sentAt: '2025-05-25T14:00:00Z', deliveredAt: '2025-05-25T14:00:03Z', error: undefined, retryCount: 0 },
  ],
  templates: [
    { id: 'tpl-1', name: 'Booking Confirmation', category: 'BOOKING_CONFIRMATION', channel: 'EMAIL', subject: 'Booking Confirmed - {{bookingNumber}}', body: 'Dear {{guestName}}, your booking {{bookingNumber}} is confirmed. Check-in: {{checkInDate}}, Check-out: {{checkOutDate}}.', variables: ['guestName', 'bookingNumber', 'checkInDate', 'checkOutDate'], isActive: true, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
    { id: 'tpl-2', name: 'Check-in Reminder', category: 'CHECK_IN_REMINDER', channel: 'SMS', subject: undefined, body: 'Hi {{guestName}}, reminder: Check-in today at {{checkInDate}}. Room {{roomNumber}} is ready.', variables: ['guestName', 'checkInDate', 'roomNumber'], isActive: true, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
    { id: 'tpl-3', name: 'Check-out Confirmation', category: 'CHECK_OUT_CONFIRMATION', channel: 'WHATSAPP', subject: undefined, body: 'Thank you {{guestName}}! Your invoice {{invoiceNumber}} has been sent. Total: {{totalAmount}}.', variables: ['guestName', 'invoiceNumber', 'totalAmount'], isActive: true, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
    { id: 'tpl-4', name: 'Invoice Email', category: 'INVOICE', channel: 'EMAIL', subject: 'Invoice {{invoiceNumber}}', body: 'Dear {{guestName}}, please find your invoice {{invoiceNumber}} attached. Total: {{totalAmount}}.', variables: ['guestName', 'invoiceNumber', 'totalAmount'], isActive: true, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
  ],
  triggers: [
    { id: 'trig-1', event: 'BOOKING_CONFIRMED', templateId: 'tpl-1', template: { id: 'tpl-1', name: 'Booking Confirmation' }, channel: 'EMAIL', isEnabled: true, conditions: undefined },
    { id: 'trig-2', event: 'CHECK_IN_COMPLETED', templateId: 'tpl-2', template: { id: 'tpl-2', name: 'Check-in Reminder' }, channel: 'SMS', isEnabled: true, conditions: undefined },
    { id: 'trig-3', event: 'CHECK_OUT_COMPLETED', templateId: 'tpl-3', template: { id: 'tpl-3', name: 'Check-out Confirmation' }, channel: 'WHATSAPP', isEnabled: false, conditions: undefined },
    { id: 'trig-4', event: 'INVOICE_GENERATED', templateId: 'tpl-4', template: { id: 'tpl-4', name: 'Invoice Email' }, channel: 'EMAIL', isEnabled: true, conditions: undefined },
  ],
  // Feature flags (mock - would be from backend in real implementation)
  featureFlags: {
    COMMUNICATION_EMAIL_ENABLED: false,
    COMMUNICATION_SMS_ENABLED: false,
    COMMUNICATION_WHATSAPP_ENABLED: false,
    COMMUNICATION_TEMPLATES_ENABLED: false,
    COMMUNICATION_AUTOMATION_ENABLED: false,
    COMMUNICATION_LOGS_ENABLED: false,
  },
};

// ============================================================================
// PHASE-2 WAVE-1 MOCK DATA (Audit Logs)
// ============================================================================

export const phase2AuditMockData = {
  auditLogs: [
    { id: 'audit-1', action: 'CHECK_IN', actor: { id: 's-1', email: 'admin@luxestay.com', role: 'HOTEL_ADMIN' }, entityType: 'BOOKING', entityId: 'b-1', beforeValues: { status: 'CONFIRMED' }, afterValues: { status: 'CHECKED_IN' }, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0', timestamp: '2025-05-18T10:00:00Z', hotelId: 'h-101' },
    { id: 'audit-2', action: 'CHECK_OUT', actor: { id: 's-1', email: 'admin@luxestay.com', role: 'HOTEL_ADMIN' }, entityType: 'BOOKING', entityId: 'b-3', beforeValues: { status: 'CHECKED_IN' }, afterValues: { status: 'CHECKED_OUT' }, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0', timestamp: '2025-05-25T12:00:00Z', hotelId: 'h-101' },
    { id: 'audit-3', action: 'PAYMENT_RECORDED', actor: { id: 's-2', email: 'sarah@luxestay.com', role: 'HOTEL_MANAGER' }, entityType: 'PAYMENT', entityId: 'p-1', beforeValues: undefined, afterValues: { amount: 600, method: 'CASH' }, ipAddress: '192.168.1.101', userAgent: 'Mozilla/5.0', timestamp: '2025-05-15T14:00:00Z', hotelId: 'h-101' },
    { id: 'audit-4', action: 'REFUND_PROCESSED', actor: { id: 's-1', email: 'admin@luxestay.com', role: 'HOTEL_ADMIN' }, entityType: 'REFUND', entityId: 'ref-1', beforeValues: { status: 'PENDING' }, afterValues: { status: 'PROCESSED', amount: 300 }, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0', timestamp: '2025-05-20T16:00:00Z', hotelId: 'h-101' },
    { id: 'audit-5', action: 'BOOKING_CREATED', actor: { id: 's-3', email: 'priya@luxestay.com', role: 'FRONT_DESK' }, entityType: 'BOOKING', entityId: 'b-4', beforeValues: undefined, afterValues: { bookingNumber: 'LS-9904', guestName: 'Michael Chen' }, ipAddress: '192.168.1.102', userAgent: 'Mozilla/5.0', timestamp: '2025-05-16T09:00:00Z', hotelId: 'h-101' },
    { id: 'audit-6', action: 'USER_CREATED', actor: { id: 's-1', email: 'admin@luxestay.com', role: 'HOTEL_ADMIN' }, entityType: 'USER', entityId: 's-9', beforeValues: undefined, afterValues: { email: 'newuser@luxestay.com', role: 'STAFF' }, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0', timestamp: '2025-05-10T11:00:00Z', hotelId: 'h-101' },
    { id: 'audit-7', action: 'USER_ROLE_CHANGED', actor: { id: 's-1', email: 'admin@luxestay.com', role: 'HOTEL_ADMIN' }, entityType: 'USER', entityId: 's-2', beforeValues: { role: 'STAFF' }, afterValues: { role: 'HOTEL_MANAGER' }, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0', timestamp: '2025-05-12T13:00:00Z', hotelId: 'h-101' },
    { id: 'audit-8', action: 'PRICE_CHANGED', actor: { id: 's-1', email: 'admin@luxestay.com', role: 'HOTEL_ADMIN' }, entityType: 'PRICING', entityId: 'pr-1', beforeValues: { price: 150 }, afterValues: { price: 160 }, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0', timestamp: '2025-05-19T10:00:00Z', hotelId: 'h-101' },
  ],
  userActivity: {
    loginLogs: [
      { timestamp: '2025-05-18T08:00:00Z', ipAddress: '192.168.1.100', success: true, failureReason: undefined },
      { timestamp: '2025-05-17T08:00:00Z', ipAddress: '192.168.1.100', success: true, failureReason: undefined },
      { timestamp: '2025-05-16T08:00:00Z', ipAddress: '192.168.1.101', success: false, failureReason: 'Invalid password' },
    ],
    logoutLogs: [
      { timestamp: '2025-05-18T18:00:00Z' },
      { timestamp: '2025-05-17T18:00:00Z' },
    ],
    permissionChanges: [
      { timestamp: '2025-05-12T13:00:00Z', changedBy: 'admin@luxestay.com', oldPermissions: ['bookings:view'], newPermissions: ['bookings:view', 'bookings:edit'] },
    ],
    roleChanges: [
      { timestamp: '2025-05-12T13:00:00Z', changedBy: 'admin@luxestay.com', oldRole: 'STAFF', newRole: 'HOTEL_MANAGER' },
    ],
  },
  // Feature flags (mock - would be from backend in real implementation)
  featureFlags: {
    AUDIT_LOGS_ENABLED: false,
  },
};

// ============================================================================
// PHASE-2 WAVE-1 MOCK DATA (Approval Workflows)
// ============================================================================

export const phase2ApprovalMockData = {
  approvalRequests: [
    { id: 'apr-1', action: 'REFUND', requester: { id: 's-2', email: 'sarah@luxestay.com', role: 'HOTEL_MANAGER' }, approvers: [{ id: 's-1', email: 'admin@luxestay.com', role: 'HOTEL_ADMIN', status: 'PENDING', approvedAt: undefined, comments: undefined }], status: 'PENDING', entityType: 'BOOKING', entityId: 'b-4', requestData: { amount: 500, reason: 'CANCELLATION' }, createdAt: '2025-05-20T10:00:00Z', expiresAt: '2025-05-27T10:00:00Z', comments: undefined, hotelId: 'h-101' },
    { id: 'apr-2', action: 'REFUND', requester: { id: 's-3', email: 'priya@luxestay.com', role: 'FRONT_DESK' }, approvers: [{ id: 's-1', email: 'admin@luxestay.com', role: 'HOTEL_ADMIN', status: 'APPROVED', approvedAt: '2025-05-19T14:00:00Z', comments: 'Approved' }], status: 'APPROVED', entityType: 'BOOKING', entityId: 'b-5', requestData: { amount: 300, reason: 'NO_SHOW' }, createdAt: '2025-05-19T12:00:00Z', expiresAt: undefined, comments: undefined, hotelId: 'h-101' },
    { id: 'apr-3', action: 'CANCELLATION', requester: { id: 's-2', email: 'sarah@luxestay.com', role: 'HOTEL_MANAGER' }, approvers: [{ id: 's-1', email: 'admin@luxestay.com', role: 'HOTEL_ADMIN', status: 'REJECTED', approvedAt: undefined, comments: 'Insufficient reason' }], status: 'REJECTED', entityType: 'BOOKING', entityId: 'b-6', requestData: { bookingId: 'b-6' }, createdAt: '2025-05-18T09:00:00Z', expiresAt: undefined, comments: 'Insufficient reason', hotelId: 'h-101' },
  ],
  approvalChains: [
    { id: 'chain-1', action: 'REFUND', thresholds: [{ amount: 10000, approverRoles: ['MANAGER', 'HOTEL_ADMIN'] }, { amount: 50000, approverRoles: ['HOTEL_ADMIN'] }], isActive: true, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
    { id: 'chain-2', action: 'CANCELLATION', thresholds: [{ amount: 0, approverRoles: ['HOTEL_ADMIN'] }], isActive: true, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
  ],
  // Feature flags (mock - would be from backend in real implementation)
  featureFlags: {
    APPROVAL_WORKFLOWS_ENABLED: false,
  },
};