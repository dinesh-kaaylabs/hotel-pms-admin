
/**
 * 🏨 LUXESTAY PMS - CENTRALIZED MOCK DATA (2025–2026)
 * 
 * ENTERPRISE SINGLE SOURCE OF TRUTH
 * All mock data for GraphQL operations is defined here.
 * Handlers ONLY import and serve this data.
 * NO inline JSON. NO hardcoded responses.
 * 
 * Multi-tenant, multi-hotel, multi-user architecture.
 * 50+ records per entity for realistic dashboard experience.
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
      { id: 'h-102', name: 'LuxeStay City Express' },
      { id: 'h-103', name: 'LuxeStay Heritage Delhi' },
      { id: 'h-104', name: 'LuxeStay Riverside Bangalore' }
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
    { id: 's-8', name: 'Vikram Housekeeping', email: 'vikram@luxestay.com', role: 'HOUSEKEEPING', hotelId: 'h-102', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s8' },
    { id: 's-9', name: 'Anil Gupta', email: 'anil@luxestay.com', role: 'HOTEL_MANAGER', hotelId: 'h-103', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s9' },
    { id: 's-10', name: 'Sita Ram', email: 'sita@luxestay.com', role: 'FRONT_DESK', hotelId: 'h-103', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s10' },
    { id: 's-11', name: 'Karan Singh', email: 'karan@luxestay.com', role: 'HOUSEKEEPING', hotelId: 'h-103', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s11' },
    { id: 's-12', name: 'Monica G.', email: 'monica@luxestay.com', role: 'HOTEL_MANAGER', hotelId: 'h-104', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s12' },
    { id: 's-13', name: 'Chandler B.', email: 'chandler@luxestay.com', role: 'FRONT_DESK', hotelId: 'h-104', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s13' },
    { id: 's-14', name: 'Joey T.', email: 'joey@luxestay.com', role: 'HOUSEKEEPING', hotelId: 'h-104', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s14' },
    { id: 's-15', name: 'Rachel G.', email: 'rachel@luxestay.com', role: 'HOTEL_ADMIN', hotelId: 'h-103', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s15' }
  ],
  mfaCode: '123456',
  mfaToken: 'mfa-token-123'
};

// ============================================================================
// HOTELS (MULTI-TENANT)
// ============================================================================

export const hotelsMockData = {
  hotels: [
    { id: 'h-101', name: 'LuxeStay Ocean View', city: 'Goa', status: 'ACTIVE', tenantId: 't-1', address: '123 Ocean View Lane, Goa 403001', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-102', name: 'LuxeStay City Express', city: 'Mumbai', status: 'ACTIVE', tenantId: 't-1', address: '456 City Center, Mumbai 400001', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-103', name: 'LuxeStay Heritage Delhi', city: 'Delhi', status: 'ACTIVE', tenantId: 't-1', address: '789 Heritage Complex, Delhi 110001', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-104', name: 'LuxeStay Riverside Bangalore', city: 'Bangalore', status: 'ACTIVE', tenantId: 't-1', address: '321 Riverside Drive, Bangalore 560001', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-105', name: 'LuxeStay Palace Jaipur', city: 'Jaipur', status: 'ACTIVE', tenantId: 't-1', address: '12 Palace Rd, Jaipur 302001', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-106', name: 'LuxeStay Hills Manali', city: 'Manali', status: 'MAINTENANCE', tenantId: 't-1', address: '55 Mountain View, Manali 175131', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-107', name: 'LuxeStay Beach Pondicherry', city: 'Pondicherry', status: 'ACTIVE', tenantId: 't-1', address: '88 Promenade, Pondicherry 605001', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-108', name: 'LuxeStay Tech Hyderabad', city: 'Hyderabad', status: 'ACTIVE', tenantId: 't-1', address: 'Hitech City Phase 2, Hyderabad 500081', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-109', name: 'LuxeStay Serene Kerala', city: 'Kochi', status: 'ACTIVE', tenantId: 't-1', address: 'Backwater Retreat, Kochi 682001', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-110', name: 'LuxeStay Royal Udaipur', city: 'Udaipur', status: 'ACTIVE', tenantId: 't-1', address: 'Lake View Palace, Udaipur 313001', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-111', name: 'LuxeStay Urban Pune', city: 'Pune', status: 'ACTIVE', tenantId: 't-1', address: 'Koregaon Park, Pune 411001', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-112', name: 'LuxeStay Green Ooty', city: 'Ooty', status: 'ACTIVE', tenantId: 't-1', address: 'Botanical Garden Rd, Ooty 643001', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-113', name: 'LuxeStay Port Chennai', city: 'Chennai', status: 'ACTIVE', tenantId: 't-1', address: 'Marina Drive, Chennai 600004', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-114', name: 'LuxeStay Temple Madurai', city: 'Madurai', status: 'ACTIVE', tenantId: 't-1', address: 'Temple View, Madurai 625001', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-115', name: 'LuxeStay Industrial Ahmedabad', city: 'Ahmedabad', status: 'ACTIVE', tenantId: 't-1', address: 'S.G. Highway, Ahmedabad 380054', timezone: 'Asia/Kolkata', currency: 'INR' }
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
// BOOKINGS (50+ RECORDS, MULTI-HOTEL)
// ============================================================================

export const bookingsMockData = {
  bookings: [
    { id: 'b-1', bookingNumber: 'LS-9901', hotelId: 'h-101', guestName: 'Alice Margeret', guestEmail: 'alice@example.com', checkInDate: '2025-05-18', checkOutDate: '2025-05-22', checkIn: '2025-05-18', checkOut: '2025-05-22', status: 'CONFIRMED', roomType: 'Deluxe Suite', roomNumber: '101', totalAmount: 45000, paymentStatus: 'PAID', createdAt: '2025-05-10' },
    { id: 'b-2', bookingNumber: 'LS-9902', hotelId: 'h-101', guestName: 'Robert Smith', guestEmail: 'robert@example.com', checkInDate: '2025-05-20', checkOutDate: '2025-05-25', checkIn: '2025-05-20', checkOut: '2025-05-25', status: 'CONFIRMED', roomType: 'Standard Room', roomNumber: '102', totalAmount: 32000, paymentStatus: 'PAID', createdAt: '2025-05-12' },
    { id: 'b-3', bookingNumber: 'LS-9903', hotelId: 'h-101', guestName: 'Emma Johnson', guestEmail: 'emma@example.com', checkInDate: '2025-05-25', checkOutDate: '2025-05-28', checkIn: '2025-05-25', checkOut: '2025-05-28', status: 'CHECKED_IN', roomType: 'Deluxe Suite', roomNumber: '103', totalAmount: 38000, paymentStatus: 'PAID', createdAt: '2025-05-15' },
    { id: 'b-4', bookingNumber: 'LS-9904', hotelId: 'h-101', guestName: 'Michael Chen', guestEmail: 'michael@example.com', checkInDate: '2025-05-26', checkOutDate: '2025-05-30', checkIn: '2025-05-26', checkOut: '2025-05-30', status: 'PENDING', roomType: 'Standard Room', roomNumber: '104', totalAmount: 42000, paymentStatus: 'PENDING', createdAt: '2025-05-16' },
    { id: 'b-5', bookingNumber: 'LS-9905', hotelId: 'h-102', guestName: 'Jessica Williams', guestEmail: 'jessica@example.com', checkInDate: '2025-05-19', checkOutDate: '2025-05-23', checkIn: '2025-05-19', checkOut: '2025-05-23', status: 'CONFIRMED', roomType: 'Premium Suite', roomNumber: '201', totalAmount: 65000, paymentStatus: 'PAID', createdAt: '2025-05-11' },
    { id: 'b-6', bookingNumber: 'LS-9906', hotelId: 'h-102', guestName: 'David Brown', guestEmail: 'david@example.com', checkInDate: '2025-05-21', checkOutDate: '2025-05-26', checkIn: '2025-05-21', checkOut: '2025-05-26', status: 'CHECKED_IN', roomType: 'Standard Room', roomNumber: '202', totalAmount: 41000, paymentStatus: 'PAID', createdAt: '2025-05-13' },
    { id: 'b-7', bookingNumber: 'LS-9907', hotelId: 'h-102', guestName: 'Sophia Martinez', guestEmail: 'sophia@example.com', checkInDate: '2025-05-27', checkOutDate: '2025-05-31', checkIn: '2025-05-27', checkOut: '2025-05-31', status: 'PENDING', roomType: 'Deluxe Suite', roomNumber: '203', totalAmount: 51000, paymentStatus: 'PENDING', createdAt: '2025-05-17' },
    { id: 'b-8', bookingNumber: 'LS-9908', hotelId: 'h-101', guestName: 'James Wilson', guestEmail: 'james@example.com', checkInDate: '2025-05-22', checkOutDate: '2025-05-27', checkIn: '2025-05-22', checkOut: '2025-05-27', status: 'CONFIRMED', roomType: 'Premium Suite', roomNumber: '105', totalAmount: 72000, paymentStatus: 'PAID', createdAt: '2025-05-14' },
    { id: 'b-9', bookingNumber: 'LS-9909', hotelId: 'h-102', guestName: 'Olivia Taylor', guestEmail: 'olivia@example.com', checkInDate: '2025-05-23', checkOutDate: '2025-05-29', checkIn: '2025-05-23', checkOut: '2025-05-29', status: 'CHECKED_OUT', roomType: 'Standard Room', roomNumber: '204', totalAmount: 39000, paymentStatus: 'PAID', createdAt: '2025-05-15' },
    { id: 'b-10', bookingNumber: 'LS-9910', hotelId: 'h-101', guestName: 'William Anderson', guestEmail: 'william@example.com', checkInDate: '2025-05-24', checkOutDate: '2025-05-28', checkIn: '2025-05-24', checkOut: '2025-05-28', status: 'CONFIRMED', roomType: 'Deluxe Suite', roomNumber: '106', totalAmount: 48000, paymentStatus: 'PAID', createdAt: '2025-05-16' },
    // Adding records up to b-50
    ...Array.from({ length: 40 }, (_, i) => {
      const idNum = i + 11;
      const hotelIdx = (idNum % 4) + 101;
      const statuses = ['CONFIRMED', 'PENDING', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED', 'NOSHOW'];
      const status = statuses[idNum % statuses.length];
      return {
        id: `b-${idNum}`,
        bookingNumber: `LS-99${idNum}`,
        hotelId: `h-${hotelIdx}`,
        guestName: `Guest ${idNum}`,
        guestEmail: `guest${idNum}@example.com`,
        checkInDate: `2025-06-${(idNum % 28) + 1}`,
        checkOutDate: `2025-06-${(idNum % 28) + 4}`,
        checkIn: `2025-06-${(idNum % 28) + 1}`,
        checkOut: `2025-06-${(idNum % 28) + 4}`,
        status,
        roomType: idNum % 2 === 0 ? 'Deluxe Suite' : 'Standard Room',
        roomNumber: `${hotelIdx === 101 ? 100 + (idNum % 10) : 200 + (idNum % 10)}`,
        totalAmount: 25000 + (idNum * 1000),
        paymentStatus: status === 'PENDING' ? 'PENDING' : 'PAID',
        createdAt: '2025-05-20'
      };
    })
  ],
  invoices: [
    { id: 'inv-1', invoiceNumber: 'INV-LS-9901', bookingId: 'b-1', bookingNumber: 'LS-9901', hotelId: 'h-101', guestName: 'Alice Margeret', gstin: '18AABCT1234H1Z0', status: 'ISSUED', subtotal: 38135, taxAmount: 6865, netAmount: 38135, totalAmount: 45000, currency: 'INR', issuedAt: '2025-05-23', pdfUrl: '#' },
    ...Array.from({ length: 49 }, (_, i) => {
      const idNum = i + 2;
      return {
        id: `inv-${idNum}`,
        invoiceNumber: `INV-LS-99${idNum}`,
        bookingId: `b-${idNum}`,
        bookingNumber: `LS-99${idNum}`,
        hotelId: (idNum % 4 + 101).toString(),
        guestName: `Guest ${idNum}`,
        gstin: '18AABCT1234H1Z0',
        status: idNum % 5 === 0 ? 'PENDING' : 'ISSUED',
        subtotal: 20000 + (idNum * 500),
        taxAmount: (20000 + (idNum * 500)) * 0.18,
        netAmount: 20000 + (idNum * 500),
        totalAmount: (20000 + (idNum * 500)) * 1.18,
        currency: 'INR',
        issuedAt: '2025-05-25',
        pdfUrl: '#'
      };
    })
  ]
};

// ============================================================================
// GUESTS (50+ RECORDS, MULTI-HOTEL)
// ============================================================================

export const guestsMockData = {
  guests: [
    { id: 'g-1', hotelId: 'h-101', name: 'Alice Margeret', phone: '+91 9876543201', email: 'alice@example.com', tags: ['VIP'], totalStays: 4, lifetimeValue: 180000, currency: 'INR' },
    { id: 'g-2', hotelId: 'h-101', name: 'Robert Smith', phone: '+91 9876543202', email: 'robert@example.com', tags: ['FREQUENT'], totalStays: 8, lifetimeValue: 240000, currency: 'INR' },
    ...Array.from({ length: 48 }, (_, i) => {
      const idNum = i + 3;
      return {
        id: `g-${idNum}`,
        hotelId: `h-${(idNum % 4) + 101}`,
        name: `Guest Name ${idNum}`,
        phone: `+91 90000000${idNum.toString().padStart(2, '0')}`,
        email: `guest${idNum}@example.com`,
        tags: idNum % 5 === 0 ? ['VIP'] : idNum % 3 === 0 ? ['FREQUENT'] : [],
        totalStays: (idNum % 10) + 1,
        lifetimeValue: (idNum % 10 + 1) * 35000,
        currency: 'INR'
      };
    })
  ],
  guestStays: Array.from({ length: 50 }, (_, i) => ({
    bookingId: `b-${i + 1}`,
    bookingNumber: `LS-99${i + 1}`,
    guestId: `g-${(i % 50) + 1}`,
    roomType: i % 2 === 0 ? 'Deluxe Suite' : 'Standard Room',
    checkInDate: '2025-05-18',
    checkOutDate: '2025-05-22',
    amountPaid: 35000 + (i * 1000),
    status: i % 3 === 0 ? 'COMPLETED' : 'ONGOING'
  })),
  guestNotes: Array.from({ length: 50 }, (_, i) => ({
    id: `n-${i + 1}`,
    guestId: `g-${(i % 15) + 1}`,
    note: `Preference ${i + 1}: High floor and extra towels.`,
    createdBy: 'Staff User',
    createdAt: '2025-05-10'
  })),
  newGuestNote: { id: 'n-100', guestId: 'g-1', note: 'Added note', createdBy: 'Admin', createdAt: '2025-05-20' }
};

// ============================================================================
// ROOMS & INVENTORY (50+ RECORDS)
// ============================================================================

export const roomsMockData = {
  rooms: [
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `r-1${i + 1}`,
      hotelId: 'h-101',
      roomNumber: `1${(i + 1).toString().padStart(2, '0')}`,
      type: i % 3 === 0 ? 'Deluxe Suite' : i % 3 === 1 ? 'Standard Room' : 'Premium Suite',
      status: i % 5 === 0 ? 'DIRTY' : i % 7 === 0 ? 'OCCUPIED' : 'CLEAN',
      floor: Math.floor(i / 10) + 1
    })),
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `r-2${i + 1}`,
      hotelId: 'h-102',
      roomNumber: `2${(i + 1).toString().padStart(2, '0')}`,
      type: i % 3 === 0 ? 'Deluxe Suite' : i % 3 === 1 ? 'Standard Room' : 'Premium Suite',
      status: i % 4 === 0 ? 'DIRTY' : 'CLEAN',
      floor: Math.floor(i / 10) + 1
    }))
  ],
  roomTypes: [
    { id: 'rt-1', hotelId: 'h-101', name: 'Deluxe Suite', roomTypeName: 'Deluxe Suite', capacity: 4, baseOccupancy: 2, maxOccupancy: 4, active: true, minNights: 1, maxNights: 30 },
    { id: 'rt-2', hotelId: 'h-101', name: 'Standard Room', roomTypeName: 'Standard Room', capacity: 2, baseOccupancy: 2, maxOccupancy: 2, active: true, minNights: 1, maxNights: 30 },
    { id: 'rt-3', hotelId: 'h-101', name: 'Premium Suite', roomTypeName: 'Premium Suite', capacity: 6, baseOccupancy: 2, maxOccupancy: 6, active: true, minNights: 2, maxNights: 30 },
    { id: 'rt-4', hotelId: 'h-102', name: 'Deluxe Suite', roomTypeName: 'Deluxe Suite', capacity: 4, baseOccupancy: 2, maxOccupancy: 4, active: true, minNights: 1, maxNights: 30 },
    { id: 'rt-5', hotelId: 'h-102', name: 'Standard Room', roomTypeName: 'Standard Room', capacity: 2, baseOccupancy: 2, maxOccupancy: 2, active: true, minNights: 1, maxNights: 30 },
    { id: 'rt-6', hotelId: 'h-102', name: 'Premium Suite', roomTypeName: 'Premium Suite', capacity: 6, baseOccupancy: 2, maxOccupancy: 6, active: true, minNights: 2, maxNights: 30 },
    ...Array.from({ length: 9 }, (_, i) => ({
        id: `rt-${i+7}`,
        hotelId: `h-${103 + i}`,
        name: 'Executive Room',
        roomTypeName: 'Executive Room',
        capacity: 2,
        baseOccupancy: 2,
        maxOccupancy: 3,
        active: true,
        minNights: 1,
        maxNights: 30
    }))
  ],
  inventory: Array.from({ length: 50 }, (_, i) => ({
    id: `inv-room-${i + 1}`,
    hotelId: `h-${(i % 15) + 101}`,
    roomTypeId: `rt-${(i % 6) + 1}`,
    date: '2025-05-18',
    totalRooms: 15,
    availableRooms: (i % 5) + 5,
    status: 'AVAILABLE'
  })),
  newRoomType: { id: 'rt-99', name: 'Presidential Suite', roomTypeName: 'Presidential Suite', capacity: 10, baseOccupancy: 4, maxOccupancy: 10, active: true, minNights: 1, maxNights: 30, success: true }
};

// ============================================================================
// FINANCE & PAYMENTS (50+ RECORDS)
// ============================================================================

export const financeMockData = {
  invoices: Array.from({ length: 50 }, (_, i) => ({
    id: `inv-${i + 1}`,
    invoiceNumber: `INV-LS-99${(i + 1).toString().padStart(2, '0')}`,
    bookingId: `b-${i + 1}`,
    bookingNumber: `LS-99${(i + 1).toString().padStart(2, '0')}`,
    hotelId: `h-${(i % 4) + 101}`,
    guestName: `Guest ${i + 1}`,
    gstin: '18AABCT1234H1Z0',
    status: i % 10 === 0 ? 'PENDING' : 'ISSUED',
    subtotal: 40000 + (i * 1000),
    totalAmount: (40000 + (i * 1000)) * 1.18,
    currency: 'INR',
    issuedAt: '2025-05-23'
  })),
  payments: Array.from({ length: 50 }, (_, i) => ({
    id: `p-${i + 1}`,
    hotelId: `h-${(i % 4) + 101}`,
    bookingId: `b-${i + 1}`,
    bookingNumber: `LS-99${i + 1}`,
    provider: i % 2 === 0 ? 'STRIPE' : 'RAZORPAY',
    providerPaymentId: `txn_${Math.random().toString(36).substr(2, 9)}`,
    method: i % 3 === 0 ? 'UPI' : 'CARD',
    status: i % 15 === 0 ? 'PENDING' : 'CAPTURED',
    amount: 35000 + (i * 500),
    currency: 'INR',
    createdAt: '2025-05-15'
  })),
  settlements: Array.from({ length: 50 }, (_, i) => ({
    id: `set-${i + 1}`,
    hotelId: `h-${(i % 4) + 101}`,
    source: i % 2 === 0 ? 'RAZORPAY' : 'STRIPE',
    referenceId: `ref_${i + 1}`,
    grossAmount: 50000,
    commission: 1000,
    gatewayFee: 500,
    netAmount: 48500,
    currency: 'INR',
    status: 'SETTLED',
    expectedAt: '2025-05-25',
    settledAt: '2025-05-18',
    createdAt: '2025-05-15'
  })),
  settlementSummary: { grossRevenue: 8500000, netReceivable: 7800000, pendingPayout: 700000, currency: 'INR' }
};

// ============================================================================
// HOUSEKEEPING (50+ RECORDS)
// ============================================================================

export const housekeepingMockData = {
  housekeepingRooms: Array.from({ length: 50 }, (_, i) => ({
    id: `hr-${i + 1}`,
    hotelId: `h-${(i % 2) + 101}`,
    roomNumber: `${(i % 2 === 0 ? 100 : 200) + i}`,
    roomType: i % 3 === 0 ? 'Deluxe Suite' : 'Standard Room',
    floor: Math.floor(i / 10) + 1,
    status: i % 5 === 0 ? 'DIRTY' : i % 8 === 0 ? 'INSPECTED' : 'CLEAN',
    assignedStaff: { id: `st-${(i % 5) + 1}`, name: `Staff ${i % 5 + 1}` },
    lastCleanedAt: '2025-05-18'
  })),
  housekeepingSummary: { dirty: 15, clean: 25, inspected: 7, outOfService: 3 },
  cleaningLogs: Array.from({ length: 50 }, (_, i) => ({
    id: `cl-${i + 1}`,
    hotelId: `h-${(i % 2) + 101}`,
    roomId: `r-1${(i % 10) + 1}`,
    staffName: `Staff ${i % 5 + 1}`,
    status: 'COMPLETED',
    note: 'Daily maintenance completed.',
    createdAt: '2025-05-19'
  }))
};

// ============================================================================
// MAINTENANCE (50+ RECORDS)
// ============================================================================

export const maintenanceMockData = {
  maintenanceIssues: Array.from({ length: 50 }, (_, i) => ({
    id: `m-${i + 1}`,
    hotelId: `h-${(i % 4) + 101}`,
    roomId: `r-1${(i % 20) + 1}`,
    roomNumber: `1${(i % 20) + 1}`,
    roomType: 'Standard Room',
    reason: i % 3 === 0 ? 'AC Leak' : i % 3 === 1 ? 'WiFi Issue' : 'Plumbing',
    status: i % 5 === 0 ? 'OPEN' : i % 5 === 1 ? 'IN_PROGRESS' : 'RESOLVED',
    blockedFrom: '2025-05-20',
    blockedTo: '2025-05-22',
    reportedBy: 'Staff Member',
    resolvedAt: i % 5 > 1 ? '2025-05-21' : null,
    createdAt: '2025-05-20'
  }))
};

// ============================================================================
// PRICING (50+ RECORDS)
// ============================================================================

export const pricingMockData = {
  ratePlans: Array.from({ length: 50 }, (_, i) => ({
    id: `rp-${i + 1}`,
    hotelId: `h-${(i % 15) + 101}`,
    name: i % 3 === 0 ? 'Standard Rate' : i % 3 === 1 ? 'Weekend Special' : 'Corporate Plus',
    roomTypeId: `rt-${(i % 6) + 1}`,
    roomTypeName: 'Dynamic Room Type',
    status: 'ACTIVE',
    refundable: i % 2 === 0,
    minNights: 1,
    maxNights: 30
  })),
  pricingCalendar: Array.from({ length: 100 }, (_, i) => ({
    id: `pr-${i + 1}`,
    hotelId: `h-${(i % 4) + 101}`,
    date: `2025-05-${(i % 30) + 1}`,
    roomTypeId: `rt-${(i % 6) + 1}`,
    ratePlanId: `rp-${(i % 5) + 1}`,
    price: 4500 + (i * 100),
    availableRooms: 10,
    closed: false
  })),
  newRatePlan: { id: 'rp-100', name: 'Festive Season Rate', roomTypeId: 'rt-1', roomTypeName: 'Deluxe Suite', status: 'ACTIVE', refundable: true, minNights: 1, maxNights: 30, success: true }
};

// ============================================================================
// SETTINGS & ADMIN (EXPANDED)
// ============================================================================

export const settingsMockData = {
  hotelSettings: {
    id: 'h-101',
    name: 'LuxeStay Ocean View',
    address: '123 Ocean View Lane, Goa 403001',
    city: 'Goa',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    contactEmail: 'contact@luxestay.com',
    contactPhone: '+91 832 555 1234',
    brand: {
      name: 'LuxeStay',
      primaryColor: '#4f46e5',
      theme: 'light',
      logoUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=luxestay'
    }
  },
  staffUsers: Array.from({ length: 30 }, (_, i) => ({
    id: `s-${i + 1}`,
    name: `User ${i + 1}`,
    role: i % 4 === 0 ? 'HOTEL_ADMIN' : i % 4 === 1 ? 'HOTEL_MANAGER' : 'FRONT_DESK',
    active: true,
    email: `user${i + 1}@luxestay.com`
  }))
};

// ============================================================================
// ANALYTICS & DASHBOARD (50+ RECORDS)
// ============================================================================

export const analyticsMockData = {
  reportSummary: { totalRevenue: 12500000, totalBookings: 850, occupancyRate: 78, adr: 4500 },
  dashboardStats: { totalBookings: 850, occupancyRate: 78, revenueToday: 245000, avgRoomRate: 4850 },
  revenueTrend: Array.from({ length: 60 }, (_, i) => ({
    date: `2025-04-${(i % 30) + 1}`,
    revenue: 150000 + (Math.random() * 50000),
    bookings: 10 + Math.floor(Math.random() * 10)
  })),
  occupancyTrend: Array.from({ length: 60 }, (_, i) => ({
    date: `2025-04-${(i % 30) + 1}`,
    occupancy: 65 + Math.floor(Math.random() * 30)
  }))
};

// ============================================================================
// CHECK-IN / CHECK-OUT MOCK DATA
// ============================================================================

export const checkinCheckoutMockData = {
  availableRooms: Array.from({ length: 50 }, (_, i) => ({
    id: `r-avl-${i + 1}`,
    number: `1${(i + 1).toString().padStart(2, '0')}`,
    floor: Math.floor(i / 10) + 1,
    status: 'AVAILABLE',
    roomType: { id: `rt-${(i % 3) + 1}`, name: i % 3 === 0 ? 'Deluxe Suite' : i % 3 === 1 ? 'Standard Room' : 'Premium Suite' }
  })),
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
    booking: { id: 'b-3', status: 'CHECKED_OUT' },
    invoice: { id: 'inv-new', invoiceNumber: 'INV-2025-00001', pdfUrl: '/invoices/inv-new.pdf' },
  },
  generateInvoiceResponse: {
    success: true,
    message: 'Invoice generated successfully',
    invoice: {
      id: 'inv-new',
      invoiceNumber: 'INV-2025-00001',
      issueDate: '2025-05-28',
      booking: { id: 'b-3', bookingNumber: 'LS-9903' },
      guest: { name: 'Emma Johnson', email: 'emma@example.com', gstin: undefined },
      lineItems: [
        { description: 'Room Charges (3 nights)', quantity: 3, unitPrice: 4500, amount: 13500, hsnCode: '9963', taxRate: 18, taxAmount: 2430 }
      ],
      subtotal: 13500,
      gstAmount: 2430,
      totalAmount: 15930,
      pdfUrl: '/invoices/inv-new.pdf',
    },
  },
  recordPaymentResponse: {
    success: true,
    message: 'Payment recorded successfully',
    payment: {
      id: 'p-new',
      amount: 45000,
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
      amount: 5000,
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
  communicationLogs: Array.from({ length: 50 }, (_, i) => ({
    id: `comm-${i + 1}`,
    recipient: `guest${i + 1}@example.com`,
    channel: i % 3 === 0 ? 'EMAIL' : i % 3 === 1 ? 'SMS' : 'WHATSAPP',
    templateId: `tpl-${(i % 4) + 1}`,
    template: { id: `tpl-${(i % 4) + 1}`, name: 'System Template' },
    status: i % 10 === 0 ? 'FAILED' : 'DELIVERED',
    sentAt: '2025-05-10T10:00:00Z',
    deliveredAt: i % 10 !== 0 ? '2025-05-10T10:00:05Z' : undefined,
    error: i % 10 === 0 ? 'Provider timeout' : undefined,
    retryCount: i % 10 === 0 ? 3 : 0
  })),
  templates: Array.from({ length: 20 }, (_, i) => ({
    id: `tpl-${i + 1}`,
    name: `Template ${i + 1}`,
    category: i % 4 === 0 ? 'BOOKING_CONFIRMATION' : i % 4 === 1 ? 'CHECK_IN_REMINDER' : 'INVOICE',
    channel: i % 2 === 0 ? 'EMAIL' : 'SMS',
    subject: `Update regarding {{bookingNumber}}`,
    body: 'Hello {{guestName}}, this is an automated update.',
    variables: ['guestName', 'bookingNumber'],
    isActive: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  })),
  triggers: Array.from({ length: 20 }, (_, i) => ({
    id: `trig-${i + 1}`,
    event: i % 4 === 0 ? 'BOOKING_CONFIRMED' : i % 4 === 1 ? 'CHECK_IN_COMPLETED' : 'INVOICE_GENERATED',
    templateId: `tpl-${(i % 4) + 1}`,
    template: { id: `tpl-${(i % 4) + 1}`, name: 'Linked Template' },
    channel: i % 2 === 0 ? 'EMAIL' : 'SMS',
    isEnabled: true,
    conditions: undefined
  })),
  featureFlags: {
    COMMUNICATION_EMAIL_ENABLED: true,
    COMMUNICATION_SMS_ENABLED: true,
    COMMUNICATION_WHATSAPP_ENABLED: true,
    COMMUNICATION_TEMPLATES_ENABLED: true,
    COMMUNICATION_AUTOMATION_ENABLED: true,
    COMMUNICATION_LOGS_ENABLED: true,
  },
};

// ============================================================================
// PHASE-2 WAVE-1 MOCK DATA (Audit Logs)
// ============================================================================

export const phase2AuditMockData = {
  auditLogs: Array.from({ length: 60 }, (_, i) => ({
    id: `audit-${i + 1}`,
    action: i % 5 === 0 ? 'CHECK_IN' : i % 5 === 1 ? 'CHECK_OUT' : 'PRICE_CHANGED',
    actor: { id: 's-1', email: 'admin@luxestay.com', role: 'HOTEL_ADMIN' },
    entityType: i % 2 === 0 ? 'BOOKING' : 'PRICING',
    entityId: i % 2 === 0 ? `b-${(i % 50) + 1}` : `pr-${(i % 50) + 1}`,
    beforeValues: { status: 'OLD' },
    afterValues: { status: 'NEW' },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0',
    timestamp: '2025-05-18T10:00:00Z',
    hotelId: `h-${(i % 4) + 101}`
  })),
  userActivity: {
    loginLogs: Array.from({ length: 50 }, (_, i) => ({
      timestamp: '2025-05-18T08:00:00Z',
      ipAddress: '192.168.1.100',
      success: true,
      failureReason: undefined
    })),
    logoutLogs: Array.from({ length: 50 }, (_, i) => ({
      timestamp: '2025-05-18T18:00:00Z'
    })),
    permissionChanges: [
      { timestamp: '2025-05-12T13:00:00Z', changedBy: 'admin@luxestay.com', oldPermissions: ['bookings:view'], newPermissions: ['bookings:view', 'bookings:edit'] },
    ],
    roleChanges: [
      { timestamp: '2025-05-12T13:00:00Z', changedBy: 'admin@luxestay.com', oldRole: 'STAFF', newRole: 'HOTEL_MANAGER' },
    ],
  },
  featureFlags: { AUDIT_LOGS_ENABLED: true },
};

// ============================================================================
// PHASE-2 WAVE-1 MOCK DATA (Approval Workflows)
// ============================================================================

export const phase2ApprovalMockData = {
  approvalRequests: Array.from({ length: 50 }, (_, i) => ({
    id: `apr-${i + 1}`,
    action: i % 2 === 0 ? 'REFUND' : 'CANCELLATION',
    requester: { id: `s-${(i % 5) + 2}`, email: 'staff@luxestay.com', role: 'HOTEL_MANAGER' },
    approvers: [{ id: 's-1', email: 'admin@luxestay.com', role: 'HOTEL_ADMIN', status: i % 3 === 0 ? 'PENDING' : 'APPROVED', approvedAt: undefined, comments: undefined }],
    status: i % 3 === 0 ? 'PENDING' : i % 3 === 1 ? 'APPROVED' : 'REJECTED',
    entityType: 'BOOKING',
    entityId: `b-${(i % 50) + 1}`,
    requestData: { amount: 5000, reason: 'Guest Dispute' },
    createdAt: '2025-05-20T10:00:00Z',
    expiresAt: '2025-05-27T10:00:00Z',
    comments: undefined,
    hotelId: `h-${(i % 4) + 101}`
  })),
  approvalChains: [
    { id: 'chain-1', action: 'REFUND', thresholds: [{ amount: 10000, approverRoles: ['MANAGER', 'HOTEL_ADMIN'] }], isActive: true, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
    { id: 'chain-2', action: 'CANCELLATION', thresholds: [{ amount: 0, approverRoles: ['HOTEL_ADMIN'] }], isActive: true, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
    ...Array.from({ length: 13 }, (_, i) => ({
        id: `chain-${i+3}`,
        action: 'DISCOUNT_OVERRIDE',
        thresholds: [{ amount: 1000, approverRoles: ['MANAGER'] }],
        isActive: true,
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z'
    }))
  ],
  featureFlags: { APPROVAL_WORKFLOWS_ENABLED: true },
};

// ============================================================================
// TENANT & SUBSCRIPTION (ENTERPRISE MULTI-TENANT)
// ============================================================================

export const tenantSubscriptionMockData = {
  tenants: Array.from({ length: 50 }, (_, i) => ({
    id: `t-${i + 1}`,
    name: `Enterprise Group ${i + 1}`,
    status: i % 10 === 0 ? 'SUSPENDED' : 'ACTIVE',
    subscriptionId: `sub-${i + 1}`,
    createdAt: '2024-01-01T00:00:00Z',
    contactEmail: `admin@group${i + 1}.com`,
    contactPhone: '+91 832 555 0000',
    billingAddress: 'Corporate Towers, BLR'
  })),
  plans: [
    { id: 'plan-1', name: 'Starter', tier: 'STARTER', maxHotels: 1, maxRooms: 50, maxUsers: 5, priceMonthly: 9900, priceYearly: 99000, currency: 'INR', features: ['bookings', 'rooms', 'housekeeping', 'basic_reports'] },
    { id: 'plan-2', name: 'Professional', tier: 'PROFESSIONAL', maxHotels: 10, maxRooms: 500, maxUsers: 50, priceMonthly: 29900, priceYearly: 299000, currency: 'INR', features: ['bookings', 'rooms', 'housekeeping', 'maintenance', 'pricing', 'crm', 'advanced_reports', 'api_access'] },
    { id: 'plan-3', name: 'Enterprise', tier: 'ENTERPRISE', maxHotels: 999, maxRooms: 9999, maxUsers: 999, priceMonthly: 99900, priceYearly: 999000, currency: 'INR', features: ['bookings', 'rooms', 'housekeeping', 'maintenance', 'pricing', 'crm', 'advanced_reports', 'api_access', 'channel_manager', 'revenue_management', 'white_label', 'sso', 'audit_logs', 'approvals', 'communication_automation'] },
  ],
  subscriptions: Array.from({ length: 50 }, (_, i) => ({
    id: `sub-${i + 1}`,
    tenantId: `t-${i + 1}`,
    planId: i % 3 === 0 ? 'plan-3' : 'plan-2',
    status: 'ACTIVE',
    billingCycle: 'YEARLY',
    currentPeriodStart: '2025-01-01T00:00:00Z',
    currentPeriodEnd: '2026-01-01T00:00:00Z',
    autoRenew: true,
    paymentMethod: 'CARD',
    lastPaymentDate: '2025-01-01T00:00:00Z',
    nextBillingDate: '2026-01-01T00:00:00Z',
    amount: 999000,
    currency: 'INR'
  })),
  featureEntitlements: Array.from({ length: 100 }, (_, i) => ({
    tenantId: `t-${Math.floor(i / 2) + 1}`,
    feature: i % 2 === 0 ? 'bookings' : 'audit_logs',
    enabled: true,
    limit: null
  })),
  billingHistory: Array.from({ length: 50 }, (_, i) => ({
    id: `bill-${i + 1}`,
    tenantId: `t-${(i % 10) + 1}`,
    subscriptionId: `sub-${(i % 10) + 1}`,
    invoiceNumber: `SUB-INV-2025-${i + 1}`,
    amount: 999000,
    currency: 'INR',
    status: 'PAID',
    billingDate: '2025-01-01T00:00:00Z',
    paidDate: '2025-01-01T10:00:00Z',
    paymentMethod: 'CARD',
    description: 'Annual Enterprise Subscription'
  })),
};

// ============================================================================
// PERMISSION SYSTEM (RBAC + USER OVERRIDES)
// ============================================================================

export const permissionSystemMockData = {
  permissions: [
    { id: 'perm-1', key: 'bookings:view', name: 'View Bookings', category: 'BOOKINGS', description: 'View all bookings' },
    { id: 'perm-2', key: 'bookings:create', name: 'Create Bookings', category: 'BOOKINGS', description: 'Create new bookings' },
    { id: 'perm-3', key: 'bookings:edit', name: 'Edit Bookings', category: 'BOOKINGS', description: 'Modify existing bookings' },
    { id: 'perm-4', key: 'bookings:cancel', name: 'Cancel Bookings', category: 'BOOKINGS', description: 'Cancel bookings' },
    { id: 'perm-5', key: 'rooms:view', name: 'View Rooms', category: 'ROOMS', description: 'View room inventory' },
    ...Array.from({ length: 16 }, (_, i) => ({
        id: `perm-${i+6}`,
        key: `feat:${i}:access`,
        name: `Access Feature ${i}`,
        category: 'SYSTEM',
        description: `Manage system feature ${i}`
    }))
  ],
  rolePermissions: [
    { roleId: 'HOTEL_ADMIN', permissions: ['bookings:view', 'bookings:create', 'bookings:edit', 'bookings:cancel', 'rooms:view', 'rooms:manage', 'pricing:view', 'pricing:edit', 'guests:view', 'guests:edit', 'finance:view', 'finance:manage', 'reports:view', 'reports:export', 'settings:view', 'settings:edit', 'users:manage', 'housekeeping:view', 'housekeeping:manage', 'maintenance:view', 'maintenance:manage'] },
    { roleId: 'HOTEL_MANAGER', permissions: ['bookings:view', 'bookings:create', 'bookings:edit', 'bookings:cancel', 'rooms:view', 'rooms:manage', 'pricing:view', 'pricing:edit', 'guests:view', 'guests:edit', 'finance:view', 'finance:manage', 'reports:view', 'reports:export', 'housekeeping:view', 'housekeeping:manage', 'maintenance:view', 'maintenance:manage'] },
    ...Array.from({ length: 13 }, (_, i) => ({
        roleId: `CUSTOM_ROLE_${i}`,
        permissions: ['bookings:view', 'rooms:view']
    }))
  ],
  userPermissionOverrides: Array.from({ length: 50 }, (_, i) => ({
    userId: `s-${(i % 30) + 1}`,
    permission: 'bookings:cancel',
    granted: true,
    grantedBy: 's-1',
    grantedAt: '2025-05-01T00:00:00Z',
    reason: 'Temporary override for weekend shift'
  })),
};

// ============================================================================
// CANCELLATION / NO-SHOW / REFUND POLICIES
// ============================================================================

export const cancellationPolicyMockData = {
  cancellationPolicies: Array.from({ length: 20 }, (_, i) => ({
    id: `cp-${i + 1}`,
    hotelId: `h-${(i % 4) + 101}`,
    name: i % 2 === 0 ? 'Flexible' : 'Strict Non-Refundable',
    description: 'Policy governing booking cancellations.',
    rules: [{ hoursBeforeCheckIn: 24, penaltyType: 'PERCENTAGE', penaltyValue: i % 2 === 0 ? 0 : 100 }],
    isDefault: i < 4
  })),
  noShowPolicies: Array.from({ length: 20 }, (_, i) => ({
    id: `ns-${i + 1}`,
    hotelId: `h-${(i % 4) + 101}`,
    name: 'Standard No-Show',
    description: 'Policy for no-show guests.',
    penaltyType: 'PERCENTAGE',
    penaltyValue: 100,
    gracePeriodHours: 2,
    isDefault: true
  })),
  refundRules: Array.from({ length: 20 }, (_, i) => ({
    id: `rr-${i + 1}`,
    hotelId: `h-${(i % 4) + 101}`,
    reason: i % 2 === 0 ? 'CANCELLATION' : 'NO_SHOW',
    processingDays: 7,
    refundMethod: 'ORIGINAL_PAYMENT',
    deductionType: 'FIXED',
    deductionValue: 0,
    requiresApproval: i % 2 !== 0,
    approvalThreshold: 1000
  })),
  refundCalculations: Array.from({ length: 50 }, (_, i) => ({
    bookingId: `b-${i + 1}`,
    bookingAmount: 5000,
    cancellationPolicyId: `cp-${(i % 4) + 1}`,
    hoursBeforeCheckIn: 48,
    penaltyAmount: 0,
    refundAmount: 5000,
    processingFee: 0,
    netRefund: 5000
  })),
};

// ============================================================================
// TAX CONFIGURATION (GST / HSN CODES)
// ============================================================================

export const taxConfigurationMockData = {
  taxRules: Array.from({ length: 20 }, (_, i) => ({
    id: `tax-${i + 1}`,
    hotelId: `h-${(i % 4) + 101}`,
    taxName: i % 2 === 0 ? 'GST' : 'Service Charge',
    taxType: 'GST',
    rate: i % 2 === 0 ? 18 : 5,
    isInclusive: false,
    applicableOn: 'ROOM_CHARGES',
    hsnCode: '9963',
    isActive: true
  })),
  hsnCodes: [
    { code: '9963', description: 'Accommodation services', category: 'ACCOMMODATION', gstRate: 18 },
    { code: '9997', description: 'Technical services', category: 'SERVICES', gstRate: 18 },
    { code: '9996', description: 'Catering', category: 'FOOD_BEVERAGE', gstRate: 18 },
    ...Array.from({ length: 12 }, (_, i) => ({
        code: `900${i}`,
        description: `HSN Sub-code ${i}`,
        category: 'OTHERS',
        gstRate: 12
    }))
  ],
  gstConfiguration: Array.from({ length: 15 }, (_, i) => ({
    hotelId: `h-${101 + i}`,
    gstin: `18AABCT1234H${i}Z0`,
    legalName: `LuxeStay Hotel Unit ${i}`,
    address: 'Regional Office',
    state: 'Goa',
    stateCode: '30',
    panNumber: 'AABCT1234H',
    isCompositionScheme: false
  })),
};

// ============================================================================
// PROMOTIONS & RATE OVERRIDES
// ============================================================================

export const promotionsRateOverridesMockData = {
  promoCodes: Array.from({ length: 50 }, (_, i) => ({
    id: `promo-${i + 1}`,
    hotelId: `h-${(i % 4) + 101}`,
    code: `PROMO${i + 1}`,
    name: `Promotion ${i + 1}`,
    discountType: 'PERCENTAGE',
    discountValue: 10 + (i % 20),
    validFrom: '2025-01-01',
    validTo: '2025-12-31',
    minNights: 1,
    maxNights: 7,
    minAmount: 1000,
    maxUsage: 100,
    usageCount: i % 50,
    isActive: true,
    applicableRoomTypes: ['rt-1', 'rt-2'],
    blackoutDates: []
  })),
  seasonalPricing: Array.from({ length: 20 }, (_, i) => ({
    id: `sp-${i + 1}`,
    hotelId: `h-${(i % 4) + 101}`,
    name: `Season ${i + 1}`,
    startDate: '2025-11-01',
    endDate: '2025-12-31',
    priceMultiplier: 1.2,
    applicableRoomTypes: ['rt-1'],
    isActive: true
  })),
  corporateRates: Array.from({ length: 20 }, (_, i) => ({
    id: `cr-${i + 1}`,
    hotelId: `h-${(i % 4) + 101}`,
    companyName: `Corporate ${i + 1}`,
    contactPerson: 'Manager',
    contactEmail: `corp${i + 1}@business.com`,
    discountType: 'PERCENTAGE',
    discountValue: 20,
    validFrom: '2025-01-01',
    validTo: '2025-12-31',
    applicableRoomTypes: ['rt-1'],
    isActive: true
  })),
  blackoutDates: Array.from({ length: 20 }, (_, i) => ({
    id: `bd-${i + 1}`,
    // Fix: Using the loop index 'i' instead of the undefined 'idNum'.
    hotelId: `h-${(i % 4) + 101}`,
    date: `2025-12-${(i % 31) + 1}`,
    reason: 'Peak Season Blockout',
    affectsPromoCodes: true,
    affectsSeasonalPricing: false
  })),
};

// ============================================================================
// CHANNEL MANAGER / OTA INTEGRATION
// ============================================================================

export const channelManagerMockData = {
  otaConnections: Array.from({ length: 20 }, (_, i) => ({
    id: `ota-${i + 1}`,
    hotelId: `h-${(i % 4) + 101}`,
    otaName: i % 2 === 0 ? 'Booking.com' : 'Expedia',
    otaCode: i % 2 === 0 ? 'BOOKING_COM' : 'EXPEDIA',
    status: 'CONNECTED',
    apiKey: 'key-***',
    lastSyncAt: '2025-05-20T10:00:00Z',
    syncFrequency: 'REAL_TIME',
    roomsMapped: 3,
    isActive: true,
    connectionDate: '2025-01-01T00:00:00Z'
  })),
  syncLogs: Array.from({ length: 50 }, (_, i) => ({
    id: `sync-${i + 1}`,
    hotelId: `h-${(i % 4) + 101}`,
    otaConnectionId: `ota-${(i % 10) + 1}`,
    syncType: 'INVENTORY',
    direction: 'PUSH',
    status: 'SUCCESS',
    recordsProcessed: 10,
    recordsFailed: 0,
    startedAt: '2025-05-20T10:00:00Z',
    completedAt: '2025-05-20T10:00:05Z',
    errorMessage: null
  })),
  conflictResolution: Array.from({ length: 20 }, (_, i) => ({
    id: `conf-${i + 1}`,
    hotelId: `h-101`,
    otaConnectionId: `ota-1`,
    conflictType: 'OVERBOOKING',
    roomTypeId: 'rt-1',
    date: '2025-06-15',
    pmsAvailability: 1,
    otaAvailability: 2,
    status: 'RESOLVED',
    resolvedBy: 's-1',
    resolvedAt: '2025-05-20T11:00:00Z',
    resolution: 'Automatic sync adjustment'
  })),
  roomMapping: Array.from({ length: 30 }, (_, i) => ({
    id: `map-${i + 1}`,
    hotelId: `h-101`,
    otaConnectionId: `ota-${(i % 5) + 1}`,
    pmsRoomTypeId: `rt-${(i % 3) + 1}`,
    pmsRoomTypeName: 'PMS Room',
    otaRoomTypeId: `ota-rt-${i}`,
    otaRoomTypeName: 'OTA Room',
    isActive: true
  })),
};

// ============================================================================
// STAFF OPERATIONS (SHIFTS & TASK ASSIGNMENTS)
// ============================================================================

export const staffOperationsMockData = {
  shifts: Array.from({ length: 50 }, (_, i) => ({
    id: `shift-${i + 1}`,
    hotelId: `h-${(i % 4) + 101}`,
    staffId: `s-${(i % 15) + 1}`,
    staffName: `Staff Member ${i + 1}`,
    role: 'FRONT_DESK',
    shiftType: i % 2 === 0 ? 'MORNING' : 'EVENING',
    startTime: '2025-05-20T06:00:00Z',
    endTime: '2025-05-20T14:00:00Z',
    status: 'COMPLETED',
    checkInTime: '2025-05-20T05:55:00Z',
    checkOutTime: '2025-05-20T14:05:00Z'
  })),
  taskAssignments: Array.from({ length: 50 }, (_, i) => ({
    id: `task-${i + 1}`,
    hotelId: `h-101`,
    taskType: i % 2 === 0 ? 'ROOM_CLEANING' : 'MAINTENANCE',
    assignedTo: `s-${(i % 5) + 4}`,
    assignedBy: 's-2',
    roomId: `r-1${(i % 20) + 1}`,
    roomNumber: `1${(i % 20) + 1}`,
    priority: 'HIGH',
    status: i % 4 === 0 ? 'PENDING' : 'COMPLETED',
    dueDate: '2025-05-20T12:00:00Z',
    completedAt: i % 4 !== 0 ? '2025-05-20T11:30:00Z' : null,
    notes: 'Standard task.',
    createdAt: '2025-05-20T08:00:00Z'
  })),
  taskTemplates: Array.from({ length: 20 }, (_, i) => ({
    id: `tt-${i + 1}`,
    name: `Template ${i + 1}`,
    taskType: 'ROOM_CLEANING',
    estimatedDuration: 30,
    checklist: ['Step 1', 'Step 2'],
    isActive: true
  })),
};

// ============================================================================
// DOCUMENTS & ATTACHMENTS (50+ RECORDS)
// ============================================================================

export const documentsAttachmentsMockData = {
  guestDocuments: Array.from({ length: 50 }, (_, i) => ({
    id: `doc-${i + 1}`,
    guestId: `g-${(i % 50) + 1}`,
    bookingId: `b-${(i % 50) + 1}`,
    documentType: 'ID_PROOF',
    documentName: 'Govt ID',
    fileName: `doc_${i + 1}.pdf`,
    fileUrl: `/docs/guest_${i + 1}.pdf`,
    fileSize: 200000,
    uploadedBy: 's-3',
    uploadedAt: '2025-05-18T09:00:00Z',
    verifiedBy: 's-2',
    verifiedAt: '2025-05-18T09:15:00Z',
    status: 'VERIFIED'
  })),
  bookingAttachments: Array.from({ length: 50 }, (_, i) => ({
    id: `att-${i + 1}`,
    bookingId: `b-${(i % 50) + 1}`,
    attachmentType: 'SPECIAL_REQUEST',
    fileName: `req_${i + 1}.txt`,
    fileUrl: `/docs/req_${i + 1}.txt`,
    fileSize: 1000,
    uploadedBy: 's-3',
    uploadedAt: '2025-05-10T10:00:00Z',
    description: 'Additional info'
  })),
  invoiceDocuments: Array.from({ length: 50 }, (_, i) => ({
    id: `inv-doc-${i + 1}`,
    invoiceId: `inv-${(i % 50) + 1}`,
    invoiceNumber: `INV-LS-99${(i % 50) + 1}`,
    documentType: 'INVOICE_PDF',
    fileName: `inv_${i + 1}.pdf`,
    fileUrl: `/docs/inv_${i + 1}.pdf`,
    fileSize: 300000,
    generatedAt: '2025-05-23T10:00:00Z',
    sentToGuest: true,
    sentAt: '2025-05-23T10:05:00Z'
  })),
  documentCategories: [
    { id: 'cat-1', name: 'ID Proofs', description: 'Govt IDs', requiredForCheckIn: true, retentionDays: 365 },
    { id: 'cat-2', name: 'Attachments', description: 'General docs', requiredForCheckIn: false, retentionDays: 180 },
    ...Array.from({ length: 13 }, (_, i) => ({
        id: `cat-${i+3}`,
        name: `Custom Cat ${i}`,
        description: 'Auto-generated',
        requiredForCheckIn: false,
        retentionDays: 30
    }))
  ],
};

// ============================================================================
// SYSTEM CONFIG
// ============================================================================

export const systemConfigMockData = {
  overbookingRules: Array.from({ length: 20 }, (_, i) => ({
    id: `ob-${i + 1}`,
    hotelId: `h-${(i % 4) + 101}`,
    roomTypeId: `rt-${(i % 6) + 1}`,
    allowOverbooking: true,
    overbookingPercentage: 5,
    maxOverbookings: 1,
    isActive: true
  })),
  autoRoomAssignment: Array.from({ length: 20 }, (_, i) => ({
    id: `ara-${i + 1}`,
    hotelId: `h-${(i % 4) + 101}`,
    enabled: true,
    assignmentStrategy: 'SEQUENTIAL',
    preferredFloors: [1],
    avoidFloors: [],
    considerGuestPreferences: true,
    considerRoomStatus: true
  })),
  lateCheckoutFees: Array.from({ length: 30 }, (_, i) => ({
    id: `lcf-${i + 1}`,
    hotelId: `h-${(i % 4) + 101}`,
    hoursLate: (i % 4) + 1,
    feeType: 'PERCENTAGE',
    feeAmount: 25,
    isActive: true
  })),
  featureToggles: Array.from({ length: 40 }, (_, i) => ({
    id: `ft-${i + 1}`,
    tenantId: 't-1',
    feature: `FEATURE_${i}`,
    enabled: i % 2 === 0,
    description: `System Feature ${i}`
  })),
  emailTemplates: Array.from({ length: 20 }, (_, i) => ({
    id: `et-${i + 1}`,
    hotelId: `h-101`,
    templateType: 'BOOKING_CONFIRMATION',
    subject: 'Confirmation',
    body: 'Your booking is confirmed.',
    isActive: true
  })),
};

// ============================================================================
// REPORTS & EXPORTS
// ============================================================================

export const reportsExportMockData = {
  reportCatalog: Array.from({ length: 20 }, (_, i) => ({
    id: `rpt-${i + 1}`,
    name: `Report ${i + 1}`,
    category: 'FINANCE',
    description: 'Detailed enterprise report.',
    parameters: ['hotelId'],
    outputFormats: ['PDF', 'CSV'],
    scheduleSupported: true,
    accessRoles: ['HOTEL_ADMIN']
  })),
  exportTypes: Array.from({ length: 20 }, (_, i) => ({
    id: `exp-${i + 1}`,
    name: `Export ${i + 1}`,
    description: 'Data export tool.',
    dataSource: 'BOOKINGS',
    columns: ['id'],
    formats: ['CSV'],
    maxRecords: 1000
  })),
  scheduledReports: Array.from({ length: 20 }, (_, i) => ({
    id: `sched-${i + 1}`,
    hotelId: 'h-101',
    reportId: `rpt-${(i % 5) + 1}`,
    reportName: 'Daily Sync',
    frequency: 'DAILY',
    schedule: '08:00',
    recipients: ['admin@luxestay.com'],
    format: 'PDF',
    isActive: true,
    lastRunAt: '2025-05-20T08:00:00Z',
    nextRunAt: '2025-05-21T08:00:00Z'
  })),
  reportHistory: Array.from({ length: 50 }, (_, i) => ({
    id: `hist-${i + 1}`,
    hotelId: 'h-101',
    reportId: 'rpt-1',
    reportName: 'Revenue Report',
    generatedBy: 's-1',
    generatedAt: '2025-05-20T08:00:00Z',
    parameters: { hotelId: 'h-101' },
    format: 'PDF',
    fileUrl: '/reports/rpt.pdf',
    fileSize: 500000,
    status: 'COMPLETED'
  })),
};
