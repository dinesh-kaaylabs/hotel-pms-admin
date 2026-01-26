
export type MaintenanceStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';

export interface MaintenanceIssue {
  id: string;
  hotelId?: string;
  roomId: string;
  roomNumber: string;
  roomType: string;
  issueType?: string;
  priority?: string;
  reason: string;
  description?: string;
  status: MaintenanceStatus;
  blockedFrom: string;
  blockedTo?: string;
  createdAt: string;
  resolvedAt?: string;
  reportedBy: string;
  slaDeadline?: string;
}

export interface CreateMaintenancePayload {
  roomId: string;
  reason: string;
  blockedFrom: string;
  blockedTo?: string;
}
