/**
 * GraphQL Operations for Phase-2 Approval Workflows
 * 
 * IMPORTANT:
 * - All operations are feature-flag protected
 * - Namespace: phase2Approval
 * - Approval workflows intercept Phase-1 actions (no Phase-1 modifications)
 */

// ============================================================================
// ENUMS
// ============================================================================

export const APPROVAL_ACTION_ENUM = `
  enum ApprovalAction {
    REFUND
    CANCELLATION
    PRICE_CHANGE
    USER_ROLE_CHANGE
  }
`;

export const APPROVAL_STATUS_ENUM = `
  enum ApprovalStatus {
    PENDING
    APPROVED
    REJECTED
    EXPIRED
  }
`;

export const USER_ROLE_ENUM = `
  enum UserRole {
    SUPER_ADMIN
    HOTEL_ADMIN
    MANAGER
    STAFF
  }
`;

// ============================================================================
// INPUT TYPES
// ============================================================================

export const APPROVAL_REQUEST_FILTERS = `
  input ApprovalRequestFilters {
    status: ApprovalStatus
    requesterId: ID
    action: ApprovalAction
    dateFrom: String
    dateTo: String
    hotelId: ID
  }
`;

export const APPROVAL_THRESHOLD_INPUT = `
  input ApprovalThresholdInput {
    amount: Float!
    approverRoles: [UserRole!]!
  }
`;

export const CREATE_APPROVAL_CHAIN_INPUT = `
  input CreateApprovalChainInput {
    action: ApprovalAction!
    thresholds: [ApprovalThresholdInput!]!
    isActive: Boolean!
  }
`;

// ============================================================================
// TYPES
// ============================================================================

export const APPROVAL_REQUESTER_TYPE = `
  type ApprovalRequester {
    id: ID!
    email: String!
    role: String!
  }
`;

export const APPROVAL_APPROVER_TYPE = `
  type ApprovalApprover {
    id: ID!
    email: String!
    role: String!
    status: ApprovalStatus!
    approvedAt: String
    comments: String
  }
`;

export const APPROVAL_REQUEST_TYPE = `
  type ApprovalRequest {
    id: ID!
    action: ApprovalAction!
    requester: ApprovalRequester!
    approvers: [ApprovalApprover!]!
    status: ApprovalStatus!
    entityType: String!
    entityId: ID!
    requestData: JSON!
    createdAt: String!
    expiresAt: String
    comments: String
  }
`;

export const APPROVAL_REQUEST_PAGINATION_TYPE = `
  type ApprovalRequestPagination {
    data: [ApprovalRequest!]!
    totalCount: Int!
    page: Int!
    pageSize: Int!
  }
`;

export const APPROVAL_THRESHOLD_TYPE = `
  type ApprovalThreshold {
    amount: Float!
    approverRoles: [UserRole!]!
  }
`;

export const APPROVAL_CHAIN_TYPE = `
  type ApprovalChain {
    id: ID!
    action: ApprovalAction!
    thresholds: [ApprovalThreshold!]!
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;

export const CREATE_APPROVAL_CHAIN_RESPONSE = `
  type CreateApprovalChainResponse {
    success: Boolean!
    message: String
    chain: ApprovalChain
  }
`;

export const APPROVE_REQUEST_RESPONSE = `
  type ApproveRequestResponse {
    success: Boolean!
    message: String
    request: ApprovalRequest
  }
`;

export const REJECT_REQUEST_RESPONSE = `
  type RejectRequestResponse {
    success: Boolean!
    message: String
    request: ApprovalRequest
  }
`;

export const PHASE2_APPROVAL_TYPE = `
  type Phase2Approval {
    requests(filters: ApprovalRequestFilters, pagination: PaginationInput): ApprovalRequestPagination!
    chains: [ApprovalChain!]!
    createChain(input: CreateApprovalChainInput!): CreateApprovalChainResponse!
    approve(requestId: ID!, comments: String): ApproveRequestResponse!
    reject(requestId: ID!, comments: String!): RejectRequestResponse!
  }
`;

// ============================================================================
// QUERIES
// ============================================================================

export const APPROVAL_REQUESTS_QUERY = `
  query ApprovalRequests($filters: ApprovalRequestFilters, $pagination: PaginationInput) {
    phase2Approval {
      requests(filters: $filters, pagination: $pagination) {
        data {
          id
          action
          requester {
            id
            email
            role
          }
          approvers {
            id
            email
            role
            status
            approvedAt
            comments
          }
          status
          entityType
          entityId
          requestData
          createdAt
          expiresAt
          comments
        }
        totalCount
        page
        pageSize
      }
    }
  }
`;

export const APPROVAL_CHAINS_QUERY = `
  query ApprovalChains {
    phase2Approval {
      chains {
        id
        action
        thresholds {
          amount
          approverRoles
        }
        isActive
        createdAt
        updatedAt
      }
    }
  }
`;

// ============================================================================
// MUTATIONS
// ============================================================================

export const CREATE_APPROVAL_CHAIN_MUTATION = `
  mutation CreateApprovalChain($input: CreateApprovalChainInput!) {
    phase2Approval {
      createChain(input: $input) {
        success
        message
        chain {
          id
          action
          thresholds {
            amount
            approverRoles
          }
        }
      }
    }
  }
`;

export const APPROVE_REQUEST_MUTATION = `
  mutation ApproveRequest($requestId: ID!, $comments: String) {
    phase2Approval {
      approve(requestId: $requestId, comments: $comments) {
        success
        message
        request {
          id
          status
        }
      }
    }
  }
`;

export const REJECT_REQUEST_MUTATION = `
  mutation RejectRequest($requestId: ID!, $comments: String!) {
    phase2Approval {
      reject(requestId: $requestId, comments: $comments) {
        success
        message
        request {
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

export const PHASE2_APPROVAL_ROOT = `
  extend type Query {
    phase2Approval: Phase2Approval!
  }
`;
