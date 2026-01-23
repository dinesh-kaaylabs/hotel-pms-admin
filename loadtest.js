/**
 * 🚀 LUXESTAY PMS - LOAD TEST (k6/Grafana)
 * 
 * Tests GraphQL endpoints under load
 * 
 * Usage: k6 run loadtest.js
 * Or with options: k6 run --vus 100 --duration 5m loadtest.js
 */

import http from 'k6/http';
import { check, sleep, group } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 10 },   // Ramp-up: 0 to 10 users over 1 minute
    { duration: '3m', target: 50 },   // Ramp-up: 10 to 50 users over 3 minutes
    { duration: '5m', target: 100 },  // Ramp-up: 50 to 100 users over 5 minutes
    { duration: '5m', target: 100 },  // Stay at 100 users for 5 minutes
    { duration: '3m', target: 50 },   // Ramp-down: 100 to 50 users over 3 minutes
    { duration: '1m', target: 0 },    // Ramp-down: 50 to 0 users over 1 minute
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],  // 95% of requests < 500ms, 99% < 1000ms
    http_req_failed: ['rate<0.1'],                     // Less than 10% failure rate
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5173/graphql';
const TENANT_ID = __ENV.TENANT_ID || 't-1';
const HOTEL_ID = __ENV.HOTEL_ID || 'h-101';

// Sample GraphQL queries
const queries = {
  me: `query Me {
    me {
      id
      name
      email
      role
      hotels {
        id
        name
      }
    }
  }`,

  listHotels: `query ListHotels {
    hotels {
      id
      name
      city
      status
    }
  }`,

  listBookings: `query ListBookings($hotelId: String!, $limit: Int, $offset: Int) {
    bookings(hotelId: $hotelId, limit: $limit, offset: $offset) {
      id
      bookingNumber
      guestName
      checkInDate
      checkOutDate
      status
      totalAmount
    }
  }`,

  listGuests: `query ListGuests($hotelId: String!, $limit: Int, $offset: Int) {
    guests(hotelId: $hotelId, limit: $limit, offset: $offset) {
      id
      name
      email
      phone
      tags
      totalStays
      lifetimeValue
    }
  }`,

  listRooms: `query ListRooms($hotelId: String!) {
    rooms(hotelId: $hotelId) {
      id
      roomNumber
      type
      status
      floor
    }
  }`,

  dashboardStats: `query DashboardStats($hotelId: String!) {
    dashboardStats(hotelId: $hotelId) {
      totalBookings
      occupancyRate
      revenueToday
      avgRoomRate
    }
  }`,

  analytics: `query Analytics($hotelId: String!) {
    analytics(hotelId: $hotelId) {
      revenueTrend {
        date
        revenue
        bookings
      }
      occupancyTrend {
        date
        occupancy
      }
    }
  }`,

  createBooking: `mutation CreateBooking($input: CreateBookingInput!) {
    createBooking(input: $input) {
      id
      bookingNumber
      status
    }
  }`,

  updateBooking: `mutation UpdateBooking($id: String!, $input: UpdateBookingInput!) {
    updateBooking(id: $id, input: $input) {
      id
      status
    }
  }`,

  createGuest: `mutation CreateGuest($input: CreateGuestInput!) {
    createGuest(input: $input) {
      id
      name
      email
    }
  }`,

  listInvoices: `query ListInvoices($hotelId: String!, $limit: Int, $offset: Int) {
    invoices(hotelId: $hotelId, limit: $limit, offset: $offset) {
      id
      invoiceNumber
      bookingNumber
      guestName
      status
      totalAmount
    }
  }`,

  listPayments: `query ListPayments($hotelId: String!, $limit: Int, $offset: Int) {
    payments(hotelId: $hotelId, limit: $limit, offset: $offset) {
      id
      bookingNumber
      provider
      method
      status
      amount
    }
  }`,

  listHousekeeping: `query ListHousekeeping($hotelId: String!) {
    housekeepingRooms(hotelId: $hotelId) {
      id
      roomNumber
      status
      assignedStaff {
        id
        name
      }
    }
  }`,

  listMaintenance: `query ListMaintenance($hotelId: String!) {
    maintenanceIssues(hotelId: $hotelId) {
      id
      roomNumber
      reason
      status
      reportedBy
    }
  }`,
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - randomInt(0, daysAgo));
  return date.toISOString().split('T')[0];
}

function makeGraphQLRequest(queryName, variables = {}) {
  const query = queries[queryName];
  if (!query) {
    throw new Error(`Query ${queryName} not found`);
  }

  const payload = JSON.stringify({
    query,
    variables,
    operationName: queryName,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer test-token-${TENANT_ID}`,
    },
  };

  return http.post(BASE_URL, payload, params);
}

export default function () {
  // Group: Authentication & Dashboard
  group('Authentication & Dashboard', () => {
    let res = makeGraphQLRequest('me');
    check(res, {
      'me query status 200': (r) => r.status === 200,
      'me query contains id': (r) => r.body.includes('id'),
    });
    sleep(1);
  });

  // Group: Listing Operations
  group('Listing Operations', () => {
    const limit = 50;
    const offset = randomInt(0, 100);

    // List Hotels
    let res = makeGraphQLRequest('listHotels');
    check(res, {
      'listHotels status 200': (r) => r.status === 200,
      'listHotels contains data': (r) => r.body.includes('hotels'),
    });
    sleep(0.5);

    // List Bookings
    res = makeGraphQLRequest('listBookings', { hotelId: HOTEL_ID, limit, offset });
    check(res, {
      'listBookings status 200': (r) => r.status === 200,
      'listBookings contains bookings': (r) => r.body.includes('bookings'),
    });
    sleep(0.5);

    // List Guests
    res = makeGraphQLRequest('listGuests', { hotelId: HOTEL_ID, limit, offset });
    check(res, {
      'listGuests status 200': (r) => r.status === 200,
      'listGuests contains guests': (r) => r.body.includes('guests'),
    });
    sleep(0.5);

    // List Rooms
    res = makeGraphQLRequest('listRooms', { hotelId: HOTEL_ID });
    check(res, {
      'listRooms status 200': (r) => r.status === 200,
      'listRooms contains rooms': (r) => r.body.includes('rooms'),
    });
    sleep(0.5);

    // List Invoices
    res = makeGraphQLRequest('listInvoices', { hotelId: HOTEL_ID, limit, offset });
    check(res, {
      'listInvoices status 200': (r) => r.status === 200,
      'listInvoices contains invoices': (r) => r.body.includes('invoices'),
    });
    sleep(0.5);

    // List Payments
    res = makeGraphQLRequest('listPayments', { hotelId: HOTEL_ID, limit, offset });
    check(res, {
      'listPayments status 200': (r) => r.status === 200,
      'listPayments contains payments': (r) => r.body.includes('payments'),
    });
    sleep(0.5);
  });

  // Group: Analytics
  group('Analytics', () => {
    const res = makeGraphQLRequest('dashboardStats', { hotelId: HOTEL_ID });
    check(res, {
      'dashboardStats status 200': (r) => r.status === 200,
      'dashboardStats contains stats': (r) => r.body.includes('dashboardStats'),
    });
    sleep(1);

    const analyticsRes = makeGraphQLRequest('analytics', { hotelId: HOTEL_ID });
    check(analyticsRes, {
      'analytics status 200': (r) => r.status === 200,
      'analytics contains trends': (r) => r.body.includes('revenueTrend'),
    });
    sleep(1);
  });

  // Group: Housekeeping & Maintenance
  group('Housekeeping & Maintenance', () => {
    let res = makeGraphQLRequest('listHousekeeping', { hotelId: HOTEL_ID });
    check(res, {
      'listHousekeeping status 200': (r) => r.status === 200,
      'listHousekeeping contains rooms': (r) => r.body.includes('housekeepingRooms'),
    });
    sleep(0.5);

    res = makeGraphQLRequest('listMaintenance', { hotelId: HOTEL_ID });
    check(res, {
      'listMaintenance status 200': (r) => r.status === 200,
      'listMaintenance contains issues': (r) => r.body.includes('maintenanceIssues'),
    });
    sleep(0.5);
  });

  // Group: Mutations (Create/Update)
  group('Mutations', () => {
    const createBookingRes = makeGraphQLRequest('createBooking', {
      input: {
        hotelId: HOTEL_ID,
        guestName: 'Load Test Guest',
        guestEmail: `test-${randomInt(1000, 9999)}@example.com`,
        checkInDate: randomDate(30),
        checkOutDate: randomDate(20),
        roomType: 'Deluxe Suite',
        totalAmount: randomInt(300, 2000),
      },
    });
    check(createBookingRes, {
      'createBooking status 200': (r) => r.status === 200,
      'createBooking contains id': (r) => r.body.includes('id'),
    });
    sleep(1);

    const createGuestRes = makeGraphQLRequest('createGuest', {
      input: {
        hotelId: HOTEL_ID,
        name: 'Load Test Guest',
        email: `guest-${randomInt(1000, 9999)}@example.com`,
        phone: `+91 ${randomInt(6000000000, 9999999999)}`,
      },
    });
    check(createGuestRes, {
      'createGuest status 200': (r) => r.status === 200,
      'createGuest contains id': (r) => r.body.includes('id'),
    });
    sleep(1);
  });

  sleep(2);
}
