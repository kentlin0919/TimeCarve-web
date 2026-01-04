import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import TeacherShell from "./components/TeacherShell";
import { User } from "@/lib/domain/auth/repository";

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user: authUser },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !authUser) {
    redirect("/auth/login?redirect=/teacher/dashboard");
  }

  // Fetch user_info
  const { data: userInfo, error: userInfoError } = await supabase
    .from("user_info")
    .select("*")
    .eq("id", authUser.id)
    .single();

  if (userInfoError || !userInfo) {
    redirect("/auth/login");
  }

  // Map to Domain User
  const user: User = {
    id: authUser.id,
    email: authUser.email!,
    role: authUser.role,
    emailConfirmedAt: authUser.email_confirmed_at,
    name: userInfo.name || authUser.user_metadata?.name || "",
    identityId: userInfo.identity_id ?? undefined,
    isActive: userInfo.is_active ?? true,
    // isFirstLogin is not in user_info schema currently
    avatarUrl: userInfo.avatar_url ?? undefined,
    phone: userInfo.phone ?? undefined,
    disabledAt: userInfo.disabled_at ?? undefined,
    disabledReason: userInfo.disabled_reason ?? undefined,
  };

  // Strictly check for Teacher Identity (ID: 2)
  if (user.identityId !== 2) {
    if (user.identityId === 1) {
      redirect("/admin/dashboard");
    } else if (user.identityId === 3) {
      redirect("/student/dashboard");
    } else {
      redirect("/");
    }
  }

  return <TeacherShell user={user}>{children}</TeacherShell>;
}
