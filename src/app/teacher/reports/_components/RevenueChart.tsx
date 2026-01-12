import React from "react";
import { RevenueTrend } from "@/lib/domain/reports/ReportRepository";

interface RevenueChartProps {
  data: RevenueTrend[];
  range: "6_months" | "year";
  onRangeChange: (range: "6_months" | "year") => void;
  loading?: boolean;
}

export function RevenueChart({
  data,
  range,
  onRangeChange,
  loading,
}: RevenueChartProps) {
  const maxAmount = Math.max(...data.map((d) => d.amount), 1); // Avoid div by zero

  const formatAmount = (val: number) => {
    if (val >= 10000) return `${(val / 10000).toFixed(1)}萬`;
    return `${val}`;
  };

  if (loading) {
    return (
      <div className="lg:col-span-2 bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-card p-6 animate-pulse">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 w-1/3 mb-6 rounded"></div>
        <div className="h-64 bg-slate-200 dark:bg-slate-700 w-full rounded"></div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            bar_chart
          </span>
          營收趨勢
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => onRangeChange("6_months")}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              range === "6_months"
                ? "bg-primary/10 text-primary border border-primary/20"
                : "bg-slate-100 dark:bg-slate-800 text-text-sub hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            近6個月
          </button>
          <button
            onClick={() => onRangeChange("year")}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              range === "year"
                ? "bg-primary/10 text-primary border border-primary/20"
                : "bg-slate-100 dark:bg-slate-800 text-text-sub hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            本年度
          </button>
        </div>
      </div>

      <div className="h-64 w-full flex items-end justify-between gap-4 px-2 overflow-x-auto">
        {data.map((item, index) => {
          const heightPercent = (item.amount / maxAmount) * 100;
          return (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 group min-w-[40px] flex-1"
            >
              <div className="text-xs text-text-sub opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                {formatAmount(item.amount)}
              </div>
              <div
                className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-sm transition-all relative group"
                style={{ height: `${Math.max(heightPercent, 1)}%` }} // Minimum height to show bar exists
              >
                <div
                  className="absolute bottom-0 w-full bg-primary/80 rounded-t-sm animate-[grow_1s_ease-out_forwards]"
                  style={{ height: "0%", animationDelay: `${index * 0.1}s` }}
                ></div>
                {/* CSS animation needs keyframes to apply to the inner div, or we pass height in style directly to inner div if we use width transition. 
                    The Original used keyframes defined in jsx style block. 
                    Actually, straightforward way:
                */}
                <style jsx>{`
                  @keyframes grow-${index} {
                    from {
                      height: 0%;
                    }
                    to {
                      height: 100%;
                    }
                  }
                `}</style>
                <div
                  className="absolute bottom-0 w-full bg-primary/80 rounded-t-sm"
                  style={{
                    height: "100%",
                    animation: `grow-${index} 1s ease-out backwards`,
                    animationDelay: `${index * 0.05}s`,
                  }}
                ></div>
              </div>
              <div className="text-xs text-text-sub whitespace-nowrap">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        @keyframes grow {
          from {
            height: 0%;
          }
          to {
            height: 100%;
          }
        }
      `}</style>
    </div>
  );
}
