"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { SupabaseTeacherRepository } from "@/lib/infrastructure/teacher/SupabaseTeacherRepository";
import { TeacherProfile } from "@/lib/domain/teacher/entity";
import TeacherProfileForm from "./TeacherProfileForm";

export default function TeacherProfileSettingsPage() {
  const [profile, setProfile] = useState<TeacherProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const repository = new SupabaseTeacherRepository();

  useEffect(() => {
    async function loadData() {
      // const supabase = createClient(); // Use global instance imported above
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const data = await repository.getProfile(user.id);
        setProfile(data);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-10 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return <div className="p-10 text-center">無法載入教師資料。</div>;
  }

  const handleSave = async (updated: Partial<TeacherProfile>) => {
    await repository.updateProfile(profile.id, updated);
    // Refresh
    const newData = await repository.getProfile(profile.id);
    if (newData) setProfile(newData);
  };

  const handleAddEducation = async (edu: any) => {
    // Placeholder: Need to implement a modal for adding education to use this
    // For now the UI doesn't expose the Add button's full form
    return await repository.addEducation(profile.id, edu);
  };

  const handleDeleteEducation = async (id: string) => {
    if (confirm("確定要刪除此學歷嗎？")) {
      await repository.deleteEducation(id);
      const newData = await repository.getProfile(profile.id);
      if (newData) setProfile(newData);
    }
  };

  return (
    <div className="p-6 md:p-10 h-full overflow-y-auto">
      <TeacherProfileForm
        initialProfile={profile}
        onSave={handleSave}
        onAddEducation={handleAddEducation}
        onDeleteEducation={handleDeleteEducation}
      />
    </div>
  );
}
