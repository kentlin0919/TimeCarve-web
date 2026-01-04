import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminShell from "./components/AdminShell";
import { User } from "@/lib/domain/auth/repository";

export default async function AdminLayout({
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
    redirect("/auth/login?redirect=/admin/dashboard");
  }

  // Fetch user_info for role/identity checking
  const { data: userInfo, error: userInfoError } = await supabase
    .from("user_info")
    .select("*")
    .eq("id", authUser.id)
    .single();

  if (userInfoError || !userInfo) {
    // If no user info, something is wrong with the account setup
    console.warn("User has no user_info:", userInfoError);
    // Maybe redirect to an onboarding or error page? For now login.
    redirect("/auth/login");
  }

  // Map to Domain User
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

  // Strictly check for Admin Identity (ID: 1)
  if (user.identityId !== 1) {
    // Not an admin
    if (user.identityId === 2) {
      redirect("/teacher/dashboard");
    } else if (user.identityId === 3) {
      redirect("/student/dashboard");
    } else {
      redirect("/");
    }
  }

  return <AdminShell user={user}>{children}</AdminShell>;
}
