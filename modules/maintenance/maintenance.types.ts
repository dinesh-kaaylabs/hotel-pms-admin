
export type MaintenanceStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';

export interface MaintenanceIssue {
  id: string;
  roomId: string;
  roomNumber: string;
  roomType: string;
  reason: string;
  status: MaintenanceStatus;
  blockedFrom: string;
  blockedTo?: string;
  createdAt: string;
  resolvedAt?: string;
  reportedBy: string;
}

export interface CreateMaintenancePayload {
  roomId: string;
  reason: string;
  blockedFrom: string;
  blockedTo?: string;
}
