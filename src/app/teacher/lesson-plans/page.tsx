'use client';

import React, { useState } from 'react';

// Mock Data
type LessonPlan = {
  id: string;
  title: string;
  subject: string;
  level: string;
  duration: string;
  lastUpdated: string;
  status: 'active' | 'draft';
  content: string;
};

const MOCK_PLANS: LessonPlan[] = [
  {
    id: 'lp1',
    title: '基礎雕刻刀法與握持姿勢',
    subject: '牙體形態學',
    level: '入門',
    duration: '4小時',
    lastUpdated: '2023-11-01',
    status: 'active',
    content: '介紹各種雕刻刀的用途，以及正確的施力方式避免受傷...'
  },
  {
    id: 'lp2',
    title: '上顎中切牙特徵解析',
    subject: '牙體形態學',
    level: '初級',
    duration: '6小時',
    lastUpdated: '2023-10-15',
    status: 'active',
    content: '詳細解說中切牙的三個主要發育葉與舌側隆起...'
  },
  {
    id: 'lp3',
    title: '全口假牙排牙 - 前牙美觀區',
    subject: '全口假牙',
    level: '進階',
    duration: '8小時',
    lastUpdated: '2023-09-20',
    status: 'draft',
    content: '針對美觀區的排牙技巧，包括微笑曲線設定...'
  }
];

export default function LessonPlansPage() {
  const [plans, setPlans] = useState(MOCK_PLANS);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<LessonPlan>>({});

  const selectedPlan = plans.find(p => p.id === selectedPlanId);

  const handleSelect = (id: string) => {
    setSelectedPlanId(id);
    setIsEditing(false);
  };

  const handleEdit = () => {
    if (selectedPlan) {
      setEditForm({ ...selectedPlan });
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (selectedPlan) {
      setPlans(plans.map(p => p.id === selectedPlan.id ? { ...p, ...editForm } as LessonPlan : p));
      setIsEditing(false);
    }
  };

  const handleCreate = () => {
    const newPlan: LessonPlan = {
      id: `new_${Date.now()}`,
      title: '新教案',
      subject: '牙體形態學',
      level: '入門',
      duration: '',
      lastUpdated: new Date().toISOString().split('T')[0],
      status: 'draft',
      content: ''
    };
    setPlans([newPlan, ...plans]);
    setSelectedPlanId(newPlan.id);
    setEditForm(newPlan);
    setIsEditing(true);
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <header className="px-8 py-4 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-surface-light dark:bg-surface-dark sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">教案管理 (Lesson Plans)</h1>
        <button 
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <span className="material-symbols-outlined">add</span>
          新增教案
        </button>
      </header>

      <div className="flex-1 overflow-hidden flex flex-col md:flex-row p-6 gap-6 max-w-[1600px] mx-auto w-full">
        {/* List View */}
        <div className="w-full md:w-1/3 min-w-[300px] flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
             <div className="p-4 border-b border-border-light dark:border-border-dark bg-slate-50 dark:bg-slate-800/50">
                <input 
                  type="text" 
                  placeholder="搜尋教案..."
                  className="w-full px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
             </div>
             <div className="flex-1 overflow-y-auto">
                {plans.map(plan => (
                  <div 
                    key={plan.id}
                    onClick={() => handleSelect(plan.id)}
                    className={`p-4 border-b border-border-light dark:border-border-dark cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 ${selectedPlanId === plan.id ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-slate-800 dark:text-white line-clamp-1">{plan.title}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${plan.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                        {plan.status === 'active' ? '啟用' : '草稿'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-sub">
                       <span>{plan.subject}</span>
                       <span>•</span>
                       <span>{plan.level}</span>
                    </div>
                  </div>
                ))}
             </div>
        </div>

        {/* Detail/Edit View */}
        <div className="flex-1 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden flex flex-col">
           {selectedPlan ? (
             isEditing ? (
               // Edit View
               <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-yellow-50 dark:bg-yellow-900/10">
                    <h2 className="font-bold text-lg flex items-center gap-2 text-yellow-700 dark:text-yellow-500">
                      <span className="material-symbols-outlined">edit</span>
                      編輯模式
                    </h2>
                    <div className="flex gap-2">
                      <button onClick={() => setIsEditing(false)} className="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded">取消</button>
                      <button onClick={handleSave} className="px-3 py-1.5 text-sm bg-primary text-white rounded hover:bg-primary-dark shadow-sm">儲存</button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                     <div>
                       <label className="block text-sm font-medium mb-1">教案標題</label>
                       <input 
                         className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
                         value={editForm.title}
                         onChange={e => setEditForm({...editForm, title: e.target.value})}
                       />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">科目</label>
                          <input 
                            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
                            value={editForm.subject}
                            onChange={e => setEditForm({...editForm, subject: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">難度等級</label>
                          <select 
                             className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
                             value={editForm.level}
                             onChange={e => setEditForm({...editForm, level: e.target.value})}
                          >
                             <option>入門</option>
                             <option>初級</option>
                             <option>中級</option>
                             <option>進階</option>
                          </select>
                        </div>
                     </div>
                     <div>
                       <label className="block text-sm font-medium mb-1">內容重點</label>
                       <textarea 
                         className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 h-64 resize-none"
                         value={editForm.content}
                         onChange={e => setEditForm({...editForm, content: e.target.value})}
                       />
                     </div>
                     <div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox"
                            checked={editForm.status === 'active'}
                            onChange={e => setEditForm({...editForm, status: e.target.checked ? 'active' : 'draft'})}
                          />
                          <span className="text-sm">發布此教案</span>
                        </label>
                     </div>
                  </div>
               </div>
             ) : (
               // Detail View
               <div className="flex flex-col h-full">
                 <div className="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-700 text-text-sub">{selectedPlan.subject}</span>
                        <span className="text-sm text-text-sub">{selectedPlan.lastUpdated}</span>
                      </div>
                      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{selectedPlan.title}</h1>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400">
                           {selectedPlan.duration}
                        </span>
                        <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded border border-purple-100 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-400">
                           {selectedPlan.level}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={handleEdit}
                      className="flex items-center gap-1 px-4 py-2 border border-border-light dark:border-border-dark rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">edit</span>
                      <span>編輯</span>
                    </button>
                 </div>
                 <div className="flex-1 p-8 overflow-y-auto">
                    <div className="prose dark:prose-invert max-w-none">
                       <h3>內容重點</h3>
                       <p>{selectedPlan.content || '暫無內容'}</p>
                    </div>
                 </div>
               </div>
             )
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-text-sub">
               <span className="material-symbols-outlined text-6xl mb-4 opacity-50">description</span>
               <p>請從左側選擇教案</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
