"use client";

import { useState, useEffect, useRef } from "react";

interface School {
  code: string;
  name: string;
}

interface SchoolComboboxProps {
  schools: School[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function SchoolCombobox({
  schools,
  value,
  onChange,
  placeholder = "請輸入或選擇學校",
  disabled = false,
}: SchoolComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync internal query state with value prop
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Filter schools based on query
  useEffect(() => {
    if (!query) {
      setFilteredSchools(schools.slice(0, 50)); // Show top 50 if empty
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = schools.filter(
      (school) =>
        school.name.toLowerCase().includes(lowerQuery) ||
        school.code.toLowerCase().includes(lowerQuery)
    );
    setFilteredSchools(filtered.slice(0, 50)); // Limit results for performance
  }, [query, schools]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        // Only reset query to value if the query doesn't match a school exactly?
        // Actually, for a free-text/combobox, usually we leave the text as is if they clicked out.
        // But if we want to enforce selection, we might revert.
        // Here, let's keep it loose: allow custom input (maybe for foreign schools not in list?),
        // but typically the parent handling `onChange` will decide what to do.
        // For now, we assume standard behavior: typing updates `onChange` too.
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setQuery(newVal);
    onChange(newVal);
    setIsOpen(true);
  };

  const handleSelect = (schoolName: string) => {
    setQuery(schoolName);
    onChange(schoolName);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
          <span className="material-symbols-outlined text-[20px]">school</span>
        </div>
        <input
          type="text"
          className={`w-full pl-10 pr-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          disabled={disabled}
        />
        {/* Chevron icon to indicate dropdown status */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400">
          <span className="material-symbols-outlined text-[20px]">
            {isOpen ? "arrow_drop_up" : "arrow_drop_down"}
          </span>
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {filteredSchools.length > 0 ? (
            <ul className="py-1">
              {filteredSchools.map((school) => (
                <li
                  key={school.code}
                  className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer text-sm text-slate-800 dark:text-gray-200 flex items-center justify-between"
                  onClick={() => handleSelect(school.name)}
                >
                  <span>{school.name}</span>
                  <span className="text-xs text-text-sub ml-2">
                    {school.code}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-sm text-text-sub text-center">
              無符合的學校
            </div>
          )}
        </div>
      )}
    </div>
  );
}
