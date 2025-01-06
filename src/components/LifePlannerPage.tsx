import React from "react";
import { Timeline } from './Timeline';
import { GoalForm } from './GoalForm';
import { useGoalStore } from '../store/useGoalStore';
import { MapPin, Target} from 'lucide-react';
import { Goal } from '../types/';
import { Link } from "react-router-dom";

const LifePathPlannerPage: React.FC = () => {
  console.log('LifePlannerPage component rendering');
  const { goals, addGoal } = useGoalStore();

  const handleGoalSubmit = (goalData: Omit<Goal, 'id' | 'milestones' | 'completed' | 'notes'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: crypto.randomUUID(),
      completed: false,
      notes: [],
    };
    addGoal(newGoal);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <MapPin className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Life Path Planner</h1>
          </div>
          <button className="ml-auto">
            <Link to="/settings">Go to settings</Link>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-8">
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-6 flex items-center text-lg font-semibold text-gray-900">
                <Target className="mr-2 h-5 w-5 text-blue-600" />
                Add New Event
              </h2>
              <GoalForm onSubmit={handleGoalSubmit} />
            </div>
          </div>

          <div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">Your Life Timeline</h2>
              <Timeline goals={goals} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LifePathPlannerPage;
