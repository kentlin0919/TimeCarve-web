"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`
          w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
          flex flex-col fixed h-full z-30 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                alt="Super Admin Profile"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-sky-500 ring-offset-2 dark:ring-offset-gray-900"
                src="/logo.svg"
              />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                Super Admin
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                TimeCarve 刻時
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <Link
            href="/admin/dashboard"
            onClick={() => onClose()}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg group transition-colors ${
              isActive("/admin/dashboard")
                ? "bg-sky-50 dark:bg-sky-500/20 text-sky-500"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl ${
                !isActive("/admin/dashboard") &&
                "group-hover:text-sky-500 transition-colors"
              }`}
            >
              dashboard
            </span>
            <span className="font-medium text-sm">儀表板</span>
          </Link>
          <Link
            href="/admin/teachers"
            onClick={() => onClose()}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg group transition-colors ${
              isActive("/admin/teachers")
                ? "bg-sky-50 dark:bg-sky-500/20 text-sky-500"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl ${
                !isActive("/admin/teachers") &&
                "group-hover:text-sky-500 transition-colors"
              }`}
            >
              school
            </span>
            <span className="font-medium text-sm">教師管理</span>
          </Link>
          <Link
            href="#"
            onClick={() => onClose()}
            className="flex items-center space-x-3 px-3 py-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white rounded-lg group transition-colors"
          >
            <span className="material-symbols-outlined text-xl group-hover:text-sky-500 transition-colors">
              menu_book
            </span>
            <span className="font-medium text-sm">課程管理</span>
          </Link>
          <Link
            href="/admin/course-types"
            onClick={() => onClose()}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg group transition-colors ${
              isActive("/admin/course-types")
                ? "bg-sky-50 dark:bg-sky-500/20 text-sky-500"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl ${
                !isActive("/admin/course-types") &&
                "group-hover:text-sky-500 transition-colors"
              }`}
            >
              category
            </span>
            <span className="font-medium text-sm">課程類型管理</span>
          </Link>
          <Link
            href="/admin/tags"
            onClick={() => onClose()}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg group transition-colors ${
              isActive("/admin/tags")
                ? "bg-sky-50 dark:bg-sky-500/20 text-sky-500"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl ${
                !isActive("/admin/tags") &&
                "group-hover:text-sky-500 transition-colors"
              }`}
            >
              label
            </span>
            <span className="font-medium text-sm">標籤管理</span>
          </Link>
          <Link
            href="/admin/students"
            onClick={() => onClose()}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg group transition-colors ${
              isActive("/admin/students")
                ? "bg-sky-50 dark:bg-sky-500/20 text-sky-500"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl ${
                !isActive("/admin/students") &&
                "group-hover:text-sky-500 transition-colors"
              }`}
            >
              people
            </span>
            <span className="font-medium text-sm">學生管理</span>
          </Link>
          <Link
            href="#"
            onClick={() => onClose()}
            className="flex items-center space-x-3 px-3 py-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white rounded-lg group transition-colors"
          >
            <span className="material-symbols-outlined text-xl group-hover:text-sky-500 transition-colors">
              payments
            </span>
            <span className="font-medium text-sm">財務報表</span>
          </Link>
          <Link
            href="/admin/settings"
            onClick={() => onClose()}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg group transition-colors ${
              isActive("/admin/settings")
                ? "bg-sky-50 dark:bg-sky-500/20 text-sky-500"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl ${
                !isActive("/admin/settings") &&
                "group-hover:text-sky-500 transition-colors"
              }`}
            >
              settings
            </span>
            <span className="font-medium text-sm">系統設定</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors w-full text-left"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            <span className="font-medium text-sm">登出系統</span>
          </button>
        </div>
      </aside>
    </>
  );
}
