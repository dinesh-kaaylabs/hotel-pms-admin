
export type HousekeepingStatus = 'DIRTY' | 'CLEAN' | 'INSPECTED' | 'OUT_OF_SERVICE' | 'OCCUPIED';

export type CleaningLogStatus = 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';

export interface HousekeepingStaff {
  id: string;
  name: string;
}

export interface HousekeepingRoom {
  id: string;
  roomNumber: string;
  roomType: string;
  floor: number;
  status: HousekeepingStatus;
  assignedStaff?: HousekeepingStaff;
  lastCleanedAt?: string;
}

export interface CleaningLog {
  id: string;
  roomId: string;
  staffName: string;
  status: CleaningLogStatus;
  note?: string;
  createdAt: string;
}

export interface HousekeepingSummary {
  dirty: number;
  clean: number;
  inspected: number;
  outOfService: number;
}
