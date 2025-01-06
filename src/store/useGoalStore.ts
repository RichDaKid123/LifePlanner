import { create } from 'zustand';
import { Goal} from '../types';

interface GoalStore {
  goals: Goal[];
  addGoal: (goal: Goal) => void;
  updateGoal: (goalId: string, goal: Partial<Goal>) => void;
  deleteGoal: (goalId: string) => void;
}

export const useGoalStore = create<GoalStore>((set) => ({
  goals: [],
  addGoal: (goal) =>
    set((state) => ({ goals: [...state.goals, goal] })),
  updateGoal: (goalId, updatedGoal) =>
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === goalId ? { ...goal, ...updatedGoal } : goal
      ),
    })),
  deleteGoal: (goalId) =>
    set((state) => ({
      goals: state.goals.filter((goal) => goal.id !== goalId),
    })),
}));