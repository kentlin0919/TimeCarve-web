'use client';

import React, { useState } from 'react';

// Mock Data
type PublicCourse = {
    id: string;
    title: string;
    desc: string;
    price: number;
    duration: string;
    level: string;
    tags: string[];
    thumbnail: string;
};

const MOCK_COURSES: PublicCourse[] = [
    {
        id: 'c1',
        title: '牙體形態學基礎班',
        desc: '適合初學者，從最基礎的握刀、識圖開始，逐步掌握牙體形態的奧秘。',
        price: 8000,
        duration: '8 小時',
        level: '入門',
        tags: ['小班制', '附工具'],
        thumbnail: 'bg-blue-100'
    },
    {
        id: 'c2',
        title: '進階後牙隆起與咬合面雕刻',
        desc: '專為準備國考或精進技術的同學設計，深入探討大臼齒的咬合面特徵。',
        price: 12500,
        duration: '12 小時',
        level: '進階',
        tags: ['國考重點', '實作導向'],
        thumbnail: 'bg-indigo-100'
    },
    {
        id: 'c3',
        title: '全口假牙排牙實務',
        desc: '週末密集工作坊，兩天時間帶你完成一副全口假牙的排牙操作。',
        price: 18000,
        duration: '16 小時',
        level: '進階',
        tags: ['工作坊', '密集訓練'],
        thumbnail: 'bg-orange-100'
    }
];

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<PublicCourse | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">精選課程方案</h1>
            <p className="text-lg text-text-sub max-w-2xl mx-auto">
                我們提供從入門到進階的完整牙體技術課程，無論您是初學者還是執業牙技師，都能在這裡找到適合的學習資源。
            </p>
        </header>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_COURSES.map(course => (
                <div 
                    key={course.id} 
                    onClick={() => setSelectedCourse(course)}
                    className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-border-light dark:border-border-dark flex flex-col"
                >
                    <div className={`aspect-video ${course.thumbnail} relative overflow-hidden flex items-center justify-center`}>
                        <span className="material-symbols-outlined text-6xl text-white/50">school</span>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="px-6 py-2 bg-white/90 text-slate-900 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">
                                查看詳情
                            </span>
                        </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-xs font-bold px-2 py-1 bg-primary/10 text-primary rounded-md">{course.level}</span>
                            <span className="text-lg font-bold text-slate-800 dark:text-white">NT$ {course.price.toLocaleString()}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                        <p className="text-text-sub text-sm line-clamp-2 mb-4 flex-1">{course.desc}</p>
                        <div className="flex items-center gap-4 text-xs text-text-sub pt-4 border-t border-border-light dark:border-border-dark">
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> {course.duration}</span>
                            <div className="flex gap-2 ml-auto">
                                {course.tags.map(tag => (
                                    <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
              <div 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
              >
                  <button 
                    onClick={() => setSelectedCourse(null)}
                    className="absolute top-4 right-4 p-2 bg-white/50 dark:bg-black/50 rounded-full hover:bg-white dark:hover:bg-black transition-colors z-10"
                  >
                      <span className="material-symbols-outlined">close</span>
                  </button>

                  <div className={`h-64 ${selectedCourse.thumbnail} w-full relative flex items-center justify-center`}>
                      <span className="material-symbols-outlined text-8xl text-white/30">school</span>
                      <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                          <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-lg mb-2">{selectedCourse.level}</span>
                          <h2 className="text-3xl font-bold text-white">{selectedCourse.title}</h2>
                      </div>
                  </div>

                  <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="md:col-span-2 space-y-6">
                          <div>
                              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">課程介紹</h3>
                              <p className="text-slate-600 dark:text-gray-300 leading-relaxed">{selectedCourse.desc}</p>
                              <p className="text-slate-600 dark:text-gray-300 leading-relaxed mt-4">
                                  本課程將透過系統化的教學，帶領學員一步步掌握核心技術。課程內容包含理論講解與大量的實作練習，確保每位學員都能在課後具備獨立操作的能力。
                              </p>
                          </div>
                          <div>
                              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">適合對象</h3>
                              <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-gray-300">
                                  <li>牙體技術系學生</li>
                                  <li>準備國家考試的考生</li>
                                  <li>希望能精進特定技術的執業牙技師</li>
                              </ul>
                          </div>
                      </div>

                      <div className="space-y-6">
                          <div className="p-6 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-border-light dark:border-border-dark space-y-4">
                              <div>
                                  <span className="text-sm text-text-sub">課程費用</span>
                                  <div className="text-3xl font-bold text-primary">NT$ {selectedCourse.price.toLocaleString()}</div>
                              </div>
                              <div className="space-y-3 pt-4 border-t border-border-light dark:border-border-dark">
                                  <div className="flex items-center justify-between text-sm">
                                      <span className="text-text-sub flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">schedule</span> 總時長</span>
                                      <span className="font-bold text-slate-700 dark:text-gray-200">{selectedCourse.duration}</span>
                                  </div>
                                  <div className="flex items-center justify-between text-sm">
                                      <span className="text-text-sub flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">group</span> 授課方式</span>
                                      <span className="font-bold text-slate-700 dark:text-gray-200">實體 / 線上</span>
                                  </div>
                              </div>
                              <button className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold shadow-lg shadow-primary/25 transition-all active:scale-95">
                                  立即預約
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}
