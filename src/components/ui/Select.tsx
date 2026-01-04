"use client";

import React from "react";

interface Option {
  value: string | number;
  label: string;
}

interface GroupOption {
  label: string;
  options: Option[];
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: (Option | GroupOption)[];
  error?: string;
  icon?: string;
}

export default function Select({
  label,
  options,
  error,
  icon,
  className = "",
  children,
  ...props
}: SelectProps) {
  // Check if options are grouped
  const isGrouped = (opts: (Option | GroupOption)[]): opts is GroupOption[] => {
    return opts.length > 0 && "options" in opts[0];
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">
            {icon}
          </span>
        )}
        <select
          className={`
            block w-full appearance-none rounded-xl border border-slate-200 dark:border-gray-600 
            bg-slate-50 dark:bg-gray-700/50 
            ${icon ? "pl-10" : "pl-4"} pr-10 py-2.5 
            text-slate-900 dark:text-white 
            placeholder:text-slate-400 dark:placeholder:text-gray-500 
            focus:border-primary focus:ring-2 focus:ring-primary/20 
            transition-all outline-none text-sm font-medium
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
            ${className}
          `}
          {...props}
        >
          {children
            ? children
            : options &&
              (isGrouped(options)
                ? options.map((group, idx) => (
                    <optgroup key={idx} label={group.label}>
                      {group.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </optgroup>
                  ))
                : (options as Option[]).map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  )))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
          <span className="material-symbols-outlined text-[20px]">
            expand_more
          </span>
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
