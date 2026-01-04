'use client';

import React, { useState } from 'react';

// Mock Data Type
type PortfolioWork = {
    id: string;
    title: string;
    category: string;
    date: string;
    desc: string;
    status: 'published' | 'draft' | 'archived';
    thumbnail: string | null;
    views: number;
    likes: number;
    tags: string[];
    progress?: number; // Only for drafts
};

const MOCK_WORKS: PortfolioWork[] = [
    {
        id: 'w1',
        title: '全口假牙排牙展示 - 正面視角',
        category: '全口假牙',
        date: '2023/10/24',
        desc: '本次展示重點在於正中門牙的定位與微笑曲線的建立，特別針對初學者容易忽略的細節進行解析。',
        status: 'published',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB34IKL7u17ygOFRLqK5yi8J1yCUUAqyTBVmJza6JdGwICXiRCudupRNV2072edZpONWN89vl4E70DozsNkSFd1WmipGaH5GE05zUufnxxlyrXLP1JFdZBE_w9sqsgSnSmftupGlJQf8DEj9wmuMQTrlRm1hDk8go8ssAUtO7sWsIz2BzMSyWGSm-Qhv10kGO54KOwz7mL12DiaA8srewJnC7lwUmCFEuuAv5hTzseaHLadhweHoLhuxnP72E1xzijgbB9qWUuEtgc',
        views: 1200,
        likes: 86,
        tags: ['排牙', '美觀']
    },
    {
        id: 'w2',
        title: '上顎第一大臼齒 - 蠟型雕刻',
        category: '牙體形態',
        date: '2023/10/20',
        desc: '深入探討大臼齒的咬合面形態，包含主要與次要溝隙的雕刻技巧。',
        status: 'draft',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX0FMNgFJrsqFdoZEhQ8Ni6g5q4wyI9oPzCN586oP2P2Xc6Y2faMNwozGVLPzYIFwOouywCCxuin4ImJ8IdI25xoasYmOuAjeXj7YjZw4_dOWpTKEe4piKOsHXmgBjNf99-F-RUWi0xoBlp6z8rqcGpcq_KlFnPPycWju8idxlkeexIX1PV-sk9IFnr7qkSQ-vLysHoyteMdVSvWxkspUkXA1sPkETcbNiWfUHaWn_u1o3ZLpMoELIO-7RIXeyWWXn_vwPka1zRmo',
        views: 0,
        likes: 0,
        tags: ['蠟型'],
        progress: 60
    },
    {
        id: 'w3',
        title: 'RPD 設計原則 - Class I 案例',
        category: '活動假牙',
        date: '2023/10/15',
        desc: '針對甘迺迪第一類缺牙情況的設計考量，包含鉤靠選擇與義齒基底延伸範圍的教學影片。',
        status: 'published',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOTrFUpRP3m44ZddGLRHq8MXcOn10o2HwLijwNESRFd6IbyA6mzA8bKp3flQVjCx3jILi8hRJUKKTHiyoPkGCAhRWT_2NRJh82Ql269nDAJrHrziW8ExB2XYvlFEWONn-GoZVt3l1lWpldUeWGL0KYP-SfLKighWXsWivoSJR0MNwBcYV_zkzFH4dZvqRihvotkcSXCT3b1vKm4NuNAXIdUQcY3Pt5k8qe5LsOPe2DlzcaZ2Cp5ZiJxTTXmz38AHTR8MMWbn9ZstA',
        views: 3400,
        likes: 215,
        tags: ['影片', '設計']
    },
    {
        id: 'w4',
        title: '金屬支架鑄造流程',
        category: '活動假牙',
        date: '2023/09/28',
        desc: '詳細記錄了從包埋到鑄造完成的每一個步驟，以及失敗案例的分析檢討。',
        status: 'archived',
        thumbnail: null,
        views: 120,
        likes: 5,
        tags: ['鑄造']
    }
];

export default function TeacherPortfolioPage() {
  const [works, setWorks] = useState<PortfolioWork[]>(MOCK_WORKS);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedWorkId, setSelectedWorkId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<PortfolioWork>>({});
  const [saving, setSaving] = useState(false);

  // Edit Handlers
  const handleEditClick = (workId: string) => {
      const work = works.find(w => w.id === workId);
      if (work) {
          setSelectedWorkId(workId);
          setEditForm({ ...work });
          setIsEditing(true);
      }
  };

  const handleCreateClick = () => {
    const newWork: PortfolioWork = {
        id: `new_${Date.now()}`,
        title: '新作品集',
        category: '全口假牙',
        date: new Date().toLocaleDateString(),
        desc: '',
        status: 'draft',
        thumbnail: null,
        views: 0,
        likes: 0,
        tags: []
    };
    setSelectedWorkId(newWork.id);
    setEditForm(newWork);
    setIsEditing(true);
  };

  const handleSave = async () => {
      setSaving(true);
      
      // Simulate API
      await new Promise(resolve => setTimeout(resolve, 800));

      setWorks(prev => {
          if (selectedWorkId && prev.find(w => w.id === selectedWorkId)) {
              return prev.map(w => w.id === selectedWorkId ? { ...w, ...editForm } as PortfolioWork : w);
          } else {
              return [editForm as PortfolioWork, ...prev];
          }
      });

      setIsEditing(false);
      setSaving(false);
      setSelectedWorkId(null);
  };

  const selectedWork = works.find(w => w.id === selectedWorkId);

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Header */}
      <header className="w-full bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark px-8 py-4 flex justify-between items-center sticky top-0 z-10 transition-all">
        <div className="flex flex-col">
          <h2 className="text-slate-800 dark:text-white text-2xl font-bold tracking-tight">作品集管理</h2>
          <p className="text-text-sub dark:text-gray-400 text-sm mt-1">管理您的假牙雕刻展示作品，向學生展現專業技藝。</p>
        </div>
        {!isEditing && (
            <div className="flex items-center gap-3">
            <button 
                onClick={handleCreateClick}
                className="flex items-center justify-center gap-2 rounded-lg h-10 px-6 bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 text-sm font-bold transition-all active:scale-95"
            >
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                <span>新增作品</span>
            </button>
            </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-6 pb-20">
          
          {isEditing ? (
              // ========== EDIT MODE ==========
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-card p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-border-light dark:border-border-dark">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                          {selectedWorkId?.startsWith('new_') ? '新增作品集' : '編輯作品內容'}
                      </h3>
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="text-text-sub hover:text-slate-800 dark:hover:text-white transition-colors"
                      >
                          <span className="material-symbols-outlined">close</span>
                      </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Left: Metadata */}
                      <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-gray-300">作品名稱</label>
                                <input 
                                    className="w-full px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-700/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" 
                                    value={editForm.title || ''}
                                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-gray-300">簡短描述</label>
                                <textarea 
                                    className="w-full px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-700/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none h-32" 
                                    value={editForm.desc || ''}
                                    onChange={(e) => setEditForm({...editForm, desc: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                               <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-gray-300">分類</label>
                                    <select 
                                        className="w-full px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-700/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                        value={editForm.category}
                                        onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                                    >
                                        <option>全口假牙</option>
                                        <option>活動假牙</option>
                                        <option>牙體形態</option>
                                        <option>其他</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-gray-300">發布狀態</label>
                                    <select 
                                        className="w-full px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-700/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                        value={editForm.status}
                                        onChange={(e) => setEditForm({...editForm, status: e.target.value as any})}
                                    >
                                        <option value="published">已發布</option>
                                        <option value="draft">草稿</option>
                                        <option value="archived">已封存</option>
                                    </select>
                                </div>
                            </div>
                      </div>

                      {/* Right: Media & Preview */}
                      <div className="space-y-6">
                           <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-gray-300">封面圖片 (URL)</label>
                                <div className="flex gap-2">
                                    <input 
                                        className="flex-1 px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-700/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-xs" 
                                        value={editForm.thumbnail || ''}
                                        placeholder="https://..."
                                        onChange={(e) => setEditForm({...editForm, thumbnail: e.target.value})}
                                    />
                                    <button className="px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-text-sub hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined">image</span>
                                    </button>
                                </div>
                           </div>
                           
                           {/* Preview Box */}
                           <div className="border-2 border-dashed border-border-light dark:border-border-dark rounded-xl aspect-video flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 overflow-hidden relative group">
                                {editForm.thumbnail ? (
                                    <img src={editForm.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-text-sub">
                                        <span className="material-symbols-outlined text-4xl">image_not_supported</span>
                                        <span className="text-sm">尚未設定封面</span>
                                    </div>
                                )}
                           </div>
                      </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-border-light dark:border-border-dark">
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2.5 rounded-lg border border-border-light dark:border-border-dark text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium"
                      >
                          取消
                      </button>
                      <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 font-bold transition-all active:scale-95 disabled:opacity-50"
                      >
                          {saving ? '儲存中...' : '儲存變更'}
                      </button>
                  </div>
              </div>
          ) : (
            // ========== GRID VIEW ==========
            <>
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                    {/* (Existing Filters Code - Simplified for brevity) */}
                    <div className="flex flex-1 w-full md:w-auto items-center gap-2">
                        <div className="relative w-full md:w-80">
                            <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-sub">search</span>
                            <input className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50 outline-none" placeholder="搜尋作品..." type="text"/>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {works.map(work => (
                        <div key={work.id} className="group bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
                            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
                                {work.thumbnail ? (
                                    <img 
                                        alt={work.title} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                        src={work.thumbnail}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                         <span className="material-symbols-outlined text-slate-300 text-6xl">image_not_supported</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <button 
                                        onClick={() => handleEditClick(work.id)}
                                        className="p-2 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg" 
                                        title="編輯"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                    </button>
                                </div>
                                <div className="absolute top-3 right-3">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold backdrop-blur-sm border ${
                                        work.status === 'published' ? 'bg-green-100 text-green-700 border-green-200' :
                                        work.status === 'draft' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                                        'bg-slate-200 text-slate-700 border-slate-300'
                                    }`}>
                                        {work.status === 'published' ? '已發布' : work.status === 'draft' ? '草稿' : '封存'}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex items-start justify-between mb-2">
                                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">{work.category}</span>
                                    <span className="text-xs text-text-sub">{work.date}</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">{work.title}</h3>
                                <p className="text-sm text-text-sub line-clamp-2 mb-4">
                                    {work.desc || '暫無描述'}
                                </p>
                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-border-light dark:border-border-dark">
                                    <div className="flex items-center gap-3 text-xs text-text-sub">
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">visibility</span> {work.views}</span>
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">favorite</span> {work.likes}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div 
                        onClick={handleCreateClick}
                        className="group border-2 border-dashed border-border-light dark:border-border-dark rounded-2xl flex flex-col items-center justify-center p-8 text-center text-text-sub hover:border-primary hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer min-h-[350px]"
                    >
                        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/10 flex items-center justify-center mb-4 transition-colors">
                            <span className="material-symbols-outlined text-3xl">add</span>
                        </div>
                        <h3 className="font-bold text-lg mb-1">新增作品集</h3>
                        <p className="text-sm max-w-[200px]">開始創建新的假牙雕刻展示作品</p>
                    </div>
                </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
