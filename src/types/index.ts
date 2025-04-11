
export type Dimension = 'cyber' | 'magic' | 'void';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dimension: Dimension;
  dueDate?: Date;
  recurring?: boolean;
  createdAt: Date;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
  description?: string;
}

export interface DimensionInfo {
  id: Dimension;
  name: string;
  description: string;
  icon: string;
  bgClass: string;
  particleCount?: number;
  particleColor?: string;
  particleSize?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  dimension: Dimension;
  completed: boolean;
  requiredTaskCount: number;
}
