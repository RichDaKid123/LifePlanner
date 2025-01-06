import React, { useState, useEffect } from 'react';
import { format, startOfWeek, startOfMonth, addMonths, addDays, differenceInDays, addYears, addWeeks } from 'date-fns';
import { Goal } from '../types';
import { Modal } from 'antd';

type TimeUnit = 'days' | 'weeks' | 'months' | 'years';

interface TimelineProps {
  goals: Goal[];
}

export const Timeline: React.FC<TimelineProps> = ({ goals }) => {
  const [timeUnit, setTimeUnit] = useState<TimeUnit>('days');
  const [timelineRange, setTimelineRange] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const gridCellWidth = { days: 100, weeks: 200, months: 400, years: 600 }[timeUnit];
  const timelineHeight = Math.max(400, goals.length * 80);

  useEffect(() => {
    if (goals.length) {
      const start = addDays(new Date(Math.min(...goals.map((g) => g.startDate.getTime()))), 1);
      const end = addDays(new Date(Math.max(...goals.map((g) => g.targetDate.getTime()))), 1);

      const adjustments = { weeks: 7, months: 30, years: 365 };
      const adjustedEnd = timeUnit in adjustments 
        ? addDays(start, Math.ceil(differenceInDays(end, start) / adjustments[timeUnit as keyof typeof adjustments]))
        : end;

      setTimelineRange({ start, end: adjustedEnd });
    }
  }, [goals, timeUnit]);

  const calculateCurrentDay = (start: Date, index: number): Date => {
    const adjustFn = { weeks: addWeeks, months: addMonths, years: addYears, days: addDays };
    return adjustFn[timeUnit](timeUnit === 'weeks' ? startOfWeek(start) : timeUnit === 'months' ? startOfMonth(start) : start, index);
  };

  const categoryColors: Record<string, string> = {
    career: 'bg-blue-500',
    personal: 'bg-green-500',
    financial: 'bg-red-500',
    education: 'bg-teal-500',
  };

  return (
    <div className="relative w-full bg-gray-50 p-6">
      <div className="mb-4 text-center">
        <select
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
          value={timeUnit}
          onChange={(e) => setTimeUnit(e.target.value as TimeUnit)}
        >
          {['days', 'weeks', 'months', 'years'].map((unit) => (
            <option key={unit} value={unit}>
              {unit[0].toUpperCase() + unit.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div
        className="relative overflow-x-auto border rounded-lg shadow bg-white"
        style={{
          height: `${timelineHeight + 100}px`,
          width: '100%',
        }}
      >
        <div
          className="relative flex border-b bg-gray-100"
          style={{
            width: `${differenceInDays(timelineRange.end, timelineRange.start) * gridCellWidth}px`,
            height: '60px',
          }}
        >
          {Array.from({ length: differenceInDays(timelineRange.end, timelineRange.start) }).map((_, i) => {
            const currentDay = calculateCurrentDay(timelineRange.start, i);

            return (
              <div
                key={i}
                className="flex items-center justify-center border-r"
                style={{
                  width: `${gridCellWidth}px`,
                }}
              >
                <span className="text-sm font-medium text-gray-600">
                  {timeUnit === 'days'
                    ? format(currentDay, 'MMM d')
                    : timeUnit === 'weeks'
                    ? `Week of ${format(currentDay, 'MMM d')}`
                    : timeUnit === 'months'
                    ? format(currentDay, 'MMM yyyy')
                    : format(currentDay, 'yyyy')}
                </span>
              </div>
            );
          })}
        </div>

        <div
          className="absolute top-[60px] w-full"
          style={{ height: `${timelineHeight}px` }}
        >
          {goals.map((goal, index) => {
            const startOffset = differenceInDays(goal.startDate, timelineRange.start);
            const duration = differenceInDays(goal.targetDate, goal.startDate);
            const factor = { days: 1, weeks: 7, months: 30, years: 365 }[timeUnit];
            const adjustedLeft = (startOffset * gridCellWidth) / factor;
            const adjustedWidth = (duration * gridCellWidth) / factor;
            const begin = addDays(goal.startDate, 1);
            const completion = addDays(goal.targetDate, 1);
            const categoryClass = categoryColors[goal.category];

            return (
              <div
                key={goal.id}
                className={`absolute ${categoryClass} text-white shadow-lg rounded-lg p-2 cursor-pointer`}
                style={{
                  top: `${index * 80}px`,
                  left: `${adjustedLeft + 100}px`,
                  width: `${adjustedWidth}px`,
                  height: '60px',
                }}
                onClick={() => setSelectedGoal(goal)}
              >
                <div className="h-full flex flex-col justify-center">
                  <span className="font-semibold">{goal.title}</span>
                  <span className="text-xs">
                    {format(begin, 'MMM d')} - {format(completion, 'MMM d')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedGoal && (
        <Modal
          title={selectedGoal.title}
          open={!!selectedGoal}
          onCancel={() => setSelectedGoal(null)}
          footer={null}
        >
          <p>{selectedGoal.description}</p>
          <p>Start Date: {format(addDays(selectedGoal.startDate, 1), 'MMM d, yyyy')}</p>
          <p>Target Date: {format(addDays(selectedGoal.targetDate, 1), 'MMM d, yyyy')}</p>
        </Modal>
      )}
    </div>
  );
};
