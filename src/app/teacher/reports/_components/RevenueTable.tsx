import React from "react";
import { Transaction } from "@/lib/domain/reports/ReportRepository"; // Ensure this matches path

interface RevenueTableProps {
  transactions: Transaction[];
  total: number;
  page: number;
  pageSize: number;
  loading?: boolean;
  onPageChange: (page: number) => void;
  onSearch: (query: string) => void;
  onFilterType: (type: string) => void;
}

export function RevenueTable({
  transactions,
  total,
  page,
  pageSize,
  loading,
  onPageChange,
  onSearch,
  onFilterType,
}: RevenueTableProps) {
  const totalPages = Math.ceil(total / pageSize);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("zh-TW", {
      style: "currency",
      currency: "TWD",
      minimumFractionDigits: 0,
    }).format(val);
  const formatDate = (dateStr: string) => {
    // dateStr is ISO
    const d = new Date(dateStr);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-card flex flex-col overflow-hidden">
      <div className="p-5 border-b border-border-light dark:border-border-dark flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center bg-slate-50/30 dark:bg-slate-800/30">
        <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-text-sub">
            list_alt
          </span>
          營收明細列表
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <div className="relative group w-full sm:w-64">
            <input
              onChange={(e) => onSearch(e.target.value)}
              className="pl-9 pr-4 py-2 w-full rounded-lg border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none"
              placeholder="搜尋學生、課程..."
              type="text"
            />
            <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-text-sub group-focus-within:text-primary text-[18px] transition-colors">
              search
            </span>
          </div>
          <select
            onChange={(e) => onFilterType(e.target.value)}
            className="pl-3 pr-8 py-2 w-full sm:w-auto rounded-lg border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none appearance-none cursor-pointer text-slate-700 dark:text-gray-200"
          >
            <option value="">所有課程類型</option>
            {/* Options should ideally be dynamic, but for now hardcode generic types or fetch */}
            <option value="general">一般課程</option>
            <option value="package">套裝課程</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs text-text-sub uppercase border-b border-border-light dark:border-border-dark">
            <tr>
              <th className="px-6 py-4 font-semibold">入帳日期</th>
              <th className="px-6 py-4 font-semibold">學生姓名</th>
              <th className="px-6 py-4 font-semibold">課程名稱</th>
              <th className="px-6 py-4 font-semibold">課程類型</th>
              <th className="px-6 py-4 font-semibold text-right">實收金額</th>
              <th className="px-6 py-4 font-semibold text-center">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light dark:divide-border-dark bg-white dark:bg-surface-dark">
            {loading ? (
              // Skeleton rows
              [1, 2, 3].map((i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4">
                    <div className="h-4 bg-slate-200 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-slate-200 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-slate-200 rounded w-48"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-slate-200 rounded w-20"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-slate-200 rounded w-20 ml-auto"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-slate-200 rounded w-8 mx-auto"></div>
                  </td>
                </tr>
              ))
            ) : transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-text-sub"
                >
                  暫無交易紀錄
                </td>
              </tr>
            ) : (
              transactions.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                >
                  <td className="px-6 py-4 text-sm text-text-sub">
                    {formatDate(t.date)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {t.studentAvatar ? (
                        <img
                          src={t.studentAvatar}
                          alt={t.studentName}
                          className="size-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xs font-bold">
                          {t.studentName?.[0]}
                        </div>
                      )}
                      <span className="text-sm font-medium text-slate-800 dark:text-white">
                        {t.studentName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-gray-300">
                    {t.courseTitle}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-md bg-amber-100 text-amber-700 text-xs font-medium dark:bg-amber-900/30 dark:text-amber-400">
                      {t.courseType || "一般"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-slate-800 dark:text-white">
                    {formatCurrency(t.amount)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-text-sub hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">
                        visibility
                      </span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-border-light dark:border-border-dark flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
        <span className="text-xs text-text-sub">
          顯示最新 {transactions.length} 筆，共 {total} 筆交易
        </span>
        <div className="flex items-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="size-8 flex items-center justify-center rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-sub hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">
              chevron_left
            </span>
          </button>

          <span className="text-sm text-text-sub px-2">
            Page {page} of {Math.max(1, totalPages)}
          </span>

          <button
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="size-8 flex items-center justify-center rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-sub hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-sm">
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
