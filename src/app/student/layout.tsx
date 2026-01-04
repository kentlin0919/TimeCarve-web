import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AppShell from "@/components/AppShell";
import { User } from "@/lib/domain/auth/repository";

export default async function StudentLayout({
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
    redirect("/auth/login?redirect=/student/dashboard");
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
    avatarUrl: userInfo.avatar_url ?? undefined,
    phone: userInfo.phone ?? undefined,
    disabledAt: userInfo.disabled_at ?? undefined,
    disabledReason: userInfo.disabled_reason ?? undefined,
  };

  // Strictly check for Student Identity (ID: 3)
  if (user.identityId !== 3) {
    if (user.identityId === 1) {
      redirect("/admin/dashboard");
    } else if (user.identityId === 2) {
      redirect("/teacher/dashboard");
    } else {
      redirect("/");
    }
  }

  return <AppShell user={user}>{children}</AppShell>;
}
