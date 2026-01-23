/**
 * Phase-2 Backend Services Index
 * 
 * Central export point for all Phase-2 backend services.
 */

// Event System
export * from './events/EventEmitter';
export * from './events/types';

// Feature Flags
export * from './services/FeatureFlagService';

// Communication Services
export * from './services/communication/CommunicationService';
export * from './services/communication/EmailService';
export * from './services/communication/SmsService';
export * from './services/communication/WhatsAppService';

// Audit Log Services
export * from './services/audit/AuditLogService';

// Approval Workflow Services
export * from './services/approval/ApprovalWorkflowService';
