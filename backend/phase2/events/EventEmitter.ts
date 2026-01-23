/**
 * Phase-2 Event Emitter & Listener Framework
 * 
 * This module provides an event-driven architecture for Phase-2 features
 * without modifying Phase-1 code. Events are published when Phase-1 actions
 * complete, and Phase-2 listeners react to these events.
 * 
 * IMPORTANT: This is a frontend service layer that communicates with backend
 * event system. The actual event emission happens on the backend.
 */

// ============================================================================
// EVENT TYPES
// ============================================================================

export enum Phase2EventType {
  // Booking Events
  BOOKING_CONFIRMED = 'BOOKING_CONFIRMED',
  BOOKING_CANCELLED = 'BOOKING_CANCELLED',
  BOOKING_MODIFIED = 'BOOKING_MODIFIED',
  
  // Check-in/Check-out Events
  CHECK_IN_COMPLETED = 'CHECK_IN_COMPLETED',
  CHECK_OUT_COMPLETED = 'CHECK_OUT_COMPLETED',
  
  // Invoice Events
  INVOICE_GENERATED = 'INVOICE_GENERATED',
  INVOICE_SENT = 'INVOICE_SENT',
  
  // Payment Events
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  REFUND_PROCESSED = 'REFUND_PROCESSED',
  
  // Guest Events
  GUEST_CREATED = 'GUEST_CREATED',
  GUEST_UPDATED = 'GUEST_UPDATED',
  
  // Room Events
  ROOM_STATUS_CHANGED = 'ROOM_STATUS_CHANGED',
  
  // User Events
  USER_CREATED = 'USER_CREATED',
  USER_UPDATED = 'USER_UPDATED',
  USER_ROLE_CHANGED = 'USER_ROLE_CHANGED',
}

// ============================================================================
// EVENT PAYLOADS
// ============================================================================

export interface BaseEventPayload {
  timestamp: string;
  hotelId: string;
  userId?: string;
}

export interface BookingConfirmedPayload extends BaseEventPayload {
  bookingId: string;
  guestId: string;
  bookingNumber: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
}

export interface CheckInCompletedPayload extends BaseEventPayload {
  bookingId: string;
  guestId: string;
  roomId: string;
  roomNumber: string;
  checkInDate: string;
}

export interface CheckOutCompletedPayload extends BaseEventPayload {
  bookingId: string;
  guestId: string;
  invoiceId: string;
  invoiceNumber: string;
  totalAmount: number;
  checkOutDate: string;
}

export interface InvoiceGeneratedPayload extends BaseEventPayload {
  invoiceId: string;
  invoiceNumber: string;
  bookingId: string;
  guestId: string;
  totalAmount: number;
  pdfUrl?: string;
}

export interface PaymentReceivedPayload extends BaseEventPayload {
  paymentId: string;
  bookingId: string;
  amount: number;
  method: string;
  transactionId?: string;
}

export interface RefundProcessedPayload extends BaseEventPayload {
  refundId: string;
  bookingId: string;
  amount: number;
  reason: string;
}

export interface GuestCreatedPayload extends BaseEventPayload {
  guestId: string;
  guestName: string;
  guestEmail?: string;
  guestPhone?: string;
}

export interface RoomStatusChangedPayload extends BaseEventPayload {
  roomId: string;
  roomNumber: string;
  oldStatus: string;
  newStatus: string;
}

export interface UserCreatedPayload extends BaseEventPayload {
  userId: string;
  userEmail: string;
  userRole: string;
}

export interface UserRoleChangedPayload extends BaseEventPayload {
  userId: string;
  userEmail: string;
  oldRole: string;
  newRole: string;
  changedBy: string;
}

export type EventPayload =
  | BookingConfirmedPayload
  | CheckInCompletedPayload
  | CheckOutCompletedPayload
  | InvoiceGeneratedPayload
  | PaymentReceivedPayload
  | RefundProcessedPayload
  | GuestCreatedPayload
  | RoomStatusChangedPayload
  | UserCreatedPayload
  | UserRoleChangedPayload;

// ============================================================================
// EVENT LISTENER
// ============================================================================

export type EventListener<T extends EventPayload = EventPayload> = (
  event: Phase2EventType,
  payload: T
) => Promise<void> | void;

export interface EventSubscription {
  eventType: Phase2EventType;
  listener: EventListener;
  id: string;
}

// ============================================================================
// EVENT EMITTER SERVICE
// ============================================================================

/**
 * Event Emitter Service
 * 
 * This service provides a way to subscribe to Phase-2 events.
 * The actual event emission happens on the backend when Phase-1 actions complete.
 * 
 * Frontend uses this to:
 * 1. Subscribe to events (for real-time updates)
 * 2. Trigger Phase-2 actions based on events
 * 
 * Backend integration:
 * - Backend publishes events via WebSocket or Server-Sent Events
 * - Frontend subscribes via this service
 * - Events are feature-flag aware (only emit if Phase-2 enabled)
 */
export class EventEmitterService {
  private subscriptions: Map<Phase2EventType, EventSubscription[]> = new Map();
  private subscriptionIdCounter = 0;

  /**
   * Subscribe to an event type
   * @param eventType The event type to listen to
   * @param listener The callback function
   * @returns Subscription ID (for unsubscribing)
   */
  subscribe<T extends EventPayload>(
    eventType: Phase2EventType,
    listener: EventListener<T>
  ): string {
    const subscriptionId = `sub_${++this.subscriptionIdCounter}`;
    const subscription: EventSubscription = {
      eventType,
      listener: listener as EventListener,
      id: subscriptionId,
    };

    if (!this.subscriptions.has(eventType)) {
      this.subscriptions.set(eventType, []);
    }

    this.subscriptions.get(eventType)!.push(subscription);

    return subscriptionId;
  }

  /**
   * Unsubscribe from an event
   * @param subscriptionId The subscription ID returned from subscribe()
   */
  unsubscribe(subscriptionId: string): void {
    for (const [eventType, subs] of this.subscriptions.entries()) {
      const index = subs.findIndex((s) => s.id === subscriptionId);
      if (index !== -1) {
        subs.splice(index, 1);
        if (subs.length === 0) {
          this.subscriptions.delete(eventType);
        }
        return;
      }
    }
  }

  /**
   * Emit an event (called by backend integration layer)
   * This is typically called when receiving events from backend WebSocket/SSE
   * @param eventType The event type
   * @param payload The event payload
   */
  async emit(eventType: Phase2EventType, payload: EventPayload): Promise<void> {
    const listeners = this.subscriptions.get(eventType) || [];

    // Execute all listeners (non-blocking)
    const promises = listeners.map((sub) => {
      try {
        return Promise.resolve(sub.listener(eventType, payload));
      } catch (error) {
        console.error(`Error in event listener for ${eventType}:`, error);
        return Promise.resolve();
      }
    });

    await Promise.allSettled(promises);
  }

  /**
   * Get all subscriptions for an event type
   */
  getSubscriptions(eventType: Phase2EventType): EventSubscription[] {
    return this.subscriptions.get(eventType) || [];
  }

  /**
   * Clear all subscriptions
   */
  clear(): void {
    this.subscriptions.clear();
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const eventEmitter = new EventEmitterService();
