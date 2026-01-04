"use client";

import { useState } from "react";
import Link from "next/link";

// Mock Data Types
interface Booking {
  id: string;
  courseTitle: string;
  courseType: "實作課程" | "理論課程" | "進階課程" | "基礎課程";
  month: string;
  date: string;
  dayWeek: string;
  timeRange: string;
  duration: string;
  teacher: string;
  location: string;
  status: "confirmed" | "pending"; // 'confirmed' -> green, 'pending' -> orange/blue(reserved)
  colorTheme: "green" | "orange" | "blue";
}

// Mock Data
const MOCK_BOOKINGS: Booking[] = [
  {
    id: "1",
    courseTitle: "上顎中門齒形態雕刻",
    courseType: "實作課程",
    month: "10月",
    date: "26",
    dayWeek: "週六",
    timeRange: "14:00 - 16:00",
    duration: "2小時",
    teacher: "林醫師",
    location: "教室 A03",
    status: "confirmed",
    colorTheme: "green",
  },
  {
    id: "2",
    courseTitle: "臼齒蠟型堆塑基礎",
    courseType: "基礎課程",
    month: "11月",
    date: "02",
    dayWeek: "週六",
    timeRange: "10:00 - 12:00",
    duration: "2小時",
    teacher: "張技師",
    location: "教室 B01",
    status: "pending",
    colorTheme: "orange",
  },
  {
    id: "3",
    courseTitle: "犬齒特徵與應用",
    courseType: "進階課程",
    month: "11月",
    date: "09",
    dayWeek: "週六",
    timeRange: "14:00 - 16:00",
    duration: "2小時",
    teacher: "林醫師",
    location: "教室 A03",
    status: "confirmed", // Using 'confirmed' style for '已預約'
    colorTheme: "blue",
  },
  {
    id: "4",
    courseTitle: "第一小臼齒雕刻實作",
    courseType: "實作課程",
    month: "11月",
    date: "16",
    dayWeek: "週六",
    timeRange: "14:00 - 16:00",
    duration: "2小時",
    teacher: "林醫師",
    location: "教室 A03",
    status: "confirmed",
    colorTheme: "green",
  },
  {
    id: "5",
    courseTitle: "全口義齒排列原則",
    courseType: "理論課程",
    month: "11月",
    date: "23",
    dayWeek: "週六",
    timeRange: "10:00 - 12:00",
    duration: "2小時",
    teacher: "王教授",
    location: "線上會議室",
    status: "pending",
    colorTheme: "orange",
  },
];

export default function StudentBookingsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "history">(
    "upcoming"
  );

  return (
    <div className="container mx-auto max-w-[1280px] p-6 md:p-10 flex flex-col gap-6 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-2">
        <div>
          <h1 className="text-slate-900 dark:text-white text-3xl font-display font-black leading-tight tracking-tight mb-2">
            我的預約記錄
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
            查看並管理您的所有課程預約狀態
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/student/booking"
            className="bg-slate-900 hover:bg-slate-800 dark:bg-primary dark:hover:bg-primary-dark dark:text-slate-900 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-slate-200 dark:shadow-none transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">
              add_circle
            </span>
            預約新課程
          </Link>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-surface-light dark:bg-surface-dark bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-soft sticky top-[73px] md:top-0 z-20 transition-all">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl flex w-full lg:w-auto">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`flex-1 lg:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all border ${
                activeTab === "upcoming"
                  ? "bg-white dark:bg-slate-700 shadow-sm text-slate-800 dark:text-white border-slate-200 dark:border-slate-600"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 border-transparent"
              }`}
            >
              即將到來
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 lg:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all border ${
                activeTab === "history"
                  ? "bg-white dark:bg-slate-700 shadow-sm text-slate-800 dark:text-white border-slate-200 dark:border-slate-600"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 border-transparent"
              }`}
            >
              歷史記錄
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 w-full sm:w-64 group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary trans-all text-[20px]">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary text-slate-700 dark:text-white placeholder-slate-400 outline-none trans-all"
                placeholder="搜尋課程名稱、教師..."
                type="text"
              />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <select className="w-full appearance-none pl-4 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-primary/50 outline-none cursor-pointer">
                  <option>所有類型</option>
                  <option>實作課程</option>
                  <option>理論課程</option>
                  <option>一對一指導</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">
                  expand_more
                </span>
              </div>
              <button
                className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 hover:text-primary hover:border-primary dark:hover:border-primary transition-all group"
                title="日期篩選"
              >
                <span className="material-symbols-outlined text-[20px] group-hover:scale-110 trans-all">
                  date_range
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking List */}
      <div className="flex flex-col gap-4">
        {MOCK_BOOKINGS.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-6">
        <button className="px-6 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary dark:hover:text-primary transition-all flex items-center gap-2 shadow-sm">
          載入更多預約
          <span className="material-symbols-outlined text-[18px]">
            expand_more
          </span>
        </button>
      </div>
    </div>
  );
}

function BookingCard({ booking }: { booking: Booking }) {
  const themeColors = {
    green: {
      bar: "bg-green-500",
      dateBg: "bg-green-50 dark:bg-green-900/20",
      dateText: "text-green-700 dark:text-green-400",
      dateBorder: "border-green-100 dark:border-green-900/30",
      badgeBg: "bg-green-100 dark:bg-green-900/40",
      badgeText: "text-green-700 dark:text-green-400",
      icon: "check_circle",
      statusText: "已確認",
    },
    orange: {
      bar: "bg-orange-400",
      dateBg: "bg-orange-50 dark:bg-orange-900/20",
      dateText: "text-orange-600 dark:text-orange-400",
      dateBorder: "border-orange-100 dark:border-orange-900/30",
      badgeBg: "bg-orange-100 dark:bg-orange-900/40",
      badgeText: "text-orange-700 dark:text-orange-400",
      icon: "hourglass_top",
      statusText: "待確認",
    },
    blue: {
      bar: "bg-blue-500",
      dateBg: "bg-slate-100 dark:bg-slate-800", // Matches screenshot "11/09" blue entry uses gray date box?
      // Wait, looking at screenshot 11/09 (Blue), the date box is actually gray/slate, not blue tinted.
      // Let's follow the screenshot closely.
      // Screenshot: 11/09 Blue bar. Date box is gray. Badge is blue '已預約'.
      dateText: "text-slate-600 dark:text-slate-400",
      dateBorder: "border-slate-200 dark:border-slate-700",
      badgeBg: "bg-blue-100 dark:bg-blue-900/40",
      badgeText: "text-blue-700 dark:text-blue-400",
      icon: "event_available",
      statusText: "已預約",
    },
  };

  const theme = themeColors[booking.colorTheme];

  return (
    <div className="bg-surface-light dark:bg-surface-dark bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 trans-all group relative overflow-hidden transition-all duration-300">
      <div
        className={`absolute left-0 top-0 bottom-0 w-1.5 ${theme.bar}`}
      ></div>
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        {/* Date Box */}
        <div
          className={`flex-shrink-0 w-full md:w-20 h-16 md:h-20 ${theme.dateBg} rounded-xl flex flex-row md:flex-col items-center justify-center md:justify-center gap-3 md:gap-0 ${theme.dateText} border ${theme.dateBorder}`}
        >
          <span className="text-sm font-bold uppercase tracking-wider">
            {booking.month}
          </span>
          <span className="text-2xl md:text-3xl font-black font-display leading-none">
            {booking.date}
          </span>
          <span className="md:hidden font-bold">{booking.dayWeek}</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 grid grid-cols-1 lg:grid-cols-12 gap-4 w-full">
          <div className="lg:col-span-5 flex flex-col justify-center gap-1">
            <h3 className="font-bold text-slate-800 dark:text-white text-lg md:text-xl truncate">
              {booking.courseTitle}
            </h3>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
              <span className="material-symbols-outlined text-[18px]">
                school
              </span>
              <span>{booking.courseType}</span>
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-center gap-2 text-sm">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <span className="material-symbols-outlined text-[18px] text-slate-400">
                schedule
              </span>
              <span className="font-medium">
                {booking.timeRange} ({booking.duration})
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <span className="material-symbols-outlined text-[18px] text-slate-400">
                person
              </span>
              <span>{booking.teacher}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <span className="material-symbols-outlined text-[18px] text-slate-400">
                location_on
              </span>
              <span>{booking.location}</span>
            </div>
          </div>
          <div className="lg:col-span-3 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 mt-2 lg:mt-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                theme.badgeBg
              } ${theme.badgeText} ${
                booking.status === "pending" ? "animate-pulse" : ""
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">
                {theme.icon}
              </span>
              {theme.statusText}
            </span>
            <div className="flex items-center gap-2">
              <Link
                href={`/student/bookings/${booking.id}`}
                className="text-xs font-bold text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors px-2 py-1"
              >
                查看詳情
              </Link>
              <button className="size-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <span className="material-symbols-outlined text-[20px]">
                  more_vert
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
