import React, { useState, useMemo } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval,
  isBefore,
  startOfToday
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

export default function Calendar({ selectedDate, onDateSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = startOfToday();

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-serif text-mystic-accent">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={prevMonth}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white/60" />
          </button>
          <button 
            onClick={nextMonth}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white/60" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-[10px] uppercase tracking-widest text-white/30 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => {
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isPast = isBefore(day, today);
          const isToday = isSameDay(day, today);

          return (
            <button
              key={idx}
              disabled={isPast || !isCurrentMonth}
              onClick={() => onDateSelect(day)}
              className={cn(
                "aspect-square flex items-center justify-center text-sm rounded-lg transition-all relative group",
                !isCurrentMonth && "opacity-0 pointer-events-none",
                isPast && "text-white/10 cursor-not-allowed",
                !isPast && isCurrentMonth && "hover:bg-mystic-accent/10 text-white/80",
                isSelected && "bg-mystic-accent text-mystic-black font-bold hover:bg-mystic-accent",
                isToday && !isSelected && "border border-mystic-accent/30"
              )}
            >
              {format(day, 'd')}
              {isToday && !isSelected && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-mystic-accent rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
