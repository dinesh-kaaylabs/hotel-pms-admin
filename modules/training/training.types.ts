
export interface SopPoint {
  text: string;
  isCompleted?: boolean;
}

export interface SopSectionData {
  title: string;
  items: SopPoint[];
  type: 'bullet' | 'checklist' | 'caution' | 'success';
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  path: string;
  roleRequired: string[];
}
