/**
 * Phase-2 WhatsApp Service
 * 
 * WhatsApp-specific service abstraction.
 * Uses WhatsApp Business API (Meta).
 */

import {
  CommunicationChannel,
  CommunicationService,
  ICommunicationService,
  SendCommunicationRequest,
  CommunicationResponse,
} from './CommunicationService';

// ============================================================================
// WHATSAPP SERVICE
// ============================================================================

/**
 * WhatsApp Service
 * 
 * Specialized service for WhatsApp communications.
 * Uses template messages (required by WhatsApp Business API).
 */
export class WhatsAppService {
  private communicationService: ICommunicationService;

  constructor(communicationService?: ICommunicationService) {
    this.communicationService = communicationService || new CommunicationService();
  }

  /**
   * Send a WhatsApp message
   * @param phoneNumber Phone number (E.164 format with country code)
   * @param templateId Template ID (required by WhatsApp Business API)
   * @param variables Template variables
   * @returns Communication response
   */
  async sendWhatsApp(
    phoneNumber: string,
    templateId: string,
    variables?: Record<string, string>
  ): Promise<CommunicationResponse> {
    const request: SendCommunicationRequest = {
      channel: CommunicationChannel.WHATSAPP,
      recipient: phoneNumber,
      templateId,
      variables,
      body: '', // WhatsApp uses templates, body not needed
    };

    return this.communicationService.send(request);
  }

  /**
   * Send a test WhatsApp message
   */
  async sendTestWhatsApp(
    phoneNumber: string,
    templateId: string,
    variables?: Record<string, string>
  ): Promise<CommunicationResponse> {
    return this.communicationService.sendTest({
      channel: CommunicationChannel.WHATSAPP,
      recipient: phoneNumber,
      templateId,
      variables,
      body: '',
    });
  }

  /**
   * Check if WhatsApp is configured
   */
  async isConfigured(): Promise<boolean> {
    return this.communicationService.isChannelConfigured(CommunicationChannel.WHATSAPP);
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const whatsAppService = new WhatsAppService();
