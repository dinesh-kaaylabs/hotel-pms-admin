/**
 * Phase-2 SMS Service
 * 
 * SMS-specific service abstraction.
 * Supports Twilio and TextLocal providers.
 */

import {
  CommunicationChannel,
  CommunicationService,
  ICommunicationService,
  SendCommunicationRequest,
  CommunicationResponse,
} from './CommunicationService';

// ============================================================================
// SMS PROVIDER TYPES
// ============================================================================

export enum SmsProvider {
  TWILIO = 'TWILIO',
  TEXTLOCAL = 'TEXTLOCAL',
}

// ============================================================================
// SMS SERVICE
// ============================================================================

/**
 * SMS Service
 * 
 * Specialized service for SMS communications.
 */
export class SmsService {
  private communicationService: ICommunicationService;

  constructor(communicationService?: ICommunicationService) {
    this.communicationService = communicationService || new CommunicationService();
  }

  /**
   * Send an SMS
   * @param phoneNumber Phone number (E.164 format)
   * @param message SMS message body
   * @param templateId Optional template ID
   * @param variables Template variables
   * @returns Communication response
   */
  async sendSms(
    phoneNumber: string,
    message: string,
    templateId?: string,
    variables?: Record<string, string>
  ): Promise<CommunicationResponse> {
    const request: SendCommunicationRequest = {
      channel: CommunicationChannel.SMS,
      recipient: phoneNumber,
      body: message,
      templateId,
      variables,
    };

    return this.communicationService.send(request);
  }

  /**
   * Send a test SMS
   */
  async sendTestSms(phoneNumber: string, message: string): Promise<CommunicationResponse> {
    return this.communicationService.sendTest({
      channel: CommunicationChannel.SMS,
      recipient: phoneNumber,
      body: message,
    });
  }

  /**
   * Check if SMS is configured
   */
  async isConfigured(): Promise<boolean> {
    return this.communicationService.isChannelConfigured(CommunicationChannel.SMS);
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const smsService = new SmsService();
