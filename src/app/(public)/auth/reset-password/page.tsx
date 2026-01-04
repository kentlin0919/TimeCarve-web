"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Get query params
    const params = new URLSearchParams(window.location.search);
    const paramType = params.get("type");
    setType(paramType);

    // active session check
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // If purely reset password flow via email link, usually handled by #fragment
      // If first login flow, we MUST have a session
      if (paramType === "first_login" && !session) {
        router.push("/auth/login");
      }
    };
    checkSession();

    // Listen for auth state changes for robustness
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "PASSWORD_RECOVERY") {
          // User has clicked the reset link and is now authenticated for recovery
          console.log("Password recovery session active");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumberOrSymbol = /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
    password
  );
  const isStrongPassword = (value: string) =>
    value.length >= 8 &&
    /[A-Z]/.test(value) &&
    /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);
  const strengthScore =
    (hasMinLength ? 1 : 0) +
    (hasUppercase ? 1 : 0) +
    (hasNumberOrSymbol ? 1 : 0);
  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;
  const canSubmit =
    !loading && isStrongPassword(password) && passwordsMatch;

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStrongPassword(password)) {
      setError("密碼強度不足，請符合提示條件");
      return;
    }
    if (password !== confirmPassword) {
      setError("新密碼確認不一致");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      setMessage("密碼重設成功！即將跳轉...");

      // Determine redirect path dynamically
      const {
        data: { user },
      } = await supabase.auth.getUser();

      let redirectPath = "/auth/login";

      if (user) {
        // Check user_info to see if they need onboarding
        const { data: userInfo, error: userError } = await (
          supabase.from("user_info" as any) as any
        )
          .select("is_first_login, identity_id")
          .eq("id", user.id)
          .single();

        if (!userError && userInfo) {
          // If Teacher and First Login is false (not done), go to Onboarding
          // This prevents the Login page from kicking them back to Reset Password
          if (userInfo.is_first_login === false) {
            redirectPath = "/auth/onboarding";
          }
        }
      }

      // If explicit type is present, it takes precedence or confirms it
      if (type === "first_login") {
        redirectPath = "/auth/onboarding";
      }

      setTimeout(() => {
        router.push(redirectPath);
      }, 1500);
    } catch (err: any) {
      setError(err.message || "重設失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-[#111618] dark:text-white font-display antialiased selection:bg-primary/20">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f3f4] dark:border-b-gray-800 px-6 lg:px-10 py-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4 text-[#111618] dark:text-white">
          <Link href="/" className="size-8 text-primary block">
            <svg
              className="w-full h-full"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"
                fill="currentColor"
              ></path>
              <path
                clipRule="evenodd"
                d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
          </Link>
          <h2 className="text-[#111618] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            家教預約平台
          </h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="hidden lg:flex items-center gap-9">
            <Link
              href="/"
              className="text-[#111618] dark:text-gray-200 text-sm font-medium leading-normal hover:text-primary transition-colors"
            >
              首頁
            </Link>
            <Link
              href="/courses"
              className="text-[#111618] dark:text-gray-200 text-sm font-medium leading-normal hover:text-primary transition-colors"
            >
              課程列表
            </Link>
            <Link
              href="/teachers"
              className="text-[#111618] dark:text-gray-200 text-sm font-medium leading-normal hover:text-primary transition-colors"
            >
              師資介紹
            </Link>
            <Link
              href="/reviews"
              className="text-[#111618] dark:text-gray-200 text-sm font-medium leading-normal hover:text-primary transition-colors"
            >
              學員心得
            </Link>
            <Link
              href="/contact"
              className="text-[#111618] dark:text-gray-200 text-sm font-medium leading-normal hover:text-primary transition-colors"
            >
              聯絡我們
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            <button className="lg:hidden text-[#111618] dark:text-white">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <Link
              href="/auth/login"
              className="hidden lg:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary hover:bg-[#0fa0d1] transition-colors text-white text-sm font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/20"
            >
              <span className="truncate">登入 / 註冊</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="layout-container flex h-full grow flex-col relative z-0">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[10%] right-[20%] w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>
        <div className="px-4 flex flex-1 items-center justify-center py-12 md:py-20">
          <div className="w-full max-w-[480px] bg-white dark:bg-gray-800 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-gray-700 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-300"></div>

            <div className="flex flex-col items-center text-center mb-8">
              <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 shadow-sm ring-1 ring-primary/20">
                <span className="material-symbols-outlined text-[32px]">
                  lock_reset
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-[#111618] dark:text-white tracking-tight mb-3">
                重設密碼
              </h2>
              <p className="text-[#617f89] dark:text-gray-400 text-sm leading-relaxed max-w-xs">
                請輸入您的新密碼並確認。為了您的帳號安全，建議使用包含字母、數字和符號的強密碼組合。
              </p>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-6">
              {message && (
                <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                  {message}
                </div>
              )}
              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-5">
                <div className="space-y-2 text-left">
                  <label
                    className="text-sm font-bold text-[#111618] dark:text-gray-200 ml-1"
                    htmlFor="new_password"
                  >
                    新密碼
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">
                        lock
                      </span>
                    </div>
                    <input
                      className="block w-full rounded-xl border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900 py-3.5 pl-11 pr-12 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-primary sm:text-sm transition-shadow outline-none"
                      id="new_password"
                      name="new_password"
                      placeholder="••••••••"
                      required
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-slate-400 hover:text-primary transition-colors"
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? "visibility" : "visibility_off"}
                      </span>
                    </button>
                  </div>
                  <div className="pt-1 px-1">
                    <div className="flex gap-1.5 h-1.5 mb-2 rounded-full overflow-hidden bg-slate-100 dark:bg-gray-800">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div
                          key={index}
                          className={`h-full ${
                            index < strengthScore
                              ? "bg-primary/60"
                              : "bg-slate-200 dark:bg-gray-700"
                          }`}
                          style={{ width: "25%" }}
                        ></div>
                      ))}
                    </div>
                    <ul className="mt-2 space-y-1.5 text-xs text-slate-500 dark:text-gray-400">
                      <li
                        className={`flex items-center gap-2 ${
                          hasMinLength
                            ? "text-emerald-500 font-medium"
                            : "text-slate-500 dark:text-gray-400"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {hasMinLength ? "check_circle" : "radio_button_unchecked"}
                        </span>
                        <span className="text-slate-700 dark:text-gray-300">
                          至少 8 個字元
                        </span>
                      </li>
                      <li
                        className={`flex items-center gap-2 ${
                          hasUppercase
                            ? "text-emerald-500 font-medium"
                            : "text-slate-500 dark:text-gray-400"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {hasUppercase ? "check_circle" : "radio_button_unchecked"}
                        </span>
                        <span className="text-slate-700 dark:text-gray-300">
                          包含大寫字母
                        </span>
                      </li>
                      <li
                        className={`flex items-center gap-2 ${
                          hasNumberOrSymbol
                            ? "text-emerald-500 font-medium"
                            : "text-slate-500 dark:text-gray-400"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {hasNumberOrSymbol
                            ? "check_circle"
                            : "radio_button_unchecked"}
                        </span>
                        <span className="text-slate-700 dark:text-gray-300">
                          包含數字或特殊符號
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-2 text-left">
                  <label
                    className="text-sm font-bold text-[#111618] dark:text-gray-200 ml-1"
                    htmlFor="confirm_password"
                  >
                    確認新密碼
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">
                        verified_user
                      </span>
                    </div>
                    <input
                      className="block w-full rounded-xl border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900 py-3.5 pl-11 pr-12 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-primary sm:text-sm transition-shadow outline-none"
                      id="confirm_password"
                      name="confirm_password"
                      placeholder="••••••••"
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-slate-400 hover:text-primary transition-colors"
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showConfirmPassword ? "visibility" : "visibility_off"}
                      </span>
                    </button>
                  </div>
                  {confirmPassword.length > 0 && (
                    <p
                      className={`text-xs ${
                        passwordsMatch
                          ? "text-emerald-500"
                          : "text-red-500"
                      }`}
                    >
                      {passwordsMatch ? "密碼一致" : "密碼不一致"}
                    </p>
                  )}
                </div>
              </div>

              <button
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-[#0fa0d1] text-white py-3.5 px-4 text-sm font-bold shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={!canSubmit}
              >
                {loading ? "更新中..." : "完成設定"}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-gray-700/50 text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-gray-400 hover:text-primary transition-colors group"
              >
                <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">
                  arrow_back
                </span>
                返回登入
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white dark:bg-gray-900 border-t border-[#f0f3f4] dark:border-gray-800 py-10 px-6 lg:px-40">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="relative size-6">
              <Image
                src="/logo.svg"
                alt="TimeCarve Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-[#617f89] dark:text-gray-500 text-sm">
              © 2025 TimeCarve 刻時. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <Link
              href="/legal/privacy"
              className="text-[#617f89] dark:text-gray-500 hover:text-primary transition-colors text-sm font-medium"
            >
              隱私權政策
            </Link>
            <Link
              href="/legal/terms"
              className="text-[#617f89] dark:text-gray-500 hover:text-primary transition-colors text-sm font-medium"
            >
              服務條款
            </Link>
            <Link
              href="/faq"
              className="text-[#617f89] dark:text-gray-500 hover:text-primary transition-colors text-sm font-medium"
            >
              常見問題
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
