/**
 * Phase-2 Email Service
 * 
 * Email-specific service abstraction.
 * Supports SMTP and SendGrid providers.
 */

import {
  CommunicationChannel,
  CommunicationService,
  ICommunicationService,
  SendCommunicationRequest,
  CommunicationResponse,
} from './CommunicationService';

// ============================================================================
// EMAIL PROVIDER TYPES
// ============================================================================

export enum EmailProvider {
  SMTP = 'SMTP',
  SENDGRID = 'SENDGRID',
}

// ============================================================================
// EMAIL SERVICE
// ============================================================================

/**
 * Email Service
 * 
 * Specialized service for email communications.
 */
export class EmailService {
  private communicationService: ICommunicationService;

  constructor(communicationService?: ICommunicationService) {
    this.communicationService = communicationService || new CommunicationService();
  }

  /**
   * Send an email
   * @param recipient Email address
   * @param subject Email subject
   * @param body Email body (HTML or plain text)
   * @param templateId Optional template ID
   * @param variables Template variables
   * @returns Communication response
   */
  async sendEmail(
    recipient: string,
    subject: string,
    body: string,
    templateId?: string,
    variables?: Record<string, string>
  ): Promise<CommunicationResponse> {
    const request: SendCommunicationRequest = {
      channel: CommunicationChannel.EMAIL,
      recipient,
      subject,
      body,
      templateId,
      variables,
    };

    return this.communicationService.send(request);
  }

  /**
   * Send a test email
   */
  async sendTestEmail(
    recipient: string,
    subject: string,
    body: string
  ): Promise<CommunicationResponse> {
    return this.communicationService.sendTest({
      channel: CommunicationChannel.EMAIL,
      recipient,
      subject,
      body,
    });
  }

  /**
   * Check if email is configured
   */
  async isConfigured(): Promise<boolean> {
    return this.communicationService.isChannelConfigured(CommunicationChannel.EMAIL);
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const emailService = new EmailService();
