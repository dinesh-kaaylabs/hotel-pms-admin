/**
 * Phase-2 Communication Service Abstraction
 * 
 * Abstract service layer for email, SMS, and WhatsApp communication.
 * Provides a unified interface for all communication channels.
 * 
 * Backend implementations:
 * - Email: SMTP or SendGrid
 * - SMS: Twilio or TextLocal
 * - WhatsApp: WhatsApp Business API (Meta)
 */

// ============================================================================
// COMMUNICATION CHANNELS
// ============================================================================

export enum CommunicationChannel {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',
}

// ============================================================================
// COMMUNICATION STATUS
// ============================================================================

export enum CommunicationStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
  READ = 'READ', // WhatsApp only
}

// ============================================================================
// COMMUNICATION REQUEST
// ============================================================================

export interface SendCommunicationRequest {
  channel: CommunicationChannel;
  recipient: string; // Email address or phone number
  templateId?: string;
  subject?: string; // Email only
  body: string;
  variables?: Record<string, string>; // Template variables
  metadata?: Record<string, any>; // Additional metadata
}

// ============================================================================
// COMMUNICATION RESPONSE
// ============================================================================

export interface CommunicationResponse {
  success: boolean;
  message?: string;
  communicationLogId?: string;
  status?: CommunicationStatus;
  error?: string;
}

// ============================================================================
// COMMUNICATION SERVICE INTERFACE
// ============================================================================

/**
 * Communication Service Interface
 * 
 * Abstract interface for communication services.
 * Backend implementations will provide concrete implementations.
 */
export interface ICommunicationService {
  /**
   * Send a communication (email, SMS, or WhatsApp)
   * @param request Communication request
   * @returns Communication response
   */
  send(request: SendCommunicationRequest): Promise<CommunicationResponse>;

  /**
   * Send a test communication
   * @param request Communication request
   * @returns Communication response
   */
  sendTest(request: SendCommunicationRequest): Promise<CommunicationResponse>;

  /**
   * Check if a channel is configured and available
   * @param channel Communication channel
   * @returns true if configured, false otherwise
   */
  isChannelConfigured(channel: CommunicationChannel): Promise<boolean>;
}

// ============================================================================
// COMMUNICATION SERVICE IMPLEMENTATION
// ============================================================================

/**
 * Communication Service
 * 
 * Frontend service layer that calls backend API.
 * Backend handles actual communication sending.
 */
export class CommunicationService implements ICommunicationService {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || '/api/phase2/communication';
  }

  async send(request: SendCommunicationRequest): Promise<CommunicationResponse> {
    try {
      // Backend API call would go here
      // For now, return mock response
      // TODO: Implement actual API call to backend
      
      return {
        success: true,
        message: 'Communication queued',
        communicationLogId: `comm_${Date.now()}`,
        status: CommunicationStatus.PENDING,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        status: CommunicationStatus.FAILED,
      };
    }
  }

  async sendTest(request: SendCommunicationRequest): Promise<CommunicationResponse> {
    // Test communications bypass queue and send immediately
    return this.send(request);
  }

  async isChannelConfigured(channel: CommunicationChannel): Promise<boolean> {
    try {
      // Backend API call to check configuration
      // TODO: Implement actual API call
      return false; // Default: not configured
    } catch (error) {
      return false;
    }
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const communicationService = new CommunicationService();
