import React from "react";
import { ReportStats } from "@/lib/domain/reports/ReportRepository";

interface StatsGridProps {
  stats: ReportStats;
  loading?: boolean;
}

export function StatsGrid({ stats, loading }: StatsGridProps) {
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("zh-TW", {
      style: "currency",
      currency: "TWD",
      minimumFractionDigits: 0,
    }).format(val);

  const renderGrowth = (growth: number) => {
    const isPositive = growth >= 0;
    const colorClass = isPositive
      ? "text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30"
      : "text-rose-500 bg-rose-100 dark:bg-rose-900/30";
    const icon = isPositive ? "arrow_upward" : "arrow_downward";

    return (
      <div className="flex items-center gap-1 mt-2">
        <span
          className={`text-xs font-bold px-1.5 py-0.5 rounded-full flex items-center ${colorClass}`}
        >
          <span className="material-symbols-outlined text-[14px] mr-0.5">
            {icon}
          </span>
          {Math.abs(growth).toFixed(1)}%
        </span>
        <span className="text-xs text-text-sub ml-1">較上期</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl border border-border-light dark:border-border-dark shadow-sm h-32 animate-pulse"
          >
            <div className="h-4 bg-slate-200 dark:bg-slate-700 w-1/2 mb-4 rounded"></div>
            <div className="h-8 bg-slate-200 dark:bg-slate-700 w-3/4 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Revenue */}
      <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-text-sub text-xs font-semibold uppercase tracking-wide">
              本月總營收
            </p>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-2">
              {formatCurrency(stats.totalRevenue)}
            </h3>
            {renderGrowth(stats.totalRevenueGrowth)}
          </div>
          <div className="size-10 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center">
            <span className="material-symbols-outlined">attach_money</span>
          </div>
        </div>
      </div>

      {/* Sessions */}
      <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-text-sub text-xs font-semibold uppercase tracking-wide">
              累計課程數
            </p>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-2">
              {stats.totalSessions}{" "}
              <span className="text-lg font-medium text-text-sub">堂</span>
            </h3>
            {renderGrowth(stats.totalSessionsGrowth)}
          </div>
          <div className="size-10 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 flex items-center justify-center">
            <span className="material-symbols-outlined">school</span>
          </div>
        </div>
      </div>

      {/* Average Order Value */}
      <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-text-sub text-xs font-semibold uppercase tracking-wide">
              平均每堂收入
            </p>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-2">
              {formatCurrency(stats.averageOrderValue)}
            </h3>
            {renderGrowth(stats.averageOrderValueGrowth)}
          </div>
          <div className="size-10 rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 flex items-center justify-center">
            <span className="material-symbols-outlined">analytics</span>
          </div>
        </div>
      </div>

      {/* Active Students */}
      <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-text-sub text-xs font-semibold uppercase tracking-wide">
              活躍學生數
            </p>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-2">
              {stats.activeStudents}{" "}
              <span className="text-lg font-medium text-text-sub">人</span>
            </h3>
            {renderGrowth(stats.activeStudentsGrowth)}
          </div>
          <div className="size-10 rounded-lg bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400 flex items-center justify-center">
            <span className="material-symbols-outlined">group</span>
          </div>
        </div>
      </div>
    </div>
  );
}
