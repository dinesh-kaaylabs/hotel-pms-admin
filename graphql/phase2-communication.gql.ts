/**
 * GraphQL Operations for Phase-2 Communication Automation
 * 
 * IMPORTANT:
 * - All operations are feature-flag protected
 * - Namespace: phase2Communication
 * - No Phase-1 modifications
 */

// ============================================================================
// ENUMS
// ============================================================================

export const COMMUNICATION_CHANNEL_ENUM = `
  enum CommunicationChannel {
    EMAIL
    SMS
    WHATSAPP
  }
`;

export const COMMUNICATION_STATUS_ENUM = `
  enum CommunicationStatus {
    PENDING
    SENT
    DELIVERED
    FAILED
    READ
  }
`;

export const TEMPLATE_CATEGORY_ENUM = `
  enum TemplateCategory {
    BOOKING_CONFIRMATION
    CHECK_IN_REMINDER
    CHECK_OUT_CONFIRMATION
    INVOICE
    PAYMENT_RECEIPT
    REFUND_CONFIRMATION
    CANCELLATION
    PRE_ARRIVAL
    POST_DEPARTURE
    OTHER
  }
`;

export const COMMUNICATION_EVENT_ENUM = `
  enum CommunicationEvent {
    BOOKING_CONFIRMED
    CHECK_IN_COMPLETED
    CHECK_OUT_COMPLETED
    INVOICE_GENERATED
    PAYMENT_RECEIVED
    REFUND_PROCESSED
  }
`;

// ============================================================================
// INPUT TYPES
// ============================================================================

export const SEND_TEST_COMMUNICATION_INPUT = `
  input SendTestCommunicationInput {
    templateId: ID!
    channel: CommunicationChannel!
    recipient: String!
    variables: JSON
  }
`;

export const CREATE_TEMPLATE_INPUT = `
  input CreateTemplateInput {
    name: String!
    category: TemplateCategory!
    channel: CommunicationChannel!
    subject: String
    body: String!
    variables: [String!]!
  }
`;

export const UPDATE_TEMPLATE_INPUT = `
  input UpdateTemplateInput {
    name: String
    category: TemplateCategory
    subject: String
    body: String
    variables: [String!]
    isActive: Boolean
  }
`;

export const CONFIGURE_TRIGGER_INPUT = `
  input ConfigureTriggerInput {
    event: CommunicationEvent!
    templateId: ID!
    channel: CommunicationChannel!
    isEnabled: Boolean!
    conditions: JSON
  }
`;

export const COMMUNICATION_LOG_FILTERS = `
  input CommunicationLogFilters {
    recipient: String
    channel: CommunicationChannel
    templateId: ID
    status: CommunicationStatus
    dateFrom: String
    dateTo: String
  }
`;

export const PAGINATION_INPUT = `
  input PaginationInput {
    page: Int!
    pageSize: Int!
  }
`;

// ============================================================================
// TYPES
// ============================================================================

export const COMMUNICATION_LOG_TYPE = `
  type CommunicationLog {
    id: ID!
    recipient: String!
    channel: CommunicationChannel!
    template: CommunicationTemplate
    status: CommunicationStatus!
    sentAt: String
    deliveredAt: String
    error: String
    retryCount: Int!
  }
`;

export const COMMUNICATION_TEMPLATE_TYPE = `
  type CommunicationTemplate {
    id: ID!
    name: String!
    category: TemplateCategory!
    channel: CommunicationChannel!
    subject: String
    body: String!
    variables: [String!]!
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;

export const COMMUNICATION_TRIGGER_TYPE = `
  type CommunicationTrigger {
    id: ID!
    event: CommunicationEvent!
    templateId: ID!
    template: CommunicationTemplate
    channel: CommunicationChannel!
    isEnabled: Boolean!
    conditions: JSON
  }
`;

export const COMMUNICATION_LOG_PAGINATION_TYPE = `
  type CommunicationLogPagination {
    data: [CommunicationLog!]!
    totalCount: Int!
    page: Int!
    pageSize: Int!
  }
`;

export const SEND_TEST_COMMUNICATION_RESPONSE = `
  type SendTestCommunicationResponse {
    success: Boolean!
    message: String
    communicationLog: CommunicationLog
  }
`;

export const CREATE_TEMPLATE_RESPONSE = `
  type CreateTemplateResponse {
    success: Boolean!
    message: String
    template: CommunicationTemplate
  }
`;

export const UPDATE_TEMPLATE_RESPONSE = `
  type UpdateTemplateResponse {
    success: Boolean!
    message: String
    template: CommunicationTemplate
  }
`;

export const CONFIGURE_TRIGGER_RESPONSE = `
  type ConfigureTriggerResponse {
    success: Boolean!
    message: String
    trigger: CommunicationTrigger
  }
`;

export const RESEND_COMMUNICATION_RESPONSE = `
  type ResendCommunicationResponse {
    success: Boolean!
    message: String
    communicationLog: CommunicationLog
  }
`;

export const PHASE2_COMMUNICATION_TYPE = `
  type Phase2Communication {
    logs(filters: CommunicationLogFilters, pagination: PaginationInput): CommunicationLogPagination!
    templates(category: TemplateCategory): [CommunicationTemplate!]!
    triggers: [CommunicationTrigger!]!
    sendTest(input: SendTestCommunicationInput!): SendTestCommunicationResponse!
    createTemplate(input: CreateTemplateInput!): CreateTemplateResponse!
    updateTemplate(templateId: ID!, input: UpdateTemplateInput!): UpdateTemplateResponse!
    configureTrigger(input: ConfigureTriggerInput!): ConfigureTriggerResponse!
    resend(communicationLogId: ID!): ResendCommunicationResponse!
  }
`;

// ============================================================================
// QUERIES
// ============================================================================

export const COMMUNICATION_LOGS_QUERY = `
  query CommunicationLogs($filters: CommunicationLogFilters, $pagination: PaginationInput) {
    phase2Communication {
      logs(filters: $filters, pagination: $pagination) {
        data {
          id
          recipient
          channel
          template {
            id
            name
          }
          status
          sentAt
          deliveredAt
          error
          retryCount
        }
        totalCount
        page
        pageSize
      }
    }
  }
`;

export const COMMUNICATION_TEMPLATES_QUERY = `
  query CommunicationTemplates($category: TemplateCategory) {
    phase2Communication {
      templates(category: $category) {
        id
        name
        category
        channel
        subject
        body
        variables
        isActive
        createdAt
        updatedAt
      }
    }
  }
`;

export const COMMUNICATION_TRIGGERS_QUERY = `
  query CommunicationTriggers {
    phase2Communication {
      triggers {
        id
        event
        templateId
        template {
          id
          name
        }
        channel
        isEnabled
        conditions
      }
    }
  }
`;

// ============================================================================
// MUTATIONS
// ============================================================================

export const SEND_TEST_COMMUNICATION_MUTATION = `
  mutation SendTestCommunication($input: SendTestCommunicationInput!) {
    phase2Communication {
      sendTest(input: $input) {
        success
        message
        communicationLog {
          id
          status
        }
      }
    }
  }
`;

export const CREATE_COMMUNICATION_TEMPLATE_MUTATION = `
  mutation CreateCommunicationTemplate($input: CreateTemplateInput!) {
    phase2Communication {
      createTemplate(input: $input) {
        success
        message
        template {
          id
          name
          body
        }
      }
    }
  }
`;

export const UPDATE_COMMUNICATION_TEMPLATE_MUTATION = `
  mutation UpdateCommunicationTemplate($templateId: ID!, $input: UpdateTemplateInput!) {
    phase2Communication {
      updateTemplate(templateId: $templateId, input: $input) {
        success
        message
        template {
          id
          body
        }
      }
    }
  }
`;

export const CONFIGURE_COMMUNICATION_TRIGGER_MUTATION = `
  mutation ConfigureCommunicationTrigger($input: ConfigureTriggerInput!) {
    phase2Communication {
      configureTrigger(input: $input) {
        success
        message
        trigger {
          id
          event
          isEnabled
        }
      }
    }
  }
`;

export const RESEND_COMMUNICATION_MUTATION = `
  mutation ResendCommunication($communicationLogId: ID!) {
    phase2Communication {
      resend(communicationLogId: $communicationLogId) {
        success
        message
        communicationLog {
          id
          status
        }
      }
    }
  }
`;

// ============================================================================
// ROOT QUERY & MUTATION EXTENSIONS
// ============================================================================

export const PHASE2_COMMUNICATION_ROOT = `
  extend type Query {
    phase2Communication: Phase2Communication!
  }
`;
