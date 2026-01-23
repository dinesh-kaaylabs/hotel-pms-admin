/**
 * 🏨 LUXESTAY PMS - MOCK DATA GENERATOR
 * Generates 1000+ records per entity across multiple tenants
 * 
 * Usage: npx tsx scripts/generate-mock-data.ts
 */

const TENANTS = ['t-1', 't-2', 't-3'];
const HOTELS_PER_TENANT = 4;
const RECORDS_PER_ENTITY = 1000;

const firstNames = ['Alice', 'Robert', 'Emma', 'Michael', 'Jessica', 'David', 'Sophia', 'James', 'Olivia', 'William', 'Ava', 'Henry', 'Isabella', 'Lucas', 'Mia', 'Benjamin', 'Charlotte', 'Alexander', 'Amelia', 'Daniel'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
const cities = ['Goa', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur'];
const roomTypes = ['Deluxe Suite', 'Standard Room', 'Premium Suite', 'Luxury Penthouse', 'Studio Room', 'Suite Conectada'];
const statuses = ['CONFIRMED', 'PENDING', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED'];
const housekeepingStatuses = ['CLEAN', 'DIRTY', 'OCCUPIED', 'OUT_OF_SERVICE'];
const maintenanceStatuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'PENDING_APPROVAL'];
const paymentProviders = ['STRIPE', 'RAZORPAY', 'PAYPAL'];
const paymentMethods = ['CARD', 'UPI', 'NET_BANKING', 'WALLET'];
const tags = ['VIP', 'FREQUENT', 'REGULAR', 'CORPORATE', 'LOYALTY'];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDate(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
}

function generateGuestName(): string {
  return `${randomItem(firstNames)} ${randomItem(lastNames)}`;
}

function generateHotels() {
  const hotels: any[] = [];
  let hotelCounter = 101;
  
  TENANTS.forEach(tenantId => {
    for (let i = 0; i < HOTELS_PER_TENANT; i++) {
      const hotelId = `h-${hotelCounter}`;
      hotels.push({
        id: hotelId,
        name: `LuxeStay ${randomItem(cities)}`,
        city: randomItem(cities),
        status: 'ACTIVE',
        tenantId,
        address: `${randomInt(100, 999)} ${randomItem(['Main St', 'Park Ave', 'Ocean Drive', 'Central Blvd'])}`,
        timezone: 'Asia/Kolkata',
        currency: 'USD'
      });
      hotelCounter++;
    }
  });
  
  return hotels;
}

function generateBookings(hotels: any[]) {
  const bookings: any[] = [];
  let bookingCounter = 1;
  
  for (let i = 0; i < RECORDS_PER_ENTITY; i++) {
    const hotel = randomItem(hotels);
    const checkIn = randomInt(-30, 60);
    const duration = randomInt(1, 7);
    
    bookings.push({
      id: `b-${bookingCounter}`,
      bookingNumber: `LS-${9000 + bookingCounter}`,
      hotelId: hotel.id,
      tenantId: hotel.tenantId,
      guestName: generateGuestName(),
      guestEmail: `guest${bookingCounter}@example.com`,
      checkInDate: generateDate(checkIn),
      checkOutDate: generateDate(checkIn + duration),
      checkIn: generateDate(checkIn),
      checkOut: generateDate(checkIn + duration),
      status: randomItem(statuses),
      roomType: randomItem(roomTypes),
      roomNumber: `${randomInt(100, 999)}`,
      totalAmount: randomInt(300, 2000),
      paymentStatus: randomItem(['PAID', 'PENDING', 'REFUNDED']),
      createdAt: generateDate(randomInt(-90, 0))
    });
    bookingCounter++;
  }
  
  return bookings;
}

function generateGuests(hotels: any[]) {
  const guests: any[] = [];
  
  for (let i = 0; i < RECORDS_PER_ENTITY; i++) {
    const hotel = randomItem(hotels);
    guests.push({
      id: `g-${i + 1}`,
      hotelId: hotel.id,
      tenantId: hotel.tenantId,
      name: generateGuestName(),
      phone: `+91 ${randomInt(6000000000, 9999999999)}`,
      email: `guest${i + 1}@example.com`,
      tags: [randomItem(tags)],
      totalStays: randomInt(1, 50),
      lifetimeValue: randomInt(500, 50000),
      currency: 'USD'
    });
  }
  
  return guests;
}

function generateRooms(hotels: any[]) {
  const rooms: any[] = [];
  let roomCounter = 1;
  
  hotels.forEach(hotel => {
    for (let i = 0; i < 50; i++) {
      rooms.push({
        id: `r-${roomCounter}`,
        hotelId: hotel.id,
        tenantId: hotel.tenantId,
        roomNumber: `${100 + i}`,
        type: randomItem(roomTypes),
        status: randomItem(housekeepingStatuses),
        floor: randomInt(1, 10)
      });
      roomCounter++;
    }
  });
  
  return rooms;
}

function generateInvoices(hotels: any[], bookings: any[]) {
  const invoices: any[] = [];
  
  for (let i = 0; i < Math.min(RECORDS_PER_ENTITY, bookings.length); i++) {
    const booking = bookings[i];
    const subtotal = Math.round(booking.totalAmount * 0.88);
    const taxAmount = booking.totalAmount - subtotal;
    
    invoices.push({
      id: `inv-${i + 1}`,
      invoiceNumber: `INV-LS-${9000 + i + 1}`,
      bookingId: booking.id,
      bookingNumber: booking.bookingNumber,
      hotelId: booking.hotelId,
      tenantId: booking.tenantId,
      guestName: booking.guestName,
      gstin: '18AABCT1234H1Z0',
      status: randomItem(['ISSUED', 'PENDING', 'PAID']),
      subtotal,
      taxAmount,
      netAmount: subtotal,
      totalAmount: booking.totalAmount,
      currency: 'USD',
      issuedAt: booking.createdAt,
      pdfUrl: '#'
    });
  }
  
  return invoices;
}

function generatePayments(hotels: any[], bookings: any[]) {
  const payments: any[] = [];
  
  for (let i = 0; i < Math.min(RECORDS_PER_ENTITY, bookings.length); i++) {
    const booking = bookings[i];
    
    payments.push({
      id: `p-${i + 1}`,
      hotelId: booking.hotelId,
      tenantId: booking.tenantId,
      bookingId: booking.id,
      bookingNumber: booking.bookingNumber,
      provider: randomItem(paymentProviders),
      providerPaymentId: `pay_${Math.random().toString(36).substr(2, 20)}`,
      method: randomItem(paymentMethods),
      status: randomItem(['CAPTURED', 'PENDING', 'FAILED']),
      amount: booking.totalAmount,
      currency: 'USD',
      createdAt: booking.createdAt
    });
  }
  
  return payments;
}

function generateSettlements(hotels: any[]) {
  const settlements: any[] = [];
  let settlementCounter = 1;
  
  TENANTS.forEach(tenantId => {
    for (let i = 0; i < 50; i++) {
      const hotel = randomItem(hotels.filter(h => h.tenantId === tenantId));
      settlements.push({
        id: `set-${settlementCounter}`,
        hotelId: hotel.id,
        tenantId,
        source: randomItem(paymentProviders),
        referenceId: `ref_${Math.random().toString(36).substr(2, 15)}`,
        grossAmount: randomInt(5000, 50000),
        commission: randomInt(0, 500),
        gatewayFee: randomInt(10, 100),
        netAmount: randomInt(4000, 45000),
        currency: 'USD',
        status: randomItem(['SETTLED', 'PENDING', 'FAILED']),
        expectedAt: generateDate(3),
        settledAt: generateDate(1),
        createdAt: generateDate(0)
      });
      settlementCounter++;
    }
  });
  
  return settlements;
}

function generateHousekeepingRooms(hotels: any[], rooms: any[]) {
  const housekeepingRooms: any[] = [];
  
  rooms.forEach((room, idx) => {
    housekeepingRooms.push({
      id: room.id,
      hotelId: room.hotelId,
      tenantId: room.tenantId,
      roomNumber: room.roomNumber,
      roomType: room.type,
      floor: room.floor,
      status: randomItem(housekeepingStatuses),
      assignedStaff: {
        id: `st-${randomInt(1, 100)}`,
        name: generateGuestName()
      },
      lastCleanedAt: generateDate(randomInt(-7, 0))
    });
  });
  
  return housekeepingRooms;
}

function generateMaintenanceIssues(hotels: any[], rooms: any[]) {
  const issues: any[] = [];
  let issueCounter = 1;
  
  for (let i = 0; i < 500; i++) {
    const room = randomItem(rooms);
    const createdDaysAgo = randomInt(0, 30);
    
    issues.push({
      id: `m-${issueCounter}`,
      hotelId: room.hotelId,
      tenantId: room.tenantId,
      roomId: room.id,
      roomNumber: room.roomNumber,
      roomType: room.type,
      reason: randomItem(['AC Leak', 'Toilet Issue', 'Door Lock', 'TV Malfunction', 'Plumbing', 'Electric Issue', 'Heating Problem']),
      status: randomItem(maintenanceStatuses),
      blockedFrom: generateDate(-createdDaysAgo),
      blockedTo: generateDate(-createdDaysAgo + randomInt(1, 5)),
      reportedBy: generateGuestName(),
      resolvedAt: randomItem([null, generateDate(-createdDaysAgo + 2)]),
      createdAt: generateDate(-createdDaysAgo)
    });
    issueCounter++;
  }
  
  return issues;
}

function generatePricingCalendar(hotels: any[]) {
  const calendar: any[] = [];
  let entryCounter = 1;
  
  hotels.forEach(hotel => {
    for (let day = 0; day < 90; day++) {
      roomTypes.forEach(roomType => {
        calendar.push({
          id: `pr-${entryCounter}`,
          hotelId: hotel.id,
          tenantId: hotel.tenantId,
          date: generateDate(day),
          roomTypeId: `rt-${randomInt(1, 6)}`,
          roomType,
          ratePlanId: `rp-${randomInt(1, 10)}`,
          price: randomInt(100, 500),
          availableRooms: randomInt(0, 50),
          closed: randomItem([true, false])
        });
        entryCounter++;
      });
    }
  });
  
  return calendar;
}

function generateAnalytics(tenants: string[]) {
  const analytics: any[] = [];
  
  tenants.forEach(tenantId => {
    const revenueTrend: any[] = [];
    const occupancyTrend: any[] = [];
    
    for (let day = 0; day < 90; day++) {
      revenueTrend.push({
        date: generateDate(day - 90),
        revenue: randomInt(5000, 50000),
        bookings: randomInt(5, 50),
        tenantId
      });
      
      occupancyTrend.push({
        date: generateDate(day - 90),
        occupancy: randomInt(50, 95),
        tenantId
      });
    }
    
    analytics.push({
      tenantId,
      reportSummary: { totalRevenue: randomInt(100000, 1000000), totalBookings: randomInt(100, 1000), occupancyRate: randomInt(70, 95), adr: randomInt(150, 500) },
      dashboardStats: { totalBookings: randomInt(100, 1000), occupancyRate: randomInt(70, 95), revenueToday: randomInt(5000, 30000), avgRoomRate: randomInt(150, 500) },
      revenueTrend,
      occupancyTrend
    });
  });
  
  return analytics;
}

async function main() {
  console.log('🚀 Generating enterprise-scale mock data...\n');
  
  const hotels = generateHotels();
  console.log(`✅ Generated ${hotels.length} hotels`);
  
  const bookings = generateBookings(hotels);
  console.log(`✅ Generated ${bookings.length} bookings`);
  
  const guests = generateGuests(hotels);
  console.log(`✅ Generated ${guests.length} guests`);
  
  const rooms = generateRooms(hotels);
  console.log(`✅ Generated ${rooms.length} rooms`);
  
  const invoices = generateInvoices(hotels, bookings);
  console.log(`✅ Generated ${invoices.length} invoices`);
  
  const payments = generatePayments(hotels, bookings);
  console.log(`✅ Generated ${payments.length} payments`);
  
  const settlements = generateSettlements(hotels);
  console.log(`✅ Generated ${settlements.length} settlements`);
  
  const housekeepingRooms = generateHousekeepingRooms(hotels, rooms);
  console.log(`✅ Generated ${housekeepingRooms.length} housekeeping records`);
  
  const maintenanceIssues = generateMaintenanceIssues(hotels, rooms);
  console.log(`✅ Generated ${maintenanceIssues.length} maintenance issues`);
  
  const pricingCalendar = generatePricingCalendar(hotels);
  console.log(`✅ Generated ${pricingCalendar.length} pricing calendar entries`);
  
  const analytics = generateAnalytics(TENANTS);
  console.log(`✅ Generated analytics for ${TENANTS.length} tenants`);
  
  const mockData = {
    authMockData: {
      adminUser: { id: 's-1', name: 'Admin', email: 'admin@luxestay.com', role: 'SUPER_ADMIN', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin' },
      staffUsers: Array.from({ length: 100 }, (_, i) => ({
        id: `s-${i + 1}`,
        name: generateGuestName(),
        email: `staff${i + 1}@luxestay.com`,
        role: randomItem(['HOTEL_ADMIN', 'HOTEL_MANAGER', 'FRONT_DESK', 'HOUSEKEEPING']),
        hotelId: randomItem(hotels).id,
        tenantId: randomItem(TENANTS),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=staff${i + 1}`
      })),
      mfaCode: '123456',
      mfaToken: 'mfa-token-123'
    },
    hotelsMockData: { hotels, defaultHotelId: hotels[0].id, branding: { name: 'LuxeStay PMS', primaryColor: '#4f46e5', theme: 'light', font: 'Inter', logoUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=luxestay' } },
    bookingsMockData: { bookings, invoices },
    guestsMockData: { guests, guestStays: [], guestNotes: [], newGuestNote: { id: 'n-new', guestId: 'g-1', note: 'Sample note', createdBy: 'Admin', createdAt: generateDate(0) } },
    roomsMockData: { rooms, roomTypes: Array.from({ length: 18 }, (_, i) => ({ id: `rt-${i + 1}`, hotelId: randomItem(hotels).id, name: randomItem(roomTypes), roomTypeName: randomItem(roomTypes), capacity: randomInt(1, 6), baseOccupancy: randomInt(1, 4), maxOccupancy: randomInt(2, 6), active: true, minNights: 1, maxNights: 30 })), inventory: [], newRoomType: { id: 'rt-new', name: 'New Room', success: true } },
    financeMockData: { invoices, payments, settlements, settlementSummary: { grossRevenue: randomInt(500000, 5000000), netReceivable: randomInt(400000, 4000000), pendingPayout: randomInt(50000, 500000), currency: 'USD' } },
    housekeepingMockData: { housekeepingRooms, housekeepingSummary: { dirty: randomInt(20, 100), clean: randomInt(100, 300), inspected: randomInt(10, 50), outOfService: randomInt(5, 30) }, cleaningLogs: [] },
    maintenanceMockData: { maintenanceIssues },
    pricingMockData: { ratePlans: Array.from({ length: 30 }, (_, i) => ({ id: `rp-${i + 1}`, hotelId: randomItem(hotels).id, tenantId: randomItem(TENANTS), name: `Rate Plan ${i + 1}`, roomTypeId: `rt-${randomInt(1, 6)}`, roomTypeName: randomItem(roomTypes), status: 'ACTIVE', refundable: randomItem([true, false]), minNights: randomInt(1, 7), maxNights: 30 })), pricingCalendar, newRatePlan: { id: 'rp-new', name: 'New Rate', success: true } },
    settingsMockData: { hotelSettings: hotels[0], staffUsers: [] },
    analyticsMockData: analytics[0]
  };
  
  console.log('\n📊 Mock Data Summary:');
  console.log(`   Tenants: ${TENANTS.length}`);
  console.log(`   Hotels: ${hotels.length}`);
  console.log(`   Bookings: ${bookings.length}`);
  console.log(`   Guests: ${guests.length}`);
  console.log(`   Rooms: ${rooms.length}`);
  console.log(`   Invoices: ${invoices.length}`);
  console.log(`   Payments: ${payments.length}`);
  console.log(`   Maintenance Issues: ${maintenanceIssues.length}`);
  console.log(`   Pricing Calendar Entries: ${pricingCalendar.length}`);
  
  console.log('\n✅ Mock data generation complete!');
  
  return mockData;
}

main().catch(console.error);
