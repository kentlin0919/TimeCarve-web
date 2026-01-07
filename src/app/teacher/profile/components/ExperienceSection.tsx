import React, { useState } from "react";
import {
  TeacherExperience,
  CreateTeacherExperienceDTO,
  UpdateTeacherExperienceDTO,
} from "@/lib/domain/teacher/experience";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { ExperienceFormModal } from "./ExperienceFormModal";
import { SupabaseTeacherExperienceRepository } from "@/lib/infrastructure/teacher/SupabaseTeacherExperienceRepository";
import { supabase } from "@/lib/supabase";

interface Props {
  teacherId: string;
  experiences: TeacherExperience[];
  onUpdate: () => void; // Callback to refresh data in parent
}

export function ExperienceSection({ teacherId, experiences, onUpdate }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TeacherExperience | undefined>(
    undefined
  );
  const repository = new SupabaseTeacherExperienceRepository(supabase);

  const handleCreate = async (data: CreateTeacherExperienceDTO) => {
    await repository.addExperience(teacherId, data);
    onUpdate();
  };

  const handleUpdate = async (data: CreateTeacherExperienceDTO) => {
    if (!editingItem) return;
    await repository.updateExperience(editingItem.id, data);
    onUpdate();
  };

  const handleDelete = async (id: string) => {
    if (confirm("確定要刪除此經歷嗎？")) {
      await repository.deleteExperience(id);
      onUpdate();
    }
  };

  const openAddModal = () => {
    setEditingItem(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (item: TeacherExperience) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-border-light dark:border-border-dark">
      <div className="flex items-center justify-between mb-8 border-b border-border-light dark:border-border-dark pb-3">
        <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <span>工作經歷</span>
          <span className="text-xs font-normal text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
            {experiences.length}
          </span>
        </h3>
        <button
          onClick={openAddModal}
          className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-base">add</span>
          新增經歷
        </button>
      </div>

      <div className="relative pl-2">
        {experiences.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
            <span className="material-symbols-outlined text-4xl mb-2 opacity-50">
              history_edu
            </span>
            <p>尚未新增工作經歷</p>
            <button
              onClick={openAddModal}
              className="mt-2 text-primary hover:underline hover:text-primary-dark"
            >
              立即新增
            </button>
          </div>
        ) : (
          <div className="space-y-0">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative group/item">
                <TimelineItem
                  startDate={exp.start_date}
                  endDate={exp.end_date}
                  title={exp.title}
                  subtitle={exp.organization}
                  description={exp.description}
                  type="work"
                  isCurrent={exp.is_current}
                />

                {/* Actions overlay */}
                <div className="absolute top-4 right-4 opacity-0 group-hover/item:opacity-100 transition-opacity flex gap-2">
                  <button
                    onClick={() => openEditModal(exp)}
                    className="p-1.5 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full shadow-sm border border-gray-100 dark:border-gray-600 hover:text-primary hover:border-primary transition-colors"
                    title="編輯"
                  >
                    <span className="material-symbols-outlined text-base">
                      edit
                    </span>
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="p-1.5 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full shadow-sm border border-gray-100 dark:border-gray-600 hover:text-red-500 hover:border-red-500 transition-colors"
                    title="刪除"
                  >
                    <span className="material-symbols-outlined text-base">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ExperienceFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={editingItem ? handleUpdate : handleCreate}
        initialData={editingItem}
      />
    </div>
  );
}
