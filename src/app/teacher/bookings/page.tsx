'use client';

import { useState } from 'react';

export default function TeacherBookingsPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 9, 28)); // Start with Oct 2023 as per design
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2023, 9, 28));

  // Calendar Logic
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
  
  const days = [];
  // Previous month filler
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push({ day: '', type: 'empty' });
  }
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, type: 'current', date: new Date(year, month, i) });
  }
  
  // Mock Data for Events (Using day number for simplicity in this demo)
  const events = {
    24: [{ time: '10:00', name: '李大偉', color: 'red' }],
    25: [{ time: '19:00', name: '張雅婷', color: 'slate' }],
    28: [{ time: '14:00', name: '陳小美', color: 'orange' }],
    29: [{ time: '09:30', name: '林大山', color: 'emerald' }],
    30: [{ time: '08:00', name: '王小明', color: 'emerald' }],
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDate(now);
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="w-full bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark px-8 py-4 flex justify-between items-center sticky top-0 z-10 transition-all">
        <div className="flex flex-col">
          <h2 className="text-slate-800 dark:text-white text-xl font-bold tracking-tight flex items-center gap-2">
            預約管理中心
          </h2>
          <p className="text-text-sub dark:text-gray-400 text-sm mt-0.5">管理您的教學日程，確認學生預約與付款狀態</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-full text-text-sub dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700 relative transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-surface-dark"></span>
          </button>
          <div className="h-8 w-px bg-border-light dark:bg-border-dark mx-1"></div>
          <div className="flex items-center gap-3 px-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">林曉梅 老師</span>
            <div className="w-8 h-8 rounded-full bg-gray-200 bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDO6reZcrIx4TpNaoa2cHckBMT5jGOVcSOgCiWFeFHvwR5BhOlm6EzZoO1nDA5jhhdVnLiS3xPcbfPeCVuaPW7x9yyQ1OpilXHhQqZf7s1ilC_fOFoonIf98HRVehAYuVriM8l3I0MrYHIn39RVWEj_4jU-wlh_BemOK4VeRUNedhA-sln2p5816fNCRlBCziM3mk1IHmY1EIx1yw45MJkIcGFi9fz7JcPrVe1C0mU8MYnl7CYlnU1BMQEyHUmuypSHuwydpWLgPOU")'}}></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Toolbar */}
        <div className="px-8 py-6 pb-2">
            <div className="flex flex-col xl:flex-row justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 flex-1">
                    <div className="relative group w-full sm:w-64">
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">search</span>
                        <input className="pl-10 pr-4 py-2 w-full rounded-xl border border-transparent bg-white dark:bg-surface-dark shadow-sm ring-1 ring-border-light dark:ring-border-dark focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-sm text-slate-700 dark:text-slate-200 transition-all placeholder:text-slate-400" placeholder="搜尋學生姓名..." type="text"/>
                    </div>
                    <div className="relative group w-full sm:w-48">
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">calendar_month</span>
                        <input 
                          className="pl-10 pr-4 py-2 w-full rounded-xl border border-transparent bg-white dark:bg-surface-dark shadow-sm ring-1 ring-border-light dark:ring-border-dark focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-sm text-slate-700 dark:text-slate-200 transition-all cursor-pointer" 
                          type="date"
                          value={selectedDate.toISOString().split('T')[0]}
                          onChange={(e) => {
                             if(e.target.value) {
                               const newDate = new Date(e.target.value);
                               setSelectedDate(newDate);
                               setCurrentDate(newDate);
                             }
                          }}
                        />
                    </div>
                    <div className="relative w-full sm:w-48">
                        <select className="pl-3 pr-8 py-2 w-full rounded-xl border border-transparent bg-white dark:bg-surface-dark shadow-sm ring-1 ring-border-light dark:ring-border-dark focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-sm text-slate-700 dark:text-slate-200 transition-all cursor-pointer appearance-none">
                            <option value="">所有付款狀態</option>
                            <option value="unpaid">待付款</option>
                            <option value="paid">已付款</option>
                            <option value="noshow">未出席</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-2 text-slate-400 pointer-events-none text-[20px]">expand_more</span>
                    </div>
                </div>
                <div className="flex items-center gap-3 ml-auto">
                    <div className="flex bg-white dark:bg-surface-dark rounded-lg p-1 shadow-sm ring-1 ring-border-light dark:ring-border-dark">
                        <button className="px-3 py-1.5 rounded-md bg-primary/10 text-primary-dark dark:text-primary font-medium text-sm transition-colors flex items-center gap-1">
                            <span className="material-symbols-outlined text-[18px]">calendar_view_month</span>
                            月視圖
                        </button>
                        <button className="px-3 py-1.5 rounded-md text-text-sub hover:bg-slate-50 dark:hover:bg-slate-700 dark:text-slate-400 font-medium text-sm transition-colors flex items-center gap-1">
                            <span className="material-symbols-outlined text-[18px]">calendar_view_week</span>
                            週視圖
                        </button>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium shadow-lg shadow-primary/20 transition-all active:scale-95 group">
                        <span className="material-symbols-outlined text-[20px] group-hover:rotate-90 transition-transform">add</span>
                        <span className="text-sm">新增預約</span>
                    </button>
                </div>
            </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col xl:flex-row gap-6 p-8 pt-4 overflow-hidden">
            
            {/* Calendar Grid */}
            <div className="flex-1 bg-white dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-card flex flex-col overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border-light dark:border-border-dark">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            {year}年 {month + 1}月
                            <span className="text-xs font-normal text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 ml-2">28 筆預約</span>
                        </h2>
                        <div className="flex items-center rounded-lg border border-border-light dark:border-border-dark p-0.5 bg-slate-50 dark:bg-slate-800">
                            <button onClick={handlePrevMonth} className="p-1 rounded hover:bg-white dark:hover:bg-surface-dark text-slate-500 hover:shadow-sm transition-all"><span className="material-symbols-outlined text-[20px]">chevron_left</span></button>
                            <button onClick={handleNextMonth} className="p-1 rounded hover:bg-white dark:hover:bg-surface-dark text-slate-500 hover:shadow-sm transition-all"><span className="material-symbols-outlined text-[20px]">chevron_right</span></button>
                        </div>
                    </div>
                    <button onClick={handleToday} className="px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors">回到今天</button>
                </div>
                
                {/* Weekday Header */}
                <div className="grid grid-cols-7 border-b border-border-light dark:border-border-dark bg-slate-50/50 dark:bg-slate-800/50">
                    {['週日', '週一', '週二', '週三', '週四', '週五', '週六'].map(d => (
                        <div key={d} className="py-3 text-center text-xs font-bold text-text-sub uppercase tracking-wider">{d}</div>
                    ))}
                </div>

                {/* Days */}
                <div className="flex-1 grid grid-cols-7 grid-rows-5 overflow-y-auto bg-slate-50/20 dark:bg-slate-900/20">
                    {days.map((d, index) => {
                        if (d.type === 'empty') {
                            return <div key={index} className="border-b border-r border-border-light dark:border-border-dark p-2 min-h-[100px] bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors cursor-pointer group"></div>
                        }

                        // @ts-ignore
                        const dayEvents = events[d.day] || [];
                        // @ts-ignore
                        const isSelected = isSameDay(d.date, selectedDate);
                        
                        return (
                             <div 
                                key={index} 
                                onClick={() => {
                                    // @ts-ignore
                                    setSelectedDate(d.date)
                                }}
                                className={`
                                    border-b border-r border-border-light dark:border-border-dark p-2 min-h-[100px] 
                                    transition-colors cursor-pointer group relative
                                    ${isSelected 
                                        ? 'bg-blue-50/40 dark:bg-primary/5 hover:bg-blue-50/60 dark:hover:bg-primary/10 ring-1 ring-inset ring-primary/30 z-10' 
                                        : 'bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-slate-800/30'
                                    }
                                `}
                            >
                                <span className={`
                                    flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold 
                                    ${isSelected ? 'bg-primary text-white shadow-sm' : 'text-slate-700 dark:text-slate-300'}
                                `}>
                                    {d.day}
                                </span>
                                <div className="mt-2 flex flex-col gap-1">
                                    {dayEvents.map((ev: any, evIdx: number) => (
                                        <div key={evIdx} className={`
                                            px-2 py-1 rounded text-[11px] font-medium truncate shadow-sm
                                            ${ev.color === 'red' ? 'bg-red-100 text-red-700 border border-red-200 opacity-70' : 
                                              ev.color === 'orange' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                                              ev.color === 'emerald' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                                              'bg-slate-100 text-slate-700 border border-slate-200'}
                                        `}>
                                            {ev.time} {ev.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Sidebar Schedule */}
            <div className="w-full xl:w-[360px] flex-shrink-0 flex flex-col gap-5 h-full">
                <div className="bg-white dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-card flex flex-col h-full overflow-hidden">
                    <div className="p-5 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                        <div>
                            <h3 className="font-bold text-slate-800 dark:text-white text-base">
                                {selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月{selectedDate.getDate()}日
                            </h3>
                            <p className="text-xs text-text-sub mt-0.5">
                                {/* @ts-ignore */}
                                今日共有 {events[selectedDate.getDate()]?.length || 0} 筆預約
                            </p>
                        </div>
                        <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs font-bold">
                            {['週日', '週一', '週二', '週三', '週四', '週五', '週六'][selectedDate.getDay()]}
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-5 space-y-4">
                        {/* Selected Date Appointments */}
                        {/* @ts-ignore */}
                        {events[selectedDate.getDate()] ? (
                             // @ts-ignore
                             events[selectedDate.getDate()].map((ev, idx) => (
                                <div key={idx} className="group relative">
                                    <div className="absolute -left-5 top-0 bottom-0 w-1 bg-primary rounded-r-full"></div>
                                    <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 dark:bg-primary/10 shadow-sm transition-all hover:shadow-md hover:border-primary/40">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-1.5 text-primary">
                                                <span className="material-symbols-outlined text-[16px]">schedule</span>
                                                <span className="text-xs font-bold tracking-wide">{ev.time} - {parseInt(ev.time)+2}:00</span>
                                            </div>
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 font-medium border border-orange-200 dark:border-orange-800">
                                                {ev.color === 'orange' ? '待確認' : '已確認'}
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1">
                                            {ev.color === 'red' ? '一對一指導' : '全口假牙雕刻入門'}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-3">
                                            <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-xs font-bold ring-2 ring-white dark:ring-surface-dark">
                                                {ev.name[0]}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{ev.name}</span>
                                                <span className="text-[10px] text-text-sub">student@example.com</span>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-dashed border-primary/20 flex gap-2">
                                            <button className="flex-1 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-transparent hover:border-border-light dark:hover:border-border-dark transition-all shadow-sm">查看詳情</button>
                                            <button className="flex-1 py-1.5 text-xs font-medium text-primary dark:text-primary hover:bg-primary hover:text-white rounded-lg bg-white/50 dark:bg-slate-800/50 border border-transparent hover:border-primary transition-all shadow-sm">編輯預約</button>
                                        </div>
                                    </div>
                                </div>
                             ))
                        ) : (
                            <div className="text-center text-text-sub py-10">
                                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">event_busy</span>
                                <p className="text-sm">今日無預約</p>
                            </div>
                        )}

                       <div className="relative py-2">
                            <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border-light dark:border-border-dark"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-white dark:bg-surface-dark px-3 text-xs font-medium text-text-sub">接下來的行程</span>
                            </div>
                        </div>

                         {/* Mock Upcoming items */}
                        <div className="p-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark hover:border-primary/50 transition-all hover:shadow-sm group cursor-pointer">
                            <div className="flex justify-between items-start mb-1.5">
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-slate-800 dark:text-white">10月29日 (週日)</span>
                                    <span className="text-xs text-text-sub mt-0.5">09:30 - 12:30</span>
                                </div>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 font-medium border border-emerald-200 dark:border-emerald-800">已確認</span>
                            </div>
                            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 truncate">進階局部活動假牙</h4>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center text-[10px] font-bold">林</div>
                                <span className="text-xs text-text-sub">林大山</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-5 text-white shadow-lg shadow-primary/20 relative overflow-hidden m-5 mt-0">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="flex items-center justify-between mb-3 relative z-10">
                            <span className="text-xs font-medium text-white/90">本月待確認收入</span>
                            <span className="material-symbols-outlined text-[20px] text-white/80">payments</span>
                        </div>
                        <div className="text-2xl font-bold tracking-tight relative z-10">NT$ 12,800</div>
                        <div className="mt-4 flex items-center gap-2 relative z-10">
                            <span className="text-[10px] bg-white/20 px-2 py-1 rounded backdrop-blur-sm">3 筆款項待處理</span>
                            <button className="ml-auto text-xs font-bold hover:underline">查看詳情</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
