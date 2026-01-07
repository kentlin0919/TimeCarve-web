import React from "react";

interface TimelineItemProps {
  startDate: string;
  endDate: string | null;
  title: string;
  subtitle: string;
  description?: string | null;
  type: "work" | "education";
  isCurrent?: boolean;
}

export function TimelineItem({
  startDate,
  endDate,
  title,
  subtitle,
  description,
  type,
  isCurrent,
}: TimelineItemProps) {
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    return `${d.getFullYear()}.${month}`;
  };

  const dateRange = `${formatDate(startDate)} - ${
    isCurrent ? "Present" : endDate ? formatDate(endDate) : "Present"
  }`;

  return (
    <div className="relative flex gap-6 pb-12 last:pb-0 group">
      {/* Date - Left Side */}
      <div className="w-24 md:w-32 flex-shrink-0 text-right pt-1">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {dateRange}
        </span>
      </div>

      {/* Timeline Line */}
      <div className="absolute left-[6.5rem] md:left-[8.5rem] top-2 bottom-0 w-px bg-gray-200 dark:bg-gray-700 group-last:hidden"></div>

      {/* Dot */}
      <div className="relative z-10 flex-shrink-0 mt-1.5">
        <div
          className={`
          w-3 h-3 rounded-full border-2 
          ${
            type === "work"
              ? "border-sky-500 bg-sky-50"
              : "border-emerald-500 bg-emerald-50"
          }
        `}
        ></div>
      </div>

      {/* Content - Right Side */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4">
          <div
            className={`
            p-2 rounded-lg flex-shrink-0
            ${
              type === "work"
                ? "bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400"
                : "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
            }
          `}
          >
            <span className="material-symbols-outlined text-xl">
              {type === "work" ? "work" : "school"}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
              {title}
            </h3>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-1">
              {subtitle}
            </p>
            {description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed whitespace-pre-wrap">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
