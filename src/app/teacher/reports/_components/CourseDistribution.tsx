import React from "react";
import { CourseRevenueDistribution } from "@/lib/domain/reports/ReportRepository";

interface CourseDistributionProps {
  data: CourseRevenueDistribution[];
  loading?: boolean;
}

export function CourseDistribution({ data, loading }: CourseDistributionProps) {
  const COLORS = [
    "#0ea5e9", // promary (sky-500)
    "#a855f7", // purple-500
    "#fbbf24", // amber-400
    "#34d399", // emerald-400
    "#f43f5e", // rose-500
    "#64748b", // slate-500
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Calculate segments for conic-gradient
  let currentAngle = 0;
  const segments = data.map((item, index) => {
    const percentage = item.value / total;
    const angle = percentage * 360;
    const color = COLORS[index % COLORS.length];
    const start = currentAngle;
    const end = currentAngle + angle;
    currentAngle = end;
    return `${color} ${start}deg ${end}deg`;
  });

  const gradient =
    segments.length > 0
      ? `conic-gradient(${segments.join(", ")})`
      : `conic-gradient(#e2e8f0 0deg 360deg)`; // Empty state

  if (loading) {
    return (
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-card p-6 flex flex-col animate-pulse">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 w-1/2 mb-6 rounded"></div>
        <div className="flex-1 flex justify-center items-center">
          <div className="size-48 rounded-full bg-slate-200 dark:bg-slate-700"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-card p-6 flex flex-col">
      <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-purple-500">
          pie_chart
        </span>
        課程收入占比
      </h3>
      <div className="flex-1 flex flex-col justify-center items-center relative min-h-[220px]">
        <div
          className="size-48 rounded-full relative hover:scale-105 transition-transform"
          style={{ background: gradient }}
        >
          <div className="absolute inset-4 bg-white dark:bg-surface-dark rounded-full flex items-center justify-center flex-col">
            <span className="text-xs text-text-sub">總營收</span>
            <span className="text-xl font-bold text-slate-800 dark:text-white">
              100%
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        {data.map((item, index) => {
          const percentage =
            total > 0 ? ((item.value / total) * 100).toFixed(1) : "0";
          return (
            <div
              key={item.name}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="size-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                <span className="text-slate-600 dark:text-gray-300 truncate max-w-[150px]">
                  {item.name}
                </span>
              </div>
              <span className="font-bold text-slate-800 dark:text-white">
                {percentage}%
              </span>
            </div>
          );
        })}
        {data.length === 0 && (
          <p className="text-center text-text-sub text-sm">暫無數據</p>
        )}
      </div>
    </div>
  );
}
