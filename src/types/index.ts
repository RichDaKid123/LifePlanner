export type GoalCategory = 'career' | 'education' | 'personal' | 'financial';

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  startDate: Date;
  targetDate: Date;
  completed: boolean;
  notes: string[];
}