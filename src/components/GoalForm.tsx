import React, { useState } from 'react';
import { Goal, GoalCategory } from '../types';
import { Calendar, BookOpen, Briefcase, PiggyBank, User } from 'lucide-react';

interface GoalFormProps {
  onSubmit: (goal: Omit<Goal, 'id' | 'milestones' | 'completed' | 'notes'>) => void;
}

const categories: { value: GoalCategory; label: string; icon: React.ReactNode }[] = [
  { value: 'career', label: 'Career', icon: <Briefcase className="h-5 w-5" /> },
  { value: 'education', label: 'Education', icon: <BookOpen className="h-5 w-5" /> },
  { value: 'personal', label: 'Personal', icon: <User className="h-5 w-5" /> },
  { value: 'financial', label: 'Financial', icon: <PiggyBank className="h-5 w-5" /> },
];

export const GoalForm: React.FC<GoalFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'personal' as GoalCategory,
    startDate: '',
    targetDate: '',
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      startDate: new Date(formData.startDate),
      targetDate: new Date(formData.targetDate),
    });
    setFormData({
      title: '',
      description: '',
      category: 'personal',
      startDate: '',
      targetDate: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-9">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          required
          placeholder='ex. College'
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <div className="mt-1 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map(({ value, label, icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setFormData({ ...formData, category: value })}
              className={`flex items-center justify-center space-x-2 rounded-lg border p-3 ${
                formData.category === value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <div className="mt-1 flex">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3">
              <Calendar className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="date"
              required
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              className="block w-full rounded-r-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <div className="mt-1 flex">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3">
              <Calendar className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="date"
              required
              value={formData.targetDate}
              onChange={(e) =>
              setFormData({ ...formData, targetDate: e.target.value })
              }
              className="block w-full rounded-r-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Event
      </button>
    </form>
  );
};