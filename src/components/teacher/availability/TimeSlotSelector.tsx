"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export interface TimeRange {
  start: string; // "HH:mm"
  end: string; // "HH:mm"
}

interface TimeSlotSelectorProps {
  value: TimeRange[];
  onChange: (value: TimeRange[]) => void;
  disabled?: boolean;
}

const MORNING_SLOTS = generateSlots("06:00", "12:00");
const AFTERNOON_SLOTS = generateSlots("12:00", "18:00");
const EVENING_SLOTS = generateSlots("18:00", "23:00"); // Until 23:00 start (23:30 end)

// Helper to generate 30-min slots
function generateSlots(startTime: string, endTime: string) {
  const slots: string[] = [];
  let current = parseTime(startTime);
  const end = parseTime(endTime);

  while (current < end) {
    slots.push(formatTime(current));
    current += 30;
  }
  return slots;
}

function parseTime(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

export function TimeSlotSelector({
  value,
  onChange,
  disabled,
}: TimeSlotSelectorProps) {
  // Convert ranges to a Set of selected start times for O(1) lookup
  const selectedSlots = React.useMemo(() => {
    const output = new Set<string>();
    value.forEach((range) => {
      let current = parseTime(range.start);
      const end = parseTime(range.end);
      while (current < end) {
        output.add(formatTime(current));
        current += 30;
      }
    });
    return output;
  }, [value]);

  const toggleSlot = (time: string) => {
    const newSelected = new Set(selectedSlots);
    if (newSelected.has(time)) {
      newSelected.delete(time);
    } else {
      newSelected.add(time);
    }

    // Convert back to ranges
    const sortedTimes = Array.from(newSelected).sort(
      (a, b) => parseTime(a) - parseTime(b)
    );
    const newRanges: TimeRange[] = [];

    if (sortedTimes.length === 0) {
      onChange([]);
      return;
    }

    let currentStart = sortedTimes[0];
    let prevTime = parseTime(currentStart);

    for (let i = 1; i < sortedTimes.length; i++) {
      const currentTime = parseTime(sortedTimes[i]);
      if (currentTime !== prevTime + 30) {
        // Gap detected, close current range
        newRanges.push({ start: currentStart, end: formatTime(prevTime + 30) });
        currentStart = sortedTimes[i];
      }
      prevTime = currentTime;
    }
    // Close final range
    newRanges.push({ start: currentStart, end: formatTime(prevTime + 30) });

    onChange(newRanges);
  };

  const renderSlot = (time: string, label?: string) => {
    const isSelected = selectedSlots.has(time);
    return (
      <button
        type="button"
        key={time}
        disabled={disabled}
        onClick={() => toggleSlot(time)}
        className={cn(
          "relative border rounded-xl p-3 text-sm font-medium transition-all hover:shadow-md",
          isSelected
            ? "border-primary bg-primary/5 text-primary-dark dark:text-primary shadow-glow ring-1 ring-primary font-bold"
            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-primary/50",
          disabled &&
            "opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-800/50"
        )}
      >
        {label || time}
        {isSelected && (
          <span className="absolute right-0 top-0 p-0.5 text-primary opacity-20 transform scale-75">
            <span className="material-symbols-outlined text-[14px]">
              check_circle
            </span>
          </span>
        )}
      </button>
    );
  };

  const renderSection = (
    title: string,
    icon: string,
    colorClass: string,
    slots: string[]
  ) => (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span
          className={cn("material-symbols-outlined text-[20px]", colorClass)}
        >
          {icon}
        </span>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {slots.map((t) => renderSlot(t))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col">
      {renderSection(
        "上午時段 (Morning)",
        "wb_sunny",
        "text-amber-500",
        MORNING_SLOTS
      )}
      {renderSection(
        "下午時段 (Afternoon)",
        "sunny",
        "text-orange-500",
        AFTERNOON_SLOTS
      )}
      {renderSection(
        "晚間時段 (Evening)",
        "bedtime",
        "text-indigo-500",
        EVENING_SLOTS
      )}
    </div>
  );
}
