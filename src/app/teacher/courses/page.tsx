"use client";

import React, { useState, useEffect } from "react";
import { useModal } from "@/components/providers/ModalContext";

import { Course, CourseSection } from "@/lib/domain/course/entity";
import { SupabaseCourseRepository } from "@/lib/infrastructure/course/SupabaseCourseRepository";
import { SupabaseAuthRepository } from "@/lib/infrastructure/auth/SupabaseAuthRepository";
import CourseDetailForm from "./CourseDetailForm";

export default function TeacherCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { showModal } = useModal();

  // Edit Mode State
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState<Partial<Course>>({});
  const [activeTab, setActiveTab] = useState<"info" | "content">("info"); // Tab state

  // Load courses on mount
  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      try {
        const authRepo = new SupabaseAuthRepository();
        const courseRepo = new SupabaseCourseRepository();
        const user = await authRepo.getUser();

        if (user) {
          const data = await courseRepo.getTeacherCourses(user.id);
          setCourses(data);
          if (data.length > 0) {
            setSelectedCourseId(data[0].id);
          }
        }
      } catch (error) {
        console.error("Error loading courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  // When selected course changes, reset edit mode
  useEffect(() => {
    setIsEditing(false);
    setActiveTab("info");
  }, [selectedCourseId]);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId);

  const handleEditClick = () => {
    if (!selectedCourse) return;
    setEditForm(JSON.parse(JSON.stringify(selectedCourse)));
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsCreating(false);
    setEditForm({});
  };

  const handleSaveCourse = async (formData: Partial<Course>) => {
    setSaving(true);
    try {
      const courseRepo = new SupabaseCourseRepository();

      if (isCreating) {
        const authRepo = new SupabaseAuthRepository();
        const user = await authRepo.getUser();
        if (!user) return;

        const newCourseData = {
          teacherId: user.id,
          title: formData.title || "未命名課程",
          desc: formData.desc || "",
          content: formData.content || "",
          courseType: formData.courseType || "1-on-1",
          durationMinutes: formData.durationMinutes || 60,
          price: formData.price || 0,
          isActive: formData.isActive || false, // Default from form shouldn't override unless set
          status: formData.status || "draft",
          sections: formData.sections || [],
          tags: formData.tags || [],
          icon: formData.icon || "school",
          iconColor: formData.iconColor || "blue",
          priceUnit: formData.priceUnit || "小時",
        };

        const createdCourse = await courseRepo.createCourse(newCourseData);
        if (createdCourse) {
          setCourses((prev) => [createdCourse, ...prev]);
          setSelectedCourseId(createdCourse.id);
          showModal({
            title: "成功",
            description: "課程建立成功",
            confirmText: "確定",
          });
          setIsCreating(false);
        }
      } else {
        // Validation: Ensure ID exists
        if (!formData.id && selectedCourse?.id) {
          // Fallback to selected ID if form doesn't have it (it should based on editForm init)
          // But actually formData is partial from form state, might lack ID if not passed
          // Let's us selectedCourse.id
        }

        const targetId = formData.id || selectedCourse?.id;
        if (!targetId) return;

        const updatedCourse = await courseRepo.updateCourse(targetId, formData);

        if (updatedCourse) {
          setCourses((prev) =>
            prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c))
          );
          showModal({
            title: "成功",
            description: "儲存成功",
            confirmText: "確定",
          });
          setIsEditing(false);
        }
      }
    } catch (error) {
      console.error("Error saving course:", error);
      showModal({
        title: "錯誤",
        description: "儲存失敗，請稍後再試",
        confirmText: "確定",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCreateCourse = () => {
    setEditForm({
      title: "",
      price: 0,
      priceUnit: "小時",
      desc: "",
      status: "draft",
      sections: [],
    });
    setIsCreating(true);
    setIsEditing(false);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.desc || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isEditing || isCreating) {
    return (
      <CourseDetailForm
        initialData={editForm}
        isCreating={isCreating}
        onSave={handleSaveCourse}
        onCancel={handleCancel}
        saving={saving}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Header */}
      <header className="w-full bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark px-8 py-4 flex justify-between items-center sticky top-0 z-10 transition-all">
        <div className="flex flex-col">
          <h2 className="text-slate-800 dark:text-white text-xl font-bold tracking-tight flex items-center gap-2">
            課程方案管理
          </h2>
          <p className="text-text-sub dark:text-gray-400 text-sm mt-0.5">
            共 <span className="text-primary font-bold">{courses.length}</span>{" "}
            個課程方案
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <input
              className="pl-10 pr-4 py-2 w-64 rounded-lg border border-border-light dark:border-border-dark bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none"
              placeholder="搜尋課程名稱..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-sub group-focus-within:text-primary text-[18px] transition-colors">
              search
            </span>
          </div>

          <button
            onClick={handleCreateCourse}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-95 font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            新增教案
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-6 pb-10">
          {/* Two-Column Layout */}
          <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)] min-h-[600px]">
            {/* Left ListView */}
            <div className="lg:w-1/3 flex flex-col bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-card overflow-hidden">
              <div className="p-4 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-slate-700 shadow-sm text-slate-800 dark:text-white border border-border-light dark:border-border-dark">
                    全部
                  </button>
                  <button className="px-3 py-1.5 text-xs font-medium rounded-lg hover:bg-white dark:hover:bg-slate-700 text-text-sub transition-colors">
                    啟用中
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="divide-y divide-border-light dark:divide-border-dark">
                  {filteredCourses.map((course) => {
                    const isSelected = selectedCourseId === course.id;
                    const isActive = course.status === "active";

                    return (
                      <div
                        key={course.id}
                        onClick={() => setSelectedCourseId(course.id)}
                        className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors border-l-4 ${
                          isSelected
                            ? "border-primary bg-blue-50/50 dark:bg-blue-900/10"
                            : "border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`size-12 rounded-lg bg-${
                              course.iconColor || "blue"
                            }-100 dark:bg-${
                              course.iconColor || "blue"
                            }-900/30 text-${
                              course.iconColor || "blue"
                            }-600 dark:text-${
                              course.iconColor || "blue"
                            }-400 flex items-center justify-center flex-shrink-0 shadow-sm`}
                          >
                            <span className="material-symbols-outlined">
                              {course.icon || "school"}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate pr-2">
                                {course.title}
                              </h4>
                              {isActive ? (
                                <span
                                  className="material-symbols-outlined text-[14px] text-green-500"
                                  title="啟用中"
                                >
                                  check_circle
                                </span>
                              ) : (
                                <span
                                  className="material-symbols-outlined text-[14px] text-slate-400"
                                  title="草稿"
                                >
                                  edit_document
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-text-sub truncate mt-0.5">
                              {course.priceUnit || "小時"} • $
                              {course.price?.toLocaleString() || 0}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Panel - View or Edit */}
            <div className="lg:w-2/3 bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-card flex flex-col overflow-hidden">
              {selectedCourse ? (
                // ========== VIEW MODE ==========
                <>
                  <div className="p-8 border-b border-border-light dark:border-border-dark bg-slate-50/30 dark:bg-slate-800/30">
                    <div className="flex items-start gap-5">
                      <div
                        className={`size-20 rounded-2xl bg-${selectedCourse.iconColor}-100 dark:bg-${selectedCourse.iconColor}-900/30 text-${selectedCourse.iconColor}-600 dark:text-${selectedCourse.iconColor}-400 flex items-center justify-center flex-shrink-0 shadow-sm`}
                      >
                        <span className="material-symbols-outlined text-4xl">
                          {selectedCourse.icon}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                              {selectedCourse.title}
                            </h2>
                            <div className="flex items-center gap-2 mt-2">
                              {selectedCourse.status === "active" ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                  啟用中
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-gray-300 border border-slate-300 dark:border-slate-600">
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                                  草稿
                                </span>
                              )}
                              <span className="text-text-sub text-sm border-l border-border-light dark:border-border-dark pl-2 ml-1">
                                ID: {selectedCourse.id}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={handleEditClick}
                            className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 font-bold text-sm transition-all active:scale-95 flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              edit_square
                            </span>
                            編輯
                          </button>
                        </div>
                        <p className="text-text-sub mt-4 text-sm leading-relaxed max-w-2xl">
                          {selectedCourse.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-8 bg-surface-light dark:bg-surface-dark">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h3 className="font-bold text-slate-800 dark:text-white border-b pb-2">
                          課程細節
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-border-light dark:border-border-dark">
                            <p className="text-xs text-text-sub mb-1">
                              價格設定
                            </p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">
                              NT$ {(selectedCourse.price || 0).toLocaleString()}
                            </p>
                            <p className="text-xs text-text-sub mt-0.5">
                              /{selectedCourse.priceUnit || "小時"}
                            </p>
                          </div>
                        </div>
                        {/* Duration Card Removed */}
                        <div>
                          <h4 className="text-xs font-bold text-text-sub uppercase mb-2">
                            標籤
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {(selectedCourse.tags || []).map((tag, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-gray-300 border border-border-light dark:border-border-dark"
                              >
                                <span className="material-symbols-outlined text-[14px]">
                                  {tag.icon}
                                </span>
                                {tag.text}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h3 className="font-bold text-slate-800 dark:text-white border-b pb-2 flex items-center justify-between">
                          <span>
                            課程章節 ({selectedCourse.sections?.length || 0})
                          </span>
                        </h3>

                        <div className="space-y-3">
                          {!selectedCourse.sections ||
                          selectedCourse.sections.length === 0 ? (
                            <p className="text-text-sub text-sm">
                              尚未建立任何章節
                            </p>
                          ) : (
                            selectedCourse.sections.map((section, idx) => (
                              <div
                                key={section.id}
                                className="p-4 rounded-xl border border-border-light dark:border-border-dark hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                                    {section.title}
                                  </h4>
                                </div>
                                <p className="text-xs text-text-sub line-clamp-2">
                                  {section.content || "尚無內容描述..."}
                                </p>
                              </div>
                            ))
                          )}
                        </div>

                        <div className="pt-4 mt-4 border-t border-border-light dark:border-border-dark">
                          <button className="w-full p-4 rounded-xl border border-dashed border-border-light dark:border-border-dark flex items-center justify-center gap-2 text-primary hover:bg-primary/5 transition-colors">
                            <span className="material-symbols-outlined">
                              visibility
                            </span>
                            預覽學生端頁面
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                  <span className="material-symbols-outlined text-6xl mb-4">
                    library_books
                  </span>
                  <p>請選擇一個課程方案</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
