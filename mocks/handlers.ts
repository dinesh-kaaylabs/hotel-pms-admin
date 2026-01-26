import { graphql, HttpResponse, delay } from 'msw';
import {
  authMockData,
  hotelsMockData,
  bookingsMockData,
  guestsMockData,
  roomsMockData,
  financeMockData,
  housekeepingMockData,
  maintenanceMockData,
  pricingMockData,
  settingsMockData,
  analyticsMockData,
  checkinCheckoutMockData,
  phase2CommunicationMockData,
  phase2AuditMockData,
  phase2ApprovalMockData,
  tenantSubscriptionMockData,
  permissionSystemMockData,
  cancellationPolicyMockData,
  taxConfigurationMockData,
  promotionsRateOverridesMockData,
  channelManagerMockData,
  staffOperationsMockData,
  documentsAttachmentsMockData,
  systemConfigMockData,
  reportsExportMockData
} from './data/mock.data';

// Deterministic counters for mock data (stable across reloads)
let invoiceCounter = 1;
let paymentCounter = 1;
let refundCounter = 1;
let transactionCounter = 1;

/**
 * 🏨 LUXESTAY PMS - ENTERPRISE GRAPHQL HANDLERS (2025–2026)
 * 
 * STRICT ENTERPRISE COMPLIANCE:
 * 1. ZERO REST handlers.
 * 2. Interception by GraphQL Operation Name ONLY.
 * 3. MSW v2 Signature: ({ variables, request, query })
 * 4. ALL data imported from mock.data.ts.
 * 5. NO inline JSON. NO hardcoded responses.
 * 6. Handlers contain ONLY operation interception + minimal conditional logic.
 * 7. Production-ready GraphQL response shapes (data / errors).
 */

export const handlers = [
  // =========================================================================
  // AUTHENTICATION & IDENTITY
  // =========================================================================

  graphql.mutation('AdminLogin', async ({ variables }) => {
    await delay(600);
    const { email, password } = (variables.input as any) || variables;

    if (
      email === authMockData.adminUser.email &&
      password === authMockData.adminUser.password
    ) {
      return HttpResponse.json({
        data: {
          adminLogin: {
            status: 'SUCCESS',
            message: 'Authenticated',
            mfaEnabled: false,
            user: {
              id: authMockData.adminUser.id,
              name: authMockData.adminUser.name,
              hotels: authMockData.adminUser.hotels
            }
          }
        }
      });
    }

    return HttpResponse.json({
      errors: [
        {
          message: 'Invalid credentials',
          extensions: { code: 'BAD_USER_INPUT' }
        }
      ]
    });
  }),

  graphql.query('Me', ({ request }) => {
    const hotelId = request.headers.get('X-Hotel-Id');

    if (!hotelId) {
      return HttpResponse.json({
        errors: [
          {
            message: `Session context lost. ${hotelId}`,
            extensions: { code: 'UNAUTHENTICATED' }
          }
        ]
      });
    }

    return HttpResponse.json({
      data: {
        me: {
          id: authMockData.adminUser.id,
          name: authMockData.adminUser.name,
          email: authMockData.adminUser.email,
          role: authMockData.adminUser.role,
          avatar: authMockData.adminUser.avatar,
          hotelId,
          hotels: authMockData.adminUser.hotels
        }
      }
    });
  }),

  graphql.mutation('Logout', () =>
    HttpResponse.json({
      data: { logout: { success: true } }
    })
  ),

  graphql.mutation('VerifyMFA', async ({ variables }) => {
    await delay(300);

    if (variables.code === authMockData.mfaCode) {
      return HttpResponse.json({
        data: {
          verifyMFA: {
            success: true,
            token: authMockData.mfaToken
          }
        }
      });
    }

    return HttpResponse.json({
      errors: [
        {
          message: 'Invalid MFA code',
          extensions: { code: 'BAD_USER_INPUT' }
        }
      ]
    });
  }),

  // =========================================================================
  // HOTELS & SWITCHER
  // =========================================================================

  graphql.query('Hotels', () =>
    HttpResponse.json({
      data: {
        hotels: hotelsMockData.hotels
      }
    })
  ),

  graphql.mutation('SwitchHotel', ({ variables }) =>
    HttpResponse.json({
      data: {
        switchHotel: {
          success: true,
          hotelId: variables.hotelId
        }
      }
    })
  ),

  // =========================================================================
  // BOOKINGS
  // =========================================================================

  graphql.query('Bookings', ({ variables }) => {
    let filteredBookings = bookingsMockData.bookings;
    console.log('[MSW] Bookings query - variables:', variables, 'total bookings:', filteredBookings.length);

    // Filter by status if provided
    if (variables?.status && variables.status !== 'ALL') {
      filteredBookings = filteredBookings.filter(b => b.status === variables.status);
    }

    // Filter by search term if provided
    if (variables?.search) {
      const searchLower = variables.search.toLowerCase();
      filteredBookings = filteredBookings.filter(b =>
        b.bookingNumber.toLowerCase().includes(searchLower) ||
        b.guestName.toLowerCase().includes(searchLower) ||
        b.roomNumber.toLowerCase().includes(searchLower)
      );
    }

    // Apply pagination
    const page = variables?.page || 1;
    const pageSize = variables?.pageSize || 25;
    const startIndex = (page - 1) * pageSize;
    const paginatedBookings = filteredBookings.slice(startIndex, startIndex + pageSize);
    console.log('[MSW] Bookings response - page:', page, 'pageSize:', pageSize, 'returned:', paginatedBookings.length);

    // Add backend-provided financial fields to each booking
    const bookingsWithFinancialFields = paginatedBookings.map(booking => {
      const paidAmount = booking.paymentStatus === 'PAID' ? booking.totalAmount : 0;
      const outstandingAmount = booking.totalAmount - paidAmount;
      const finalAmount = booking.totalAmount; // Will include additional charges on checkout
      const gstAmount = Math.round(booking.totalAmount * 0.18); // 18% GST (backend calculates)
      
      return {
        ...booking,
        paidAmount,
        outstandingAmount,
        finalAmount,
        gstAmount,
      };
    });

    return HttpResponse.json({
      data: {
        bookings: bookingsWithFinancialFields
      }
    });
  }),

  graphql.query('GetBooking', ({ variables }) => {
    const booking = bookingsMockData.bookings.find(b => b.id === variables.id) || bookingsMockData.bookings[0];
    
    // Backend-provided financial fields (no frontend calculation)
    const paidAmount = booking.paymentStatus === 'PAID' ? booking.totalAmount : 0;
    const outstandingAmount = booking.totalAmount - paidAmount;
    const finalAmount = booking.totalAmount; // Will include additional charges on checkout
    const gstAmount = Math.round(booking.totalAmount * 0.18); // 18% GST (backend calculates)
    
    return HttpResponse.json({
      data: {
        booking: {
          ...booking,
          id: variables.id,
          paidAmount,
          outstandingAmount,
          finalAmount,
          gstAmount,
        }
      }
    });
  }),

  graphql.mutation('UpdateBookingStatus', () =>
    HttpResponse.json({
      data: {
        updateBookingStatus: { success: true }
      }
    })
  ),

  graphql.query('GetBookingInvoice', ({ variables }) => {
    const invoice = bookingsMockData.invoices[0];
    const totalAmount = invoice.amount || 0;
    // Calculate netAmount and taxAmount assuming 18% GST
    const netAmount = Math.round((totalAmount / 1.18) * 100) / 100;
    const taxAmount = Math.round((totalAmount - netAmount) * 100) / 100;
    // Convert issuedAt to issueDate format (YYYY-MM-DD)
    const issueDate = invoice.issuedAt ? invoice.issuedAt.split('T')[0] : new Date().toISOString().split('T')[0];
    
    return HttpResponse.json({
      data: {
        bookingInvoice: {
          invoiceNumber: `INV-${variables.bookingId || 'LS-9901'}`,
          issueDate,
          netAmount,
          taxAmount,
          totalAmount,
          pdfUrl: `/invoices/INV-${variables.bookingId || 'LS-9901'}.pdf`
        }
      }
    });
  }),

  // =========================================================================
  // ROOMS & INVENTORY
  // =========================================================================

  graphql.query('Rooms', () =>
    HttpResponse.json({
      data: {
        rooms: roomsMockData.rooms
      }
    })
  ),

  graphql.mutation('CreateRoom', ({ variables }) =>
    HttpResponse.json({
      data: {
        createRoom: {
          id: `r-new-${Date.now()}`,
          hotelId: 'h-01',
          lastCleanedAt: new Date().toISOString(),
          lastInspectedAt: new Date().toISOString(),
          ...variables.input
        }
      }
    })
  ),

  graphql.mutation('UpdateRoom', ({ variables }) =>
    HttpResponse.json({
      data: {
        updateRoom: {
          id: variables.id,
          hotelId: 'h-01',
          ...variables.input
        }
      }
    })
  ),

  graphql.mutation('DeleteRoom', () =>
    HttpResponse.json({
      data: {
        deleteRoom: { success: true }
      }
    })
  ),

  graphql.mutation('UpdateRoomStatus', () =>
    HttpResponse.json({
      data: {
        updateRoomStatus: { success: true }
      }
    })
  ),

  graphql.query('GetRoomTypes', () =>
    HttpResponse.json({
      data: {
        roomTypes: roomsMockData.roomTypes
      }
    })
  ),

  graphql.mutation('CreateRoomType', ({ variables }) =>
    HttpResponse.json({
      data: {
        createRoomType: {
          id: `rt-new-${Date.now()}`,
          hotelId: 'h-01',
          ...variables.input
        }
      }
    })
  ),

  graphql.mutation('UpdateRoomType', () =>
    HttpResponse.json({
      data: {
        updateRoomType: { success: true }
      }
    })
  ),

  graphql.mutation('DeleteRoomType', () =>
    HttpResponse.json({
      data: {
        deleteRoomType: { success: true }
      }
    })
  ),

  graphql.query('GetRoomInventory', ({ variables }) => {
    const startDate = variables?.startDate;
    const endDate = variables?.endDate;
    const roomTypeId = variables?.roomTypeId;
    
    // Get all room types if no specific roomTypeId is provided
    const roomTypesToUse = roomTypeId 
      ? roomsMockData.roomTypes.filter(rt => rt.id === roomTypeId)
      : roomsMockData.roomTypes;
    
    // Generate inventory for the requested date range
    const generatedInventory: any[] = [];
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      // Generate inventory for each day in the range
      for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        const dateStr = date.toISOString().split('T')[0];
        
        // Check if we have mock data for this date
        const mockDataForDate = roomsMockData.inventory.filter(inv => inv.date === dateStr);
        
        if (mockDataForDate.length > 0) {
          // Use mock data if available
          mockDataForDate.forEach(inv => {
            if (!roomTypeId || inv.roomTypeId === roomTypeId) {
              generatedInventory.push({
                id: inv.id,
                roomTypeId: inv.roomTypeId,
                date: inv.date,
                totalRooms: inv.totalRooms,
                availableRooms: inv.availableRooms
              });
            }
          });
        } else {
          // Generate default inventory for each room type
          roomTypesToUse.forEach(rt => {
            // Use mock data as template or generate defaults
            const template = roomsMockData.inventory.find(inv => inv.roomTypeId === rt.id);
            const totalRooms = template?.totalRooms || 10;
            const availableRooms = template?.availableRooms || Math.floor(totalRooms * 0.7);
            
            generatedInventory.push({
              id: `inv-${rt.id}-${dateStr}`,
              roomTypeId: rt.id,
              date: dateStr,
              totalRooms,
              availableRooms
            });
          });
        }
      }
    } else {
      // If no date range provided, return all mock data
      generatedInventory.push(...roomsMockData.inventory);
    }
    
    // Enrich inventory with status based on availability
    const enrichedInventory = generatedInventory.map(inv => {
      let status: 'AVAILABLE' | 'BOOKED' | 'BLOCKED' = 'AVAILABLE';
      
      if (inv.availableRooms === 0) {
        status = 'BLOCKED';
      } else if (inv.availableRooms < inv.totalRooms * 0.2) {
        status = 'BOOKED'; // Less than 20% available
      }
      
      return {
        id: inv.id,
        roomTypeId: inv.roomTypeId,
        date: inv.date,
        totalRooms: inv.totalRooms,
        availableRooms: inv.availableRooms,
        status
      };
    });
    
    return HttpResponse.json({
      data: {
        roomInventory: enrichedInventory
      }
    });
  }),

  graphql.query('RoomInventoryAdvancedFilters', ({ variables }) => {
    const filters = variables?.filters || {};
    const startDate = filters.startDate;
    const endDate = filters.endDate;
    const roomTypeId = filters.roomTypeId;
    
    // Get all room types if no specific roomTypeId is provided
    const roomTypesToUse = roomTypeId 
      ? roomsMockData.roomTypes.filter(rt => rt.id === roomTypeId)
      : roomsMockData.roomTypes;
    
    // Generate inventory for the requested date range
    const generatedInventory: any[] = [];
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      // Generate inventory for each day in the range
      for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        const dateStr = date.toISOString().split('T')[0];
        
        // Check if we have mock data for this date
        const mockDataForDate = roomsMockData.inventory.filter(inv => inv.date === dateStr);
        
        if (mockDataForDate.length > 0) {
          // Use mock data if available
          mockDataForDate.forEach(inv => {
            if (!roomTypeId || inv.roomTypeId === roomTypeId) {
              generatedInventory.push({
                id: inv.id,
                roomTypeId: inv.roomTypeId,
                date: inv.date,
                totalRooms: inv.totalRooms,
                availableRooms: inv.availableRooms
              });
            }
          });
        } else {
          // Generate default inventory for each room type
          roomTypesToUse.forEach(rt => {
            // Use mock data as template or generate defaults
            const template = roomsMockData.inventory.find(inv => inv.roomTypeId === rt.id);
            const totalRooms = template?.totalRooms || 10;
            const availableRooms = template?.availableRooms || Math.floor(totalRooms * 0.7);
            
            generatedInventory.push({
              id: `inv-${rt.id}-${dateStr}`,
              roomTypeId: rt.id,
              date: dateStr,
              totalRooms,
              availableRooms
            });
          });
        }
      }
    } else {
      // If no date range provided, return all mock data
      generatedInventory.push(...roomsMockData.inventory);
    }
    
    // Enrich inventory with status based on availability
    let enrichedInventory = generatedInventory.map(inv => {
      let status: 'AVAILABLE' | 'BOOKED' | 'BLOCKED' = 'AVAILABLE';
      
      if (inv.availableRooms === 0) {
        status = 'BLOCKED';
      } else if (inv.availableRooms < inv.totalRooms * 0.2) {
        status = 'BOOKED'; // Less than 20% available
      }
      
      return {
        id: inv.id,
        roomTypeId: inv.roomTypeId,
        date: inv.date,
        totalRooms: inv.totalRooms,
        availableRooms: inv.availableRooms,
        status
      };
    });
    
    // Filter by status if provided
    if (filters.status) {
      enrichedInventory = enrichedInventory.filter(inv => inv.status === filters.status);
    }
    
    // Filter by minimum availability if provided
    if (filters.minAvailability !== undefined && filters.minAvailability !== null) {
      enrichedInventory = enrichedInventory.filter(inv => inv.availableRooms >= filters.minAvailability);
    }
    
    return HttpResponse.json({
      data: {
        roomInventoryAdvanced: enrichedInventory
      }
    });
  }),

  graphql.mutation('BulkUpdateInventory', () =>
    HttpResponse.json({
      data: {
        bulkUpdateInventory: { success: true }
      }
    })
  ),

  // =========================================================================
  // FINANCE & RECONCILIATION
  // =========================================================================

  graphql.query('Invoices', ({ variables }) => {
    // Enrich invoices with bookingNumber and compute GST breakdown
    const enrichedInvoices = financeMockData.invoices.map(inv => {
      const booking = bookingsMockData.bookings.find(b => b.id === inv.bookingId);
      const bookingNumber = booking?.bookingNumber || '';
      
      // Calculate subtotal from totalAmount and taxBreakdown
      const totalTax = (inv.taxBreakdown?.cgst || 0) + (inv.taxBreakdown?.sgst || 0) + (inv.taxBreakdown?.igst || 0);
      const subtotal = inv.totalAmount - totalTax;
      
      // Build GST breakdown object
      const gstRate = totalTax > 0 ? Math.round((totalTax / subtotal) * 100) : 0;
      const gst = {
        cgst: inv.taxBreakdown?.cgst || 0,
        sgst: inv.taxBreakdown?.sgst || 0,
        igst: inv.taxBreakdown?.igst || 0,
        gstRate
      };
      
      return {
        ...inv,
        bookingNumber,
        subtotal,
        gst,
        currency: 'INR',
        pdfUrl: `/invoices/${inv.id}.pdf`
      };
    });
    
    // Apply filters if provided
    let filtered = enrichedInvoices;
    const filters = variables?.filters as any;
    if (filters) {
      if (filters.status) {
        filtered = filtered.filter(inv => inv.status === filters.status);
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(inv => 
          inv.invoiceNumber.toLowerCase().includes(searchLower) ||
          inv.guestName.toLowerCase().includes(searchLower) ||
          inv.bookingNumber.toLowerCase().includes(searchLower)
        );
      }
      if (filters.startDate) {
        filtered = filtered.filter(inv => inv.issuedAt >= filters.startDate);
      }
      if (filters.endDate) {
        filtered = filtered.filter(inv => inv.issuedAt <= filters.endDate);
      }
    }
    
    return HttpResponse.json({
      data: {
        invoices: filtered
      }
    });
  }),

  graphql.query('Payments', ({ variables }) => {
    // Enrich payments with bookingNumber and provider
    const enrichedPayments = financeMockData.payments.map(payment => {
      const booking = bookingsMockData.bookings.find(b => b.id === payment.bookingId);
      const bookingNumber = booking?.bookingNumber || '';
      
      // Map paymentGatewayRef to provider name
      let provider = 'DIRECT';
      if (payment.paymentGatewayRef?.startsWith('rzp_')) provider = 'RAZORPAY';
      else if (payment.paymentGatewayRef?.startsWith('pay_')) provider = 'PAYTM';
      else if (payment.paymentGatewayRef?.startsWith('TXN_')) provider = 'BANK_TRANSFER';
      else if (payment.paymentGatewayRef?.startsWith('CASH_')) provider = 'CASH';
      
      return {
        ...payment,
        bookingNumber,
        provider,
        currency: 'INR'
      };
    });
    
    // Apply filters if provided
    let filtered = enrichedPayments;
    const filters = variables?.filters as any;
    if (filters) {
      if (filters.status) {
        filtered = filtered.filter(p => p.status === filters.status);
      }
      if (filters.method) {
        filtered = filtered.filter(p => p.method === filters.method);
      }
      if (filters.provider) {
        filtered = filtered.filter(p => p.provider === filters.provider);
      }
      if (filters.startDate) {
        filtered = filtered.filter(p => p.createdAt >= filters.startDate);
      }
      if (filters.endDate) {
        filtered = filtered.filter(p => p.createdAt <= filters.endDate);
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(p => 
          p.bookingNumber.toLowerCase().includes(searchLower) ||
          p.paymentGatewayRef?.toLowerCase().includes(searchLower)
        );
      }
    }
    
    return HttpResponse.json({
      data: {
        payments: filtered
      }
    });
  }),

  graphql.query('Settlements', ({ variables }) => {
    // Enrich settlements with computed fields
    const enrichedSettlements = financeMockData.settlements.map(settlement => {
      // Calculate commission and gateway fees (simplified - 5% commission, 2% gateway fee)
      const commission = Math.round(settlement.totalAmount * 0.05);
      const gatewayFee = Math.round(settlement.totalAmount * 0.02);
      const grossAmount = settlement.totalAmount + commission + gatewayFee;
      const netAmount = settlement.totalAmount;
      
      // Determine source based on date pattern (simplified logic)
      const sources: Array<'RAZORPAY' | 'BOOKING_COM' | 'EXPEDIA' | 'DIRECT'> = ['RAZORPAY', 'BOOKING_COM', 'EXPEDIA', 'DIRECT'];
      const sourceIndex = parseInt(settlement.id.split('-')[1]) % sources.length;
      const source = sources[sourceIndex];
      
      return {
        id: settlement.id,
        source,
        referenceId: `REF-${settlement.id}`,
        grossAmount,
        commission,
        gatewayFee,
        netAmount,
        currency: 'INR',
        status: settlement.status,
        expectedAt: settlement.status === 'PENDING' ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() : undefined,
        settledAt: settlement.settledAt || undefined,
        createdAt: settlement.date + 'T00:00:00Z'
      };
    });
    
    // Apply filters if provided
    let filtered = enrichedSettlements;
    const filters = variables?.filters as any;
    if (filters) {
      if (filters.source) {
        filtered = filtered.filter(s => s.source === filters.source);
      }
      if (filters.status) {
        filtered = filtered.filter(s => s.status === filters.status);
      }
      if (filters.startDate) {
        filtered = filtered.filter(s => s.createdAt >= filters.startDate);
      }
      if (filters.endDate) {
        filtered = filtered.filter(s => s.createdAt <= filters.endDate);
      }
    }
    
    return HttpResponse.json({
      data: {
        settlements: filtered
      }
    });
  }),

  graphql.query('SettlementSummary', ({ variables }) => {
    const { startDate, endDate } = variables as any;
    const settlements = financeMockData.settlements.filter(s => {
      if (startDate && s.date < startDate) return false;
      if (endDate && s.date > endDate) return false;
      return true;
    });
    
    const settled = settlements.filter(s => s.status === 'SETTLED');
    const pending = settlements.filter(s => s.status === 'PENDING');
    
    const grossRevenue = settlements.reduce((sum, s) => sum + s.totalAmount, 0);
    const netReceivable = settled.reduce((sum, s) => sum + s.totalAmount, 0);
    const pendingPayout = pending.reduce((sum, s) => sum + s.totalAmount, 0);
    
    return HttpResponse.json({
      data: {
        settlementSummary: {
          grossRevenue,
          netReceivable,
          pendingPayout,
          currency: 'INR'
        }
      }
    });
  }),

  // =========================================================================
  // HOUSEKEEPING
  // =========================================================================

  graphql.query('HousekeepingRooms', () => {
    // Enrich housekeeping rooms with roomType and staff info
    const enrichedRooms = housekeepingMockData.housekeepingRooms.map(hkRoom => {
      const room = roomsMockData.rooms.find(r => r.id === hkRoom.id);
      const roomType = room ? roomsMockData.roomTypes.find(rt => rt.id === room.roomTypeId) : null;
      const staff = settingsMockData.staffUsers.find(s => s.id === hkRoom.assignedTo);
      
      return {
        id: hkRoom.id,
        roomNumber: hkRoom.number,
        roomType: roomType?.name || 'Unknown',
        floor: room?.floor || 1,
        status: hkRoom.status,
        assignedStaff: staff ? { id: staff.id, name: staff.name } : undefined,
        lastCleanedAt: hkRoom.lastCleaned
      };
    });
    
    return HttpResponse.json({
      data: {
        housekeepingRooms: enrichedRooms
      }
    });
  }),

  graphql.query('HousekeepingSummary', () => {
    const summary = housekeepingMockData.housekeepingSummary;
    return HttpResponse.json({
      data: {
        housekeepingSummary: {
          dirty: summary.dirtyRooms,
          clean: summary.cleanRooms,
          inspected: summary.inspectedRooms,
          outOfService: summary.outOfServiceRooms
        }
      }
    });
  }),

  graphql.mutation('UpdateHousekeepingStatus', () =>
    HttpResponse.json({
      data: {
        updateHousekeepingStatus: { success: true }
      }
    })
  ),

  graphql.query('CleaningLogs', ({ variables }) => {
    let logs = housekeepingMockData.cleaningLogs;
    
    // Filter by roomId if provided
    if (variables?.roomId) {
      logs = logs.filter(log => log.roomId === variables.roomId);
    }
    
    // Enrich cleaning logs with staff name
    const enrichedLogs = logs.map(log => {
      const staff = settingsMockData.staffUsers.find(s => s.id === log.cleanedBy);
      return {
        id: log.id,
        roomId: log.roomId,
        staffName: staff?.name || 'Unknown Staff',
        status: log.status,
        note: `Cleaned in ${log.duration} minutes`,
        createdAt: log.cleanedAt
      };
    });
    
    return HttpResponse.json({
      data: {
        cleaningLogs: enrichedLogs
      }
    });
  }),

  // =========================================================================
  // MAINTENANCE
  // =========================================================================

  graphql.query('MaintenanceIssues', ({ variables }) => {
    let issues = maintenanceMockData.maintenanceIssues;
    
    // Filter by status if provided
    if (variables?.status) {
      issues = issues.filter(issue => issue.status === variables.status);
    }
    
    // Enrich maintenance issues with roomNumber and roomType
    const enrichedIssues = issues.map(issue => {
      const room = roomsMockData.rooms.find(r => r.id === issue.roomId);
      const roomType = room ? roomsMockData.roomTypes.find(rt => rt.id === room.roomTypeId) : null;
      
      // Calculate createdAt from slaDeadline (subtract some hours for reporting time)
      const createdAt = issue.slaDeadline ? new Date(new Date(issue.slaDeadline).getTime() - 2 * 60 * 60 * 1000).toISOString() : new Date().toISOString();
      
      return {
        ...issue,
        roomNumber: room?.roomNumber || 'N/A',
        roomType: roomType?.name || 'Unknown',
        reason: issue.description || issue.issueType, // Use description as reason
        blockedFrom: issue.slaDeadline || createdAt, // Use slaDeadline as blockedFrom
        blockedTo: issue.status === 'RESOLVED' ? issue.slaDeadline : undefined,
        createdAt,
        resolvedAt: issue.status === 'RESOLVED' ? issue.slaDeadline : undefined
      };
    });
    
    return HttpResponse.json({
      data: {
        maintenanceIssues: enrichedIssues
      }
    });
  }),

  graphql.mutation('CreateMaintenance', () =>
    HttpResponse.json({
      data: {
        createMaintenance: { success: true }
      }
    })
  ),

  graphql.mutation('ResolveMaintenance', () =>
    HttpResponse.json({
      data: {
        resolveMaintenance: { success: true }
      }
    })
  ),

  // =========================================================================
  // CRM & GUESTS
  // =========================================================================

  graphql.query('Guests', () => {
    // Enrich guests with computed fields from guestStays
    const enrichedGuests = guestsMockData.guests.map(guest => {
      const stays = guestsMockData.guestStays.filter(gs => gs.guestId === guest.id);
      const totalStays = stays.length;
      const lifetimeValue = stays.reduce((sum, stay) => sum + (stay.totalSpent || 0), 0);
      const tags: string[] = [];
      if (guest.isVip) tags.push('VIP');
      // Add BLACKLISTED tag if needed (not in current mock data)
      
      return {
        ...guest,
        tags,
        totalStays,
        lifetimeValue,
        currency: 'INR' // Default currency, could be from hotel settings
      };
    });
    
    return HttpResponse.json({
      data: {
        guests: enrichedGuests
      }
    });
  }),

  graphql.query('GuestProfile', ({ variables }) => {
    const guest = guestsMockData.guests.find(g => g.id === variables.id) || guestsMockData.guests[0];
    const stays = guestsMockData.guestStays.filter(gs => gs.guestId === guest.id);
    const totalStays = stays.length;
    const lifetimeValue = stays.reduce((sum, stay) => sum + (stay.totalSpent || 0), 0);
    const tags: string[] = [];
    if (guest.isVip) tags.push('VIP');
    
    return HttpResponse.json({
      data: {
        guest: {
          ...guest,
          id: variables.id,
          tags,
          totalStays,
          lifetimeValue,
          currency: 'INR'
        }
      }
    });
  }),

  graphql.query('GuestStays', ({ variables }) => {
    let stays = guestsMockData.guestStays;
    
    // Filter by guestId if provided
    if (variables?.guestId) {
      stays = stays.filter(gs => gs.guestId === variables.guestId);
    }
    
    // Enrich stays with booking information for display
    const enrichedStays = stays.map(stay => {
      const booking = bookingsMockData.bookings.find(b => b.guestId === stay.guestId && 
        b.checkInDate === stay.checkInDate && b.checkOutDate === stay.checkOutDate);
      
      return {
        ...stay,
        bookingId: booking?.id,
        bookingNumber: booking?.bookingNumber,
        roomType: booking?.roomType,
        amountPaid: stay.totalSpent,
        status: booking?.status || 'CHECKED_OUT'
      };
    });
    
    return HttpResponse.json({
      data: {
        guestStays: enrichedStays
      }
    });
  }),

  graphql.query('GuestNotes', ({ variables }) => {
    let notes = guestsMockData.guestNotes;
    
    // Filter by guestId if provided
    if (variables?.guestId) {
      notes = notes.filter(gn => gn.guestId === variables.guestId);
    }
    
    return HttpResponse.json({
      data: {
        guestNotes: notes
      }
    });
  }),

  graphql.mutation('AddGuestNote', ({ variables }) =>
    HttpResponse.json({
      data: {
        addGuestNote: {
          ...guestsMockData.newGuestNote,
          guestId: variables.guestId,
          content: variables.content
        }
      }
    })
  ),

  graphql.mutation('CreateGuest', ({ variables }) =>
    HttpResponse.json({
      data: {
        createGuest: {
          id: `g-new-${Date.now()}`,
          ...variables.input
        }
      }
    })
  ),

  graphql.mutation('UpdateGuest', ({ variables }) =>
    HttpResponse.json({
      data: {
        updateGuest: {
          id: variables.id,
          ...variables.input
        }
      }
    })
  ),

  graphql.mutation('DeleteGuest', () =>
    HttpResponse.json({
      data: {
        deleteGuest: { success: true }
      }
    })
  ),

  // =========================================================================
  // ANALYTICS & REPORTING
  // =========================================================================

  graphql.query('GetReportSummary', () =>
    HttpResponse.json({
      data: {
        reportSummary: analyticsMockData.reportSummary
      }
    })
  ),

  graphql.query('DashboardStats', () =>
    HttpResponse.json({
      data: {
        dashboardStats: analyticsMockData.dashboardStats
      }
    })
  ),

  graphql.query('GetRevenueTrend', () =>
    HttpResponse.json({
      data: {
        revenueTrend: analyticsMockData.revenueTrend
      }
    })
  ),

  // =========================================================================
  // SETTINGS & ADMIN
  // =========================================================================

  graphql.query('GetBranding', () =>
    HttpResponse.json({
      data: {
        branding: hotelsMockData.branding
      }
    })
  ),

  graphql.query('GetHotelSettings', () =>
    HttpResponse.json({
      data: {
        hotelSettings: settingsMockData.hotelSettings
      }
    })
  ),

  graphql.query('GetStaffUsers', () =>
    HttpResponse.json({
      data: {
        staffUsers: settingsMockData.staffUsers
      }
    })
  ),

  // =========================================================================
  // PRICING
  // =========================================================================

  graphql.query('GetRatePlans', () => {
    // Enrich rate plans with roomTypeName
    const enrichedRatePlans = pricingMockData.ratePlans.map(plan => {
      // Find a room type for this hotel (simplified - could be more sophisticated)
      const roomType = roomsMockData.roomTypes.find(rt => rt.hotelId === plan.hotelId);
      
      return {
        ...plan,
        roomTypeId: roomType?.id || '',
        roomTypeName: roomType?.name || 'All Rooms',
        status: plan.isActive ? 'ACTIVE' : 'INACTIVE'
        // minNights and maxNights are not in mock data, so they remain undefined
      };
    });
    
    return HttpResponse.json({
      data: {
        ratePlans: enrichedRatePlans
      }
    });
  }),

  graphql.mutation('CreateRatePlan', () =>
    HttpResponse.json({
      data: {
        createRatePlan: pricingMockData.newRatePlan
      }
    })
  ),

  graphql.mutation('UpdateRatePlan', () =>
    HttpResponse.json({
      data: {
        updateRatePlan: { success: true }
      }
    })
  ),

  graphql.query('GetPricingCalendar', ({ variables }) => {
    let calendar = pricingMockData.pricingCalendar;
    
    // Filter by roomTypeId if provided
    if (variables?.roomTypeId) {
      calendar = calendar.filter(p => p.roomTypeId === variables.roomTypeId);
    }
    
    // Filter by date range if provided
    if (variables?.startDate) {
      calendar = calendar.filter(p => p.date >= variables.startDate);
    }
    if (variables?.endDate) {
      calendar = calendar.filter(p => p.date <= variables.endDate);
    }
    
    // Enrich pricing calendar with ratePlanId and availableRooms
    const enrichedCalendar = calendar.map(item => {
      // Get available rooms from inventory
      const inventory = roomsMockData.inventory.find(
        inv => inv.roomTypeId === item.roomTypeId && inv.date === item.date
      );
      
      return {
        id: `pc-${item.date}-${item.roomTypeId}`,
        date: item.date,
        roomTypeId: item.roomTypeId,
        ratePlanId: 'rp-01', // Default rate plan
        basePrice: item.basePrice,
        adjustedPrice: item.adjustedPrice,
        price: item.adjustedPrice, // Use adjustedPrice as the current price
        occupancy: item.occupancy,
        availableRooms: inventory?.availableRooms || 0,
        closed: false
      };
    });
    
    return HttpResponse.json({
      data: {
        pricingCalendar: enrichedCalendar
      }
    });
  }),

  graphql.mutation('BulkUpdatePricing', () =>
    HttpResponse.json({
      data: {
        bulkUpdatePricing: { success: true }
      }
    })
  ),

  // =========================================================================
  // CHECK-IN / CHECK-OUT (Phase 1)
  // =========================================================================

  graphql.query('AvailableRooms', async ({ variables }) => {
    await delay(300);
    const { roomTypeId, checkInDate, checkOutDate } = variables as any;
    
    if (!roomTypeId || !checkInDate || !checkOutDate) {
      return HttpResponse.json({
        errors: [{ message: 'Missing required parameters', extensions: { code: 'BAD_USER_INPUT' } }]
      }, { status: 400 });
    }
    
    // Filter available rooms (deterministic)
    const availableRooms = checkinCheckoutMockData.availableRooms.filter(
      room => room.roomType.id === roomTypeId && room.status === 'AVAILABLE'
    );

    return HttpResponse.json({
      data: {
        availableRooms
      }
    });
  }),

  graphql.mutation('CheckIn', async ({ variables }) => {
    await delay(500);
    const { bookingId, input } = variables as any;
    
    if (!bookingId || !input?.roomId) {
      return HttpResponse.json({
        errors: [{ message: 'Booking ID and room ID are required', extensions: { code: 'BAD_USER_INPUT' } }]
      }, { status: 400 });
    }
    
    // Simulate check-in success
    return HttpResponse.json({
      data: {
        checkIn: {
          ...checkinCheckoutMockData.checkInResponse,
          booking: {
            ...checkinCheckoutMockData.checkInResponse.booking,
            id: bookingId,
            room: {
              ...checkinCheckoutMockData.checkInResponse.booking.room,
              id: input.roomId,
              number: checkinCheckoutMockData.availableRooms.find(r => r.id === input.roomId)?.number || '101',
            },
          },
        },
      },
    });
  }),

  graphql.mutation('CheckOut', async ({ variables }) => {
    await delay(600);
    const { bookingId, input } = variables as any;
    
    if (!bookingId) {
      return HttpResponse.json({
        errors: [{ message: 'Booking ID is required', extensions: { code: 'BAD_USER_INPUT' } }]
      }, { status: 400 });
    }
    
    if (!input?.paymentMethod || input?.paymentAmount === undefined) {
      return HttpResponse.json({
        errors: [{ message: 'Payment method and amount are required', extensions: { code: 'BAD_USER_INPUT' } }]
      }, { status: 400 });
    }
    
    // Backend validates: checkout fails if outstandingAmount > 0 (after payment)
    // For mock: assume paymentAmount covers outstanding balance
    
    // Calculate additional charges total
    const additionalChargesTotal = input.additionalCharges?.reduce((sum: number, charge: any) => sum + charge.amount, 0) || 0;
    
    // Find booking to get base amount
    const booking = bookingsMockData.bookings.find(b => b.id === bookingId) || bookingsMockData.bookings[0];
    const paidAmount = booking.paymentStatus === 'PAID' ? booking.totalAmount : 0;
    const outstandingAmount = booking.totalAmount - paidAmount;
    const finalAmount = outstandingAmount + additionalChargesTotal;
    const gstAmount = Math.round(finalAmount * 0.18); // Backend calculates GST
    
    // Generate invoice number (deterministic, sequential)
    const invoiceNumber = `INV-2025-${String(invoiceCounter++).padStart(5, '0')}`;
    
    // Simulate check-out success
    return HttpResponse.json({
      data: {
        checkOut: {
          ...checkinCheckoutMockData.checkOutResponse,
          booking: {
            ...checkinCheckoutMockData.checkOutResponse.booking,
            id: bookingId,
            outstandingAmount: 0, // Paid after checkout
            paidAmount: booking.totalAmount + additionalChargesTotal,
            finalAmount,
            gstAmount,
          },
          invoice: {
            ...checkinCheckoutMockData.checkOutResponse.invoice,
            invoiceNumber,
          },
        },
      },
    });
  }),

  graphql.mutation('GenerateInvoice', async ({ variables }) => {
    await delay(400);
    const { bookingId } = variables as any;
    
    if (!bookingId) {
      return HttpResponse.json({
        errors: [{ message: 'Booking ID is required', extensions: { code: 'BAD_USER_INPUT' } }]
      }, { status: 400 });
    }
    
    // Generate invoice number (deterministic, sequential)
    const invoiceNumber = `INV-2025-${String(invoiceCounter++).padStart(5, '0')}`;
    
    // Simulate invoice generation
    return HttpResponse.json({
      data: {
        generateInvoice: {
          ...checkinCheckoutMockData.generateInvoiceResponse,
          invoice: {
            ...checkinCheckoutMockData.generateInvoiceResponse.invoice,
            id: `inv-${bookingId}`,
            invoiceNumber,
            booking: {
              ...checkinCheckoutMockData.generateInvoiceResponse.invoice.booking,
              id: bookingId,
            },
          },
        },
      },
    });
  }),

  graphql.mutation('RecordPayment', async ({ variables }) => {
    await delay(300);
    const { input } = variables as any;
    
    if (!input?.bookingId || !input?.amount || !input?.method) {
      return HttpResponse.json({
        errors: [{ message: 'Booking ID, amount, and payment method are required', extensions: { code: 'BAD_USER_INPUT' } }]
      }, { status: 400 });
    }
    
    if (input.amount <= 0) {
      return HttpResponse.json({
        errors: [{ message: 'Payment amount must be positive', extensions: { code: 'BAD_USER_INPUT' } }]
      }, { status: 400 });
    }
    
    // Generate transaction ID if not provided (for card/UPI) - deterministic
    const transactionId = input.transactionId || (input.method !== 'CASH' ? `txn-${String(transactionCounter++).padStart(6, '0')}` : undefined);
    
    // Simulate payment recording
    return HttpResponse.json({
      data: {
        recordPayment: {
          ...checkinCheckoutMockData.recordPaymentResponse,
          payment: {
            ...checkinCheckoutMockData.recordPaymentResponse.payment,
            id: `p-${String(paymentCounter++).padStart(5, '0')}`,
            amount: input.amount,
            method: input.method,
            transactionId,
            timestamp: new Date().toISOString(),
          },
        },
      },
    });
  }),

  graphql.mutation('ProcessRefund', async ({ variables }) => {
    await delay(500);
    const { input } = variables as any;
    
    if (!input?.bookingId || !input?.amount || !input?.reason || !input?.refundMethod) {
      return HttpResponse.json({
        errors: [{ message: 'All refund fields are required', extensions: { code: 'BAD_USER_INPUT' } }]
      }, { status: 400 });
    }
    
    if (input.amount <= 0) {
      return HttpResponse.json({
        errors: [{ message: 'Refund amount must be positive', extensions: { code: 'BAD_USER_INPUT' } }]
      }, { status: 400 });
    }
    
    // Simulate approval workflow (if amount > 5000, requires approval)
    const requiresApproval = input.amount > 5000;
    const status = requiresApproval ? 'PENDING' : 'PROCESSED';
    const approvedBy = requiresApproval ? undefined : 'admin@luxestay.com';
    const processedAt = requiresApproval ? undefined : new Date().toISOString();
    
    // Simulate refund processing
    return HttpResponse.json({
      data: {
        processRefund: {
          ...checkinCheckoutMockData.processRefundResponse,
          refund: {
            ...checkinCheckoutMockData.processRefundResponse.refund,
            id: `ref-${String(refundCounter++).padStart(5, '0')}`,
            amount: input.amount,
            status,
            reason: input.reason,
            approvedBy,
            processedAt,
          },
        },
      },
    });
  }),

  // =========================================================================
  // PHASE-2 WAVE-1: COMMUNICATION AUTOMATION
  // =========================================================================

  graphql.query('CommunicationLogs', async ({ variables, request }) => {
    await delay(300);
    const hotelId = request.headers.get('X-Hotel-Id');
    
    // Check feature flag (mock - would check backend in real implementation)
    if (!phase2CommunicationMockData.featureFlags.COMMUNICATION_LOGS_ENABLED) {
      return HttpResponse.json({
        data: {
          phase2Communication: {
            logs: {
              data: [],
              totalCount: 0,
              page: (variables as any)?.pagination?.page || 1,
              pageSize: (variables as any)?.pagination?.pageSize || 25,
            },
          },
        },
      });
    }

    const { filters, pagination } = variables as any;
    let filteredLogs = [...phase2CommunicationMockData.communicationLogs];

    // Apply filters
    if (filters?.channel) {
      filteredLogs = filteredLogs.filter(log => log.channel === filters.channel);
    }
    if (filters?.status) {
      filteredLogs = filteredLogs.filter(log => log.status === filters.status);
    }
    if (filters?.guestId) {
      filteredLogs = filteredLogs.filter(log => log.guestId === filters.guestId);
    }

    // Apply pagination
    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 25;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedLogs = filteredLogs.slice(start, end);

    return HttpResponse.json({
      data: {
        phase2Communication: {
          logs: {
            data: paginatedLogs,
            totalCount: filteredLogs.length,
            page,
            pageSize,
          },
        },
      },
    });
  }),

  graphql.query('CommunicationTemplates', async ({ variables, request }) => {
    await delay(200);
    
    // Check feature flag
    if (!phase2CommunicationMockData.featureFlags.COMMUNICATION_TEMPLATES_ENABLED) {
      return HttpResponse.json({
        data: {
          phase2Communication: {
            templates: [],
          },
        },
      });
    }

    const { channel } = variables as any;
    let templates = [...phase2CommunicationMockData.templates];

    if (channel) {
      templates = templates.filter(t => t.channel === channel);
    }

    return HttpResponse.json({
      data: {
        phase2Communication: {
          templates,
        },
      },
    });
  }),

  graphql.query('CommunicationTriggers', async ({ request }) => {
    await delay(200);
    
    // Check feature flag
    if (!phase2CommunicationMockData.featureFlags.COMMUNICATION_AUTOMATION_ENABLED) {
      return HttpResponse.json({
        data: {
          phase2Communication: {
            triggers: [],
          },
        },
      });
    }

    return HttpResponse.json({
      data: {
        phase2Communication: {
          triggers: phase2CommunicationMockData.triggers,
        },
      },
    });
  }),

  graphql.mutation('SendTestCommunication', async ({ variables }) => {
    await delay(500);
    
    const { input } = variables as any;
    
    // Check feature flag based on channel
    const channelFlag = input.channel === 'EMAIL' 
      ? phase2CommunicationMockData.featureFlags.COMMUNICATION_EMAIL_ENABLED
      : input.channel === 'SMS'
      ? phase2CommunicationMockData.featureFlags.COMMUNICATION_SMS_ENABLED
      : phase2CommunicationMockData.featureFlags.COMMUNICATION_WHATSAPP_ENABLED;

    if (!channelFlag) {
      return HttpResponse.json({
        errors: [{ message: 'Communication channel is disabled', extensions: { code: 'FEATURE_DISABLED' } }],
      });
    }

    const log = {
      id: 'comm-test-001',
      recipient: input.recipient,
      channel: input.channel,
      template: phase2CommunicationMockData.templates.find(t => t.id === input.templateId),
      status: 'SENT' as const,
      sentAt: '2025-05-20T10:00:00Z',
      deliveredAt: undefined,
      error: undefined,
      retryCount: 0,
    };

    return HttpResponse.json({
      data: {
        phase2Communication: {
          sendTest: {
            success: true,
            message: 'Test communication sent',
            communicationLog: log,
          },
        },
      },
    });
  }),

  graphql.mutation('CreateCommunicationTemplate', async ({ variables }) => {
    await delay(400);
    
    // Check feature flag
    if (!phase2CommunicationMockData.featureFlags.COMMUNICATION_TEMPLATES_ENABLED) {
      return HttpResponse.json({
        errors: [{ message: 'Template management is disabled', extensions: { code: 'FEATURE_DISABLED' } }],
      });
    }

    const { input } = variables as any;
    const newTemplate = {
      id: `tpl-${phase2CommunicationMockData.templates.length + 1}`,
      name: input.name,
      category: input.category,
      channel: input.channel,
      subject: input.subject,
      body: input.body,
      variables: input.variables,
      isActive: true,
      createdAt: '2025-05-20T10:00:00Z',
      updatedAt: '2025-05-20T10:00:00Z',
    };

    return HttpResponse.json({
      data: {
        phase2Communication: {
          createTemplate: {
            success: true,
            message: 'Template created successfully',
            template: newTemplate,
          },
        },
      },
    });
  }),

  graphql.mutation('UpdateCommunicationTemplate', async ({ variables }) => {
    await delay(400);
    
    // Check feature flag
    if (!phase2CommunicationMockData.featureFlags.COMMUNICATION_TEMPLATES_ENABLED) {
      return HttpResponse.json({
        errors: [{ message: 'Template management is disabled', extensions: { code: 'FEATURE_DISABLED' } }],
      });
    }

    const { templateId, input } = variables as any;
    const template = phase2CommunicationMockData.templates.find(t => t.id === templateId);
    
    if (!template) {
      return HttpResponse.json({
        errors: [{ message: 'Template not found', extensions: { code: 'NOT_FOUND' } }],
      });
    }

    const updatedTemplate = {
      ...template,
      ...input,
      updatedAt: '2025-05-20T10:00:00Z',
    };

    return HttpResponse.json({
      data: {
        phase2Communication: {
          updateTemplate: {
            success: true,
            message: 'Template updated successfully',
            template: updatedTemplate,
          },
        },
      },
    });
  }),

  graphql.mutation('ConfigureCommunicationTrigger', async ({ variables }) => {
    await delay(300);
    
    // Check feature flag
    if (!phase2CommunicationMockData.featureFlags.COMMUNICATION_AUTOMATION_ENABLED) {
      return HttpResponse.json({
        errors: [{ message: 'Communication automation is disabled', extensions: { code: 'FEATURE_DISABLED' } }],
      });
    }

    const { input } = variables as any;
    const newTrigger = {
      id: `trig-${phase2CommunicationMockData.triggers.length + 1}`,
      event: input.event,
      templateId: input.templateId,
      template: phase2CommunicationMockData.templates.find(t => t.id === input.templateId),
      channel: input.channel,
      isEnabled: input.isEnabled,
      conditions: input.conditions,
    };

    return HttpResponse.json({
      data: {
        phase2Communication: {
          configureTrigger: {
            success: true,
            message: 'Trigger configured successfully',
            trigger: newTrigger,
          },
        },
      },
    });
  }),

  graphql.mutation('ResendCommunication', async ({ variables }) => {
    await delay(500);
    
    const { communicationLogId } = variables as any;
    const log = phase2CommunicationMockData.communicationLogs.find(l => l.id === communicationLogId);
    
    if (!log) {
      return HttpResponse.json({
        errors: [{ message: 'Communication log not found', extensions: { code: 'NOT_FOUND' } }],
      });
    }

    if (log.status !== 'FAILED') {
      return HttpResponse.json({
        errors: [{ message: 'Can only resend failed communications', extensions: { code: 'BAD_USER_INPUT' } }],
      });
    }

    const updatedLog = {
      ...log,
      status: 'PENDING' as const,
    };

    return HttpResponse.json({
      data: {
        phase2Communication: {
          resend: {
            success: true,
            message: 'Communication queued for resend',
            communicationLog: updatedLog,
          },
        },
      },
    });
  }),

  // =========================================================================
  // PHASE-2 WAVE-1: AUDIT LOGS
  // =========================================================================

  graphql.query('AuditLogs', async ({ variables, request }) => {
    await delay(300);
    const hotelId = request.headers.get('X-Hotel-Id');
    
    // Check feature flag
    if (!phase2AuditMockData.featureFlags.AUDIT_LOGS_ENABLED) {
      return HttpResponse.json({
        data: {
          phase2Audit: {
            logs: {
              data: [],
              totalCount: 0,
              page: (variables as any)?.pagination?.page || 1,
              pageSize: (variables as any)?.pagination?.pageSize || 25,
            },
          },
        },
      });
    }

    const { filters, pagination } = variables as any;
    let filteredLogs = [...phase2AuditMockData.auditLogs];

    // Filter by hotel
    if (hotelId) {
      filteredLogs = filteredLogs.filter(log => log.hotelId === hotelId);
    }

    // Apply filters
    if (filters?.action) {
      filteredLogs = filteredLogs.filter(log => log.action === filters.action);
    }
    if (filters?.userId) {
      filteredLogs = filteredLogs.filter(log => log.userId === filters.userId);
    }
    if (filters?.entity) {
      filteredLogs = filteredLogs.filter(log => log.entity.includes(filters.entity));
    }
    if (filters?.dateFrom) {
      filteredLogs = filteredLogs.filter(log => log.timestamp >= filters.dateFrom);
    }
    if (filters?.dateTo) {
      filteredLogs = filteredLogs.filter(log => log.timestamp <= filters.dateTo);
    }

    // Apply pagination
    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 25;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedLogs = filteredLogs.slice(start, end);

    return HttpResponse.json({
      data: {
        phase2Audit: {
          logs: {
            data: paginatedLogs,
            totalCount: filteredLogs.length,
            page,
            pageSize,
          },
        },
      },
    });
  }),

  graphql.query('AuditLogDetail', async ({ variables, request }) => {
    await delay(200);
    
    // Check feature flag
    if (!phase2AuditMockData.featureFlags.AUDIT_LOGS_ENABLED) {
      return HttpResponse.json({
        errors: [{ message: 'Audit logs feature is disabled', extensions: { code: 'FEATURE_DISABLED' } }],
      });
    }

    const { auditLogId } = variables as any;
    const log = phase2AuditMockData.auditLogs.find(l => l.id === auditLogId);
    
    if (!log) {
      return HttpResponse.json({
        errors: [{ message: 'Audit log not found', extensions: { code: 'NOT_FOUND' } }],
      });
    }

    // Compute diff from before/after objects
    const diff: Record<string, any> = {};
    if (log.before && log.after) {
      for (const key in log.after) {
        if (log.before[key] !== log.after[key]) {
          diff[key] = {
            before: log.before[key],
            after: log.after[key],
          };
        }
      }
    }

    return HttpResponse.json({
      data: {
        phase2Audit: {
          logDetail: {
            ...log,
            diff,
          },
        },
      },
    });
  }),

  graphql.query('UserActivityLogs', async ({ variables, request }) => {
    await delay(200);
    
    // Check feature flag
    if (!phase2AuditMockData.featureFlags.AUDIT_LOGS_ENABLED) {
      return HttpResponse.json({
        data: {
          phase2Audit: {
            userActivity: {
              userId: null,
              totalActions: 0,
              lastActive: null,
              topActions: [],
            },
          },
        },
      });
    }

    const { userId, filters } = variables as any;
    const activity = { ...phase2AuditMockData.userActivity };

    // Return activity summary (no date filtering needed as it's aggregate data)
    return HttpResponse.json({
      data: {
        phase2Audit: {
          userActivity: activity,
        },
      },
    });
  }),

  // =========================================================================
  // PHASE-2 WAVE-1: APPROVAL WORKFLOWS
  // =========================================================================

  graphql.query('ApprovalRequests', async ({ variables, request }) => {
    await delay(300);
    const hotelId = request.headers.get('X-Hotel-Id');
    
    // Check feature flag
    if (!phase2ApprovalMockData.featureFlags.APPROVAL_WORKFLOWS_ENABLED) {
      return HttpResponse.json({
        data: {
          phase2Approval: {
            requests: {
              data: [],
              totalCount: 0,
              page: (variables as any)?.pagination?.page || 1,
              pageSize: (variables as any)?.pagination?.pageSize || 25,
            },
          },
        },
      });
    }

    const { filters, pagination } = variables as any;
    let filteredRequests = [...phase2ApprovalMockData.approvalRequests];

    // Filter by hotel
    if (hotelId) {
      filteredRequests = filteredRequests.filter(req => req.hotelId === hotelId);
    }

    // Apply filters
    if (filters?.status) {
      filteredRequests = filteredRequests.filter(req => req.status === filters.status);
    }
    if (filters?.requesterId) {
      filteredRequests = filteredRequests.filter(req => req.requesterId === filters.requesterId);
    }
    if (filters?.type) {
      filteredRequests = filteredRequests.filter(req => req.type === filters.type);
    }
    if (filters?.dateFrom) {
      filteredRequests = filteredRequests.filter(req => req.createdAt >= filters.dateFrom);
    }
    if (filters?.dateTo) {
      filteredRequests = filteredRequests.filter(req => req.createdAt <= filters.dateTo);
    }

    // Apply pagination
    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 25;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedRequests = filteredRequests.slice(start, end);

    return HttpResponse.json({
      data: {
        phase2Approval: {
          requests: {
            data: paginatedRequests,
            totalCount: filteredRequests.length,
            page,
            pageSize,
          },
        },
      },
    });
  }),

  graphql.query('ApprovalChains', async ({ request }) => {
    await delay(200);
    
    // Check feature flag
    if (!phase2ApprovalMockData.featureFlags.APPROVAL_WORKFLOWS_ENABLED) {
      return HttpResponse.json({
        data: {
          phase2Approval: {
            chains: [],
          },
        },
      });
    }

    return HttpResponse.json({
      data: {
        phase2Approval: {
          chains: phase2ApprovalMockData.approvalChains,
        },
      },
    });
  }),

  graphql.mutation('CreateApprovalChain', async ({ variables }) => {
    await delay(400);
    
    // Check feature flag
    if (!phase2ApprovalMockData.featureFlags.APPROVAL_WORKFLOWS_ENABLED) {
      return HttpResponse.json({
        errors: [{ message: 'Approval workflows feature is disabled', extensions: { code: 'FEATURE_DISABLED' } }],
      });
    }

    const { input } = variables as any;
    const newChain = {
      id: `chain-${phase2ApprovalMockData.approvalChains.length + 1}`,
      action: input.action,
      thresholds: input.thresholds,
      isActive: input.isActive,
      createdAt: '2025-05-20T10:00:00Z',
      updatedAt: '2025-05-20T10:00:00Z',
    };

    return HttpResponse.json({
      data: {
        phase2Approval: {
          createChain: {
            success: true,
            message: 'Approval chain created successfully',
            chain: newChain,
          },
        },
      },
    });
  }),

  graphql.mutation('ApproveRequest', async ({ variables }) => {
    await delay(500);
    
    // Check feature flag
    if (!phase2ApprovalMockData.featureFlags.APPROVAL_WORKFLOWS_ENABLED) {
      return HttpResponse.json({
        errors: [{ message: 'Approval workflows feature is disabled', extensions: { code: 'FEATURE_DISABLED' } }],
      });
    }

    const { requestId, comments } = variables as any;
    const request = phase2ApprovalMockData.approvalRequests.find(r => r.id === requestId);
    
    if (!request) {
      return HttpResponse.json({
        errors: [{ message: 'Approval request not found', extensions: { code: 'NOT_FOUND' } }],
      });
    }

    if (request.status !== 'PENDING') {
      return HttpResponse.json({
        errors: [{ message: 'Request is not pending', extensions: { code: 'BAD_USER_INPUT' } }],
      });
    }

    // Simulate approval (mock data doesn't have approvers array, just approverId)
    const updatedRequest = {
      ...request,
      status: 'APPROVED' as const,
      approvedAt: '2025-05-20T14:00:00Z',
    };

    return HttpResponse.json({
      data: {
        phase2Approval: {
          approve: {
            success: true,
            message: 'Request approved and action executed',
            request: updatedRequest,
          },
        },
      },
    });
  }),

  graphql.mutation('RejectRequest', async ({ variables }) => {
    await delay(400);
    
    // Check feature flag
    if (!phase2ApprovalMockData.featureFlags.APPROVAL_WORKFLOWS_ENABLED) {
      return HttpResponse.json({
        errors: [{ message: 'Approval workflows feature is disabled', extensions: { code: 'FEATURE_DISABLED' } }],
      });
    }

    const { requestId, comments } = variables as any;
    const request = phase2ApprovalMockData.approvalRequests.find(r => r.id === requestId);
    
    if (!request) {
      return HttpResponse.json({
        errors: [{ message: 'Approval request not found', extensions: { code: 'NOT_FOUND' } }],
      });
    }

    if (request.status !== 'PENDING') {
      return HttpResponse.json({
        errors: [{ message: 'Request is not pending', extensions: { code: 'BAD_USER_INPUT' } }],
      });
    }

    if (!comments) {
      return HttpResponse.json({
        errors: [{ message: 'Rejection comments are required', extensions: { code: 'BAD_USER_INPUT' } }],
      });
    }

    const updatedRequest = {
      ...request,
      status: 'REJECTED' as const,
      comments,
    };

    return HttpResponse.json({
      data: {
        phase2Approval: {
          reject: {
            success: true,
            message: 'Request rejected',
            request: updatedRequest,
          },
        },
      },
    });
  }),

  // =========================================================================
  // TENANT & SUBSCRIPTION
  // =========================================================================

  graphql.query('GetTenantInfo', async ({ request }) => {
    await delay(200);
    const tenantId = request.headers.get('X-Tenant-Id') || 't-1';
    const tenant = tenantSubscriptionMockData.tenants.find(t => t.id === tenantId) || tenantSubscriptionMockData.tenants[0];
    
    return HttpResponse.json({
      data: {
        tenant,
      },
    });
  }),

  graphql.query('GetSubscriptionInfo', async ({ request }) => {
    await delay(200);
    const tenantId = request.headers.get('X-Tenant-Id') || 't-1';
    const subscription = tenantSubscriptionMockData.subscriptions.find(s => s.tenantId === tenantId);
    const plan = subscription ? tenantSubscriptionMockData.plans.find(p => p.id === subscription.planId) : null;
    
    return HttpResponse.json({
      data: {
        subscription: subscription ? { ...subscription, plan } : null,
      },
    });
  }),

  graphql.query('GetFeatureEntitlements', async ({ request }) => {
    await delay(200);
    const tenantId = request.headers.get('X-Tenant-Id') || 't-1';
    const entitlements = tenantSubscriptionMockData.featureEntitlements.filter(e => e.tenantId === tenantId);
    
    return HttpResponse.json({
      data: {
        featureEntitlements: entitlements,
      },
    });
  }),

  graphql.query('GetBillingHistory', async ({ request }) => {
    await delay(200);
    const tenantId = request.headers.get('X-Tenant-Id') || 't-1';
    const history = tenantSubscriptionMockData.billingHistory.filter(b => b.tenantId === tenantId);
    
    return HttpResponse.json({
      data: {
        billingHistory: history,
      },
    });
  }),

  graphql.query('GetAllPlans', async () => {
    await delay(200);
    return HttpResponse.json({
      data: {
        plans: tenantSubscriptionMockData.plans,
      },
    });
  }),

  graphql.query('GetAllTenants', async () => {
    await delay(200);
    return HttpResponse.json({
      data: {
        tenants: tenantSubscriptionMockData.tenants,
      },
    });
  }),

  graphql.query('GetAllSubscriptions', async () => {
    await delay(200);
    return HttpResponse.json({
      data: {
        subscriptions: tenantSubscriptionMockData.subscriptions,
      },
    });
  }),

  graphql.query('GetAllFeatureFlags', async () => {
    await delay(200);
    return HttpResponse.json({
      data: {
        featureFlags: tenantSubscriptionMockData.featureFlags,
      },
    });
  }),

  // =========================================================================
  // PERMISSION SYSTEM
  // =========================================================================

  graphql.query('GetPermissions', async () => {
    await delay(200);
    return HttpResponse.json({
      data: {
        permissions: permissionSystemMockData.permissions,
      },
    });
  }),

  graphql.query('GetRolePermissions', async ({ variables }) => {
    await delay(200);
    const { roleId } = variables as any;
    const rolePerms = permissionSystemMockData.rolePermissions.find(rp => rp.roleId === roleId);
    
    return HttpResponse.json({
      data: {
        rolePermissions: rolePerms || { roleId, permissions: [] },
      },
    });
  }),

  graphql.query('GetUserPermissionOverrides', async ({ variables }) => {
    await delay(200);
    const { userId } = variables as any;
    const overrides = permissionSystemMockData.userPermissionOverrides.filter(o => o.userId === userId);
    
    return HttpResponse.json({
      data: {
        userPermissionOverrides: overrides,
      },
    });
  }),

  // =========================================================================
  // CANCELLATION / NO-SHOW / REFUND POLICIES
  // =========================================================================

  graphql.query('GetCancellationPolicies', async ({ request }) => {
    await delay(200);
    const hotelId = request.headers.get('X-Hotel-Id');
    const policies = cancellationPolicyMockData.cancellationPolicies.filter(p => !hotelId || p.hotelId === hotelId);
    
    return HttpResponse.json({
      data: {
        cancellationPolicies: policies,
      },
    });
  }),

  graphql.query('GetNoShowPolicies', async ({ request }) => {
    await delay(200);
    const hotelId = request.headers.get('X-Hotel-Id');
    const policies = cancellationPolicyMockData.noShowPolicies.filter(p => !hotelId || p.hotelId === hotelId);
    
    return HttpResponse.json({
      data: {
        noShowPolicies: policies,
      },
    });
  }),

  graphql.query('GetRefundRules', async ({ request }) => {
    await delay(200);
    const hotelId = request.headers.get('X-Hotel-Id');
    const rules = cancellationPolicyMockData.refundRules.filter(r => !hotelId || r.hotelId === hotelId);
    
    return HttpResponse.json({
      data: {
        refundRules: rules,
      },
    });
  }),

  graphql.query('CalculateRefund', async ({ variables }) => {
    await delay(300);
    const { bookingId } = variables as any;
    const calculation = cancellationPolicyMockData.refundCalculations.find(c => c.bookingId === bookingId);
    
    return HttpResponse.json({
      data: {
        refundCalculation: calculation || null,
      },
    });
  }),

  // =========================================================================
  // TAX CONFIGURATION
  // =========================================================================

  graphql.query('GetTaxRules', async ({ request }) => {
    await delay(200);
    const hotelId = request.headers.get('X-Hotel-Id');
    const rules = taxConfigurationMockData.taxRules.filter(r => !hotelId || r.hotelId === hotelId);
    
    return HttpResponse.json({
      data: {
        taxRules: rules,
      },
    });
  }),

  graphql.query('GetHSNCodes', async () => {
    await delay(200);
    return HttpResponse.json({
      data: {
        hsnCodes: taxConfigurationMockData.hsnCodes,
      },
    });
  }),

  graphql.query('GetGSTConfiguration', async ({ request }) => {
    await delay(200);
    const hotelId = request.headers.get('X-Hotel-Id');
    const config = taxConfigurationMockData.gstConfiguration.find(c => c.hotelId === hotelId);
    
    return HttpResponse.json({
      data: {
        gstConfiguration: config || null,
      },
    });
  }),

  // =========================================================================
  // PROMOTIONS & RATE OVERRIDES
  // =========================================================================

  graphql.query('GetPromoCodes', async ({ request }) => {
    await delay(200);
    const hotelId = request.headers.get('X-Hotel-Id');
    const promoCodes = promotionsRateOverridesMockData.promoCodes.filter(p => !hotelId || p.hotelId === hotelId);
    
    return HttpResponse.json({
      data: {
        promoCodes,
      },
    });
  }),

  graphql.query('ValidatePromoCode', async ({ variables }) => {
    await delay(300);
    const { code, hotelId } = variables as any;
    const promo = promotionsRateOverridesMockData.promoCodes.find(p => p.code === code && p.hotelId === hotelId && p.isActive);
    
    return HttpResponse.json({
      data: {
        promoCode: promo || null,
        valid: !!promo,
      },
    });
  }),

  graphql.query('GetSeasonalPricing', async ({ request }) => {
    await delay(200);
    const hotelId = request.headers.get('X-Hotel-Id');
    const seasonal = promotionsRateOverridesMockData.seasonalPricing.filter(s => !hotelId || s.hotelId === hotelId);
    
    return HttpResponse.json({
      data: {
        seasonalPricing: seasonal,
      },
    });
  }),

  graphql.query('GetCorporateRates', async ({ request }) => {
    await delay(200);
    const hotelId = request.headers.get('X-Hotel-Id');
    const rates = promotionsRateOverridesMockData.corporateRates.filter(r => !hotelId || r.hotelId === hotelId);
    
    return HttpResponse.json({
      data: {
        corporateRates: rates,
      },
    });
  }),

  graphql.query('GetBlackoutDates', async ({ request }) => {
    await delay(200);
    const hotelId = request.headers.get('X-Hotel-Id');
    const dates = promotionsRateOverridesMockData.blackoutDates.filter(d => !hotelId || d.hotelId === hotelId);
    
    return HttpResponse.json({
      data: {
        blackoutDates: dates,
      },
    });
  }),

  // =========================================================================
  // CHANNEL MANAGER / OTA INTEGRATION
  // =========================================================================

  graphql.query('GetOTAConnections', async ({ request }) => {
    await delay(200);
    const hotelId = request.headers.get('X-Hotel-Id');
    const connections = channelManagerMockData.otaConnections.filter(c => !hotelId || c.hotelId === hotelId);
    
    return HttpResponse.json({
      data: {
        otaConnections: connections,
      },
    });
  }),

  graphql.query('GetSyncLogs', async ({ request, variables }) => {
    await delay(200);
    const hotelId = request.headers.get('X-Hotel-Id');
    const { otaName, limit } = variables as any;
    let logs = channelManagerMockData.syncLogs.filter(l => !hotelId || l.hotelId === hotelId);
    
    if (otaName) {
      logs = logs.filter(l => l.otaName === otaName);
    }
    
    if (limit) {
      logs = logs.slice(0, limit);
    }
    
    return HttpResponse.json({
      data: {
        syncLogs: logs,
      },
    });
  }),

  graphql.query('GetConflictResolution', async ({ request }) => {
    await delay(200);
    const hotelId = request.headers.get('X-Hotel-Id');
    const conflicts = channelManagerMockData.conflictResolution.filter(c => !hotelId || c.hotelId === hotelId);
    
    return HttpResponse.json({
      data: {
        conflicts,
      },
    });
  }),

  graphql.query('GetRoomMapping', async ({ request, variables }) => {
    await delay(200);
    const hotelId = request.headers.get('X-Hotel-Id');
    const { otaName } = variables as any;
    let mappings = channelManagerMockData.roomMapping.filter(m => !hotelId || m.hotelId === hotelId);
    
    if (otaName) {
      mappings = mappings.filter(m => m.otaName === otaName);
    }
    
    return HttpResponse.json({
      data: {
        roomMapping: mappings,
      },
    });
  }),

  // =========================================================================
  // STAFF OPERATIONS
  // =========================================================================

  graphql.query('GetShifts', async ({ request, variables }) => {
    await delay(200);
    const hotelId = request.headers.get('X-Hotel-Id');
    const { dateFrom, dateTo, userId } = variables as any;
    let shifts = staffOperationsMockData.shifts.filter(s => !hotelId || s.hotelId === hotelId);
    
    if (userId) {
      shifts = shifts.filter(s => s.userId === userId);
    }
    
    return HttpResponse.json({
      data: {
        shifts,
      },
    });
  }),

  graphql.query('GetTaskAssignments', async ({ request, variables }) => {
    await delay(200);
    const hotelId = request.headers.get('X-Hotel-Id');
    const { status, assignedTo } = variables as any;
    let tasks = staffOperationsMockData.taskAssignments.filter(t => !hotelId || t.hotelId === hotelId);
    
    if (status) {
      tasks = tasks.filter(t => t.status === status);
    }
    
    if (assignedTo) {
      tasks = tasks.filter(t => t.assignedTo === assignedTo);
    }
    
    return HttpResponse.json({
      data: {
        taskAssignments: tasks,
      },
    });
  }),

  graphql.query('GetTaskTemplates', async () => {
    await delay(200);
    return HttpResponse.json({
      data: {
        taskTemplates: staffOperationsMockData.taskTemplates,
      },
    });
  }),

  graphql.mutation('UpdateTaskStatus', async ({ variables }) => {
    await delay(300);
    const { taskId, status } = variables as any;
    
    return HttpResponse.json({
      data: {
        updateTaskStatus: {
          success: true,
          message: 'Task status updated',
          taskId,
          status,
        },
      },
    });
  }),

  // =========================================================================
  // DOCUMENTS & ATTACHMENTS
  // =========================================================================

  graphql.query('GetGuestDocuments', async ({ variables }) => {
    await delay(200);
    const { guestId } = variables as any;
    let documents = documentsAttachmentsMockData.guestDocuments;
    
    if (guestId) {
      documents = documents.filter(d => d.guestId === guestId);
    }
    
    return HttpResponse.json({
      data: {
        guestDocuments: documents,
      },
    });
  }),

  graphql.query('GetBookingAttachments', async ({ variables }) => {
    await delay(200);
    const { bookingId } = variables as any;
    const attachments = documentsAttachmentsMockData.bookingAttachments.filter(a => a.bookingId === bookingId);
    
    return HttpResponse.json({
      data: {
        bookingAttachments: attachments,
      },
    });
  }),

  graphql.query('GetInvoiceDocuments', async ({ variables }) => {
    await delay(200);
    const { invoiceId } = variables as any;
    const documents = documentsAttachmentsMockData.invoiceAttachments.filter(d => d.invoiceId === invoiceId);
    
    return HttpResponse.json({
      data: {
        invoiceDocuments: documents,
      },
    });
  }),

  graphql.query('GetDocumentCategories', async () => {
    await delay(200);
    // Return standard document categories
    const categories = [
      { id: 'cat-01', name: 'Guest ID Proof', types: ['AADHAAR', 'PASSPORT', 'DRIVING_LICENSE'] },
      { id: 'cat-02', name: 'Booking Documents', types: ['CONFIRMATION_EMAIL', 'CORPORATE_PO', 'VOUCHER'] },
      { id: 'cat-03', name: 'Financial Documents', types: ['TAX_INVOICE', 'RECEIPT', 'CREDIT_NOTE'] }
    ];
    return HttpResponse.json({
      data: {
        documentCategories: categories,
      },
    });
  }),

  // =========================================================================
  // SYSTEM CONFIG
  // =========================================================================

  graphql.query('GetGlobalSettings', async () => {
    await delay(200);
    return HttpResponse.json({
      data: {
        globalSettings: systemConfigMockData.globalSettings,
      },
    });
  }),

  graphql.query('GetIntegrations', async () => {
    await delay(200);
    return HttpResponse.json({
      data: {
        integrations: systemConfigMockData.integrations,
      },
    });
  }),

  // =========================================================================
  // REPORTS & EXPORT
  // =========================================================================

  graphql.query('GetReportCatalog', async () => {
    await delay(200);
    return HttpResponse.json({
      data: {
        reportCatalog: reportsExportMockData.reportCatalog,
      },
    });
  }),

  graphql.query('GetExportTypes', async () => {
    await delay(200);
    return HttpResponse.json({
      data: {
        exportTypes: reportsExportMockData.exportTypes,
      },
    });
  }),

  graphql.query('GetScheduledReports', async ({ request }) => {
    await delay(200);
    const hotelId = request.headers.get('X-Hotel-Id');
    // Return empty array as scheduled reports are not yet implemented in mock data
    const scheduled: any[] = [];
    
    return HttpResponse.json({
      data: {
        scheduledReports: scheduled,
      },
    });
  }),

  graphql.query('GetReportHistory', async ({ request, variables }) => {
    await delay(200);
    const hotelId = request.headers.get('X-Hotel-Id');
    const { limit } = variables as any;
    let history = reportsExportMockData.reportHistory.filter(h => !hotelId || h.hotelId === hotelId);
    
    if (limit) {
      history = history.slice(0, limit);
    }
    
    return HttpResponse.json({
      data: {
        reportHistory: history,
      },
    });
  }),

  graphql.mutation('GenerateReport', async ({ variables }) => {
    await delay(1000);
    const { reportId, parameters, format } = variables as any;
    const report = reportsExportMockData.reportCatalog.find(r => r.id === reportId);
    
    if (!report) {
      return HttpResponse.json({
        errors: [{ message: 'Report not found', extensions: { code: 'NOT_FOUND' } }],
      });
    }
    
    return HttpResponse.json({
      data: {
        generateReport: {
          success: true,
          message: 'Report generated successfully',
          reportId,
          fileUrl: `/reports/${reportId}-${Date.now()}.${format.toLowerCase()}`,
          fileSize: 350000,
        },
      },
    });
  }),

  graphql.mutation('ExportData', async ({ variables }) => {
    await delay(800);
    const { exportTypeId, filters, format } = variables as any;
    const exportType = reportsExportMockData.exportTypes.find(e => e.id === exportTypeId);
    
    if (!exportType) {
      return HttpResponse.json({
        errors: [{ message: 'Export type not found', extensions: { code: 'NOT_FOUND' } }],
      });
    }
    
    return HttpResponse.json({
      data: {
        exportData: {
          success: true,
          message: 'Data exported successfully',
          exportTypeId,
          fileUrl: `/exports/${exportTypeId}-${Date.now()}.${format.toLowerCase()}`,
          fileSize: 280000,
          recordCount: 150,
        },
      },
    });
  }),

];
