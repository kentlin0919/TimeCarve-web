"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database.types";

const ROLE_MAP: Record<number, string> = {
  1: "Admin",
  2: "Teacher",
  3: "Student",
};

type UserInfo = Database["public"]["Tables"]["user_info"]["Row"];
type StudentInfo = Database["public"]["Tables"]["student_info"]["Row"];
type TeacherInfo = Database["public"]["Tables"]["teacher_info"]["Row"];
type Identity = Database["public"]["Tables"]["identity"]["Row"];

type AdminUser = UserInfo & {
  identity: Identity | null;
  student_info: StudentInfo | null;
  teacher_info: TeacherInfo | null;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [identities, setIdentities] = useState<Identity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">(
    "all"
  );
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const [formUser, setFormUser] = useState<Partial<UserInfo>>({});
  const [formStudent, setFormStudent] = useState<Partial<StudentInfo>>({});
  const [formTeacher, setFormTeacher] = useState<Partial<TeacherInfo>>({});
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchIdentities();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("user_info")
      .select(
        `*,
        identity:identity_id ( identity_id, name ),
        student_info ( id, student_code, teacher_code, created_at, updated_at ),
        teacher_info ( id, teacher_code, title, experience_years, base_price, is_public, bio, created_at, updated_at )
        `
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching users:", error);
      setError("讀取使用者失敗，請稍後再試。");
    } else {
      setUsers((data || []) as AdminUser[]);
      if (data && data.length > 0 && !selectedUserId) {
        setSelectedUserId(data[0].id);
      }
    }
    setLoading(false);
  };

  const fetchIdentities = async () => {
    const { data, error } = await supabase
      .from("identity")
      .select("identity_id, name")
      .order("identity_id", { ascending: true });

    if (error) {
      console.error("Error fetching identities:", error);
      return;
    }

    setIdentities(data || []);
  };

  const selectedUser = users.find((user) => user.id === selectedUserId) || null;

  useEffect(() => {
    if (!selectedUser) return;
    setFormUser({
      id: selectedUser.id,
      name: selectedUser.name,
      email: selectedUser.email,
      phone: selectedUser.phone,
      avatar_url: selectedUser.avatar_url,
      identity_id: selectedUser.identity_id,
      is_active: selectedUser.is_active,
      is_first_login: selectedUser.is_first_login ?? false,
      disabled_reason: selectedUser.disabled_reason,
      disabled_at: selectedUser.disabled_at,
    });
    setFormStudent(selectedUser.student_info || {});
    setFormTeacher(selectedUser.teacher_info || {});
    setEditing(false);
    setError(null);
    setPassword("");
    setPasswordConfirm("");
  }, [selectedUserId, selectedUser]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesQuery =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
          ? user.is_active
          : !user.is_active;
      const matchesRole =
        roleFilter === "all"
          ? true
          : String(user.identity_id || "") === roleFilter;

      return matchesQuery && matchesStatus && matchesRole;
    });
  }, [users, searchQuery, statusFilter, roleFilter]);

  const identityOptions = useMemo(() => {
    if (identities.length > 0) return identities;
    if (!selectedUser?.identity_id) return [];
    return [
      {
        identity_id: selectedUser.identity_id,
        name: ROLE_MAP[selectedUser.identity_id] || `身份 ${selectedUser.identity_id}`,
      },
    ];
  }, [identities, selectedUser?.identity_id]);

  const roleId = formUser.identity_id ?? selectedUser?.identity_id ?? null;

  const showStudentSection = useMemo(() => {
    if (editing && roleId === 3) return true;
    return Boolean(formStudent.student_code || formStudent.teacher_code);
  }, [editing, roleId, formStudent.student_code, formStudent.teacher_code]);

  const showTeacherSection = useMemo(() => {
    if (editing && roleId === 2) return true;
    return Boolean(
      formTeacher.teacher_code ||
        formTeacher.title ||
        formTeacher.experience_years ||
        formTeacher.base_price ||
        formTeacher.is_public ||
        formTeacher.bio
    );
  }, [
    editing,
    roleId,
    formTeacher.teacher_code,
    formTeacher.title,
    formTeacher.experience_years,
    formTeacher.base_price,
    formTeacher.is_public,
    formTeacher.bio,
  ]);

  const handleSave = async () => {
    if (!selectedUser || !formUser.id) return;
    setSaving(true);
    setError(null);

    try {
      if (formUser.identity_id === 3 && !formStudent.teacher_code) {
        throw new Error("學生身分需填寫綁定教師代碼。");
      }

      const emailChanged =
        formUser.email && formUser.email !== selectedUser.email;

      if (emailChanged) {
        const response = await fetch("/api/admin/users/update-auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: selectedUser.id,
            email: formUser.email,
          }),
        });

        if (!response.ok) {
          const payload = await response.json();
          throw new Error(payload.error || "更新 Email 失敗");
        }
      }

      const { error: userError } = await supabase
        .from("user_info")
        .update({
          name: formUser.name,
          phone: formUser.phone,
          avatar_url: formUser.avatar_url,
          identity_id: formUser.identity_id,
          is_active: formUser.is_active,
          is_first_login: formUser.is_first_login,
          disabled_reason: formUser.disabled_reason,
          disabled_at: formUser.disabled_at,
        })
        .eq("id", selectedUser.id);

      if (userError) throw userError;

      if (formUser.identity_id === 3) {
        if (!selectedUser.student_info) {
          const { error: studentCreateError } = await supabase
            .from("student_info")
            .insert({
              id: selectedUser.id,
              student_code: formStudent.student_code || null,
              teacher_code: formStudent.teacher_code || "",
            });

          if (studentCreateError) throw studentCreateError;
        }

        const { error: studentError } = await supabase
          .from("student_info")
          .update({
            student_code: formStudent.student_code,
            teacher_code: formStudent.teacher_code,
          })
          .eq("id", selectedUser.id);

        if (studentError) throw studentError;
      }

      if (formUser.identity_id === 2) {
        if (!selectedUser.teacher_info) {
          let teacherCode = formTeacher.teacher_code;
          if (!teacherCode) {
            const { data: generatedCode, error: codeError } = await supabase.rpc(
              "generate_teacher_code"
            );
            if (codeError) throw codeError;
            teacherCode = generatedCode as string;
          }

          const { error: teacherCreateError } = await supabase
            .from("teacher_info")
            .insert({
              id: selectedUser.id,
              teacher_code: teacherCode,
              title: formTeacher.title || null,
              bio: formTeacher.bio || null,
              experience_years: formTeacher.experience_years ?? null,
              base_price: formTeacher.base_price ?? null,
              is_public: formTeacher.is_public ?? false,
            });

          if (teacherCreateError) throw teacherCreateError;
        }

        const { error: teacherError } = await supabase
          .from("teacher_info")
          .update({
            teacher_code: formTeacher.teacher_code,
            title: formTeacher.title,
            experience_years: formTeacher.experience_years,
            base_price: formTeacher.base_price,
            is_public: formTeacher.is_public,
            bio: formTeacher.bio,
          })
          .eq("id", selectedUser.id);

        if (teacherError) throw teacherError;
      }

      await fetchUsers();
      setEditing(false);
    } catch (err: any) {
      console.error("Error saving user:", err);
      setError(err.message || "儲存失敗");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!selectedUser || !password || !passwordConfirm) {
      setError("請輸入新密碼並再次確認。");
      return;
    }

    if (password !== passwordConfirm) {
      setError("兩次輸入的密碼不一致。");
      return;
    }

    setPasswordSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/users/update-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selectedUser.id,
          password,
          setFirstLogin: false,
        }),
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.error || "更新密碼失敗");
      }

      setFormUser((prev) => ({ ...prev, is_first_login: false }));
      setPassword("");
      setPasswordConfirm("");
    } catch (err: any) {
      console.error("Password reset error:", err);
      setError(err.message || "更新密碼失敗");
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            用戶管理
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            共 {users.length} 位用戶
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋姓名或 Email"
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
          >
            <option value="all">所有角色</option>
            {identities.map((identity) => (
              <option key={identity.identity_id} value={identity.identity_id}>
                {identity.name}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | "active" | "inactive")
            }
            className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
          >
            <option value="all">全部狀態</option>
            <option value="active">啟用中</option>
            <option value="inactive">已停用</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-sm font-medium">
              <tr>
                <th className="px-6 py-4">用戶</th>
                <th className="px-6 py-4">角色</th>
                <th className="px-6 py-4">狀態</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    載入中...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    找不到符合條件的用戶
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => setSelectedUserId(user.id)}
                    className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                      selectedUserId === user.id
                        ? "bg-sky-50/60 dark:bg-sky-500/10"
                        : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {user.identity?.name || ROLE_MAP[user.identity_id || 0] || "未設定"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.is_active
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                      >
                        {user.is_active ? "啟用" : "停用"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="lg:col-span-7 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          {!selectedUser ? (
            <div className="text-center text-gray-500 py-20">請從左側選擇用戶</div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedUser.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedUser.email}
                  </p>
                </div>
                <button
                  onClick={() => setEditing((prev) => !prev)}
                  className="px-4 py-2 border border-sky-200 text-sky-600 rounded-lg hover:bg-sky-50 transition-colors"
                >
                  {editing ? "取消編輯" : "編輯資料"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(editing || formUser.name) && (
                  <div>
                    <label className="text-xs font-semibold text-gray-500">姓名</label>
                    <input
                      value={formUser.name || ""}
                      onChange={(e) =>
                        setFormUser((prev) => ({ ...prev, name: e.target.value }))
                      }
                      disabled={!editing}
                      className="mt-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 disabled:bg-gray-100 dark:disabled:bg-gray-800"
                    />
                  </div>
                )}
                {(editing || formUser.email) && (
                  <div>
                    <label className="text-xs font-semibold text-gray-500">Email</label>
                    <input
                      value={formUser.email || ""}
                      onChange={(e) =>
                        setFormUser((prev) => ({ ...prev, email: e.target.value }))
                      }
                      disabled={!editing}
                      className="mt-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 disabled:bg-gray-100 dark:disabled:bg-gray-800"
                    />
                  </div>
                )}
                {(editing || formUser.phone) && (
                  <div>
                    <label className="text-xs font-semibold text-gray-500">電話</label>
                    <input
                      value={formUser.phone || ""}
                      onChange={(e) =>
                        setFormUser((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      disabled={!editing}
                      className="mt-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 disabled:bg-gray-100 dark:disabled:bg-gray-800"
                    />
                  </div>
                )}
                <div>
                  <label className="text-xs font-semibold text-gray-500">角色</label>
                  {editing ? (
                    <select
                      value={formUser.identity_id || ""}
                      onChange={(e) =>
                        setFormUser((prev) => ({
                          ...prev,
                          identity_id: e.target.value
                            ? Number(e.target.value)
                            : null,
                        }))
                      }
                      className="mt-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-200"
                    >
                      <option value="">未設定</option>
                      {identityOptions.map((identity) => (
                        <option key={identity.identity_id} value={identity.identity_id}>
                          {identity.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                      {selectedUser.identity?.name ||
                        identities.find(
                          (identity) =>
                            identity.identity_id === selectedUser.identity_id
                        )?.name ||
                        ROLE_MAP[selectedUser.identity_id || 0] ||
                        "未設定"}
                    </div>
                  )}
                </div>
                {editing && (
                  <div>
                    <label className="text-xs font-semibold text-gray-500">狀態</label>
                    <select
                      value={formUser.is_active ? "active" : "inactive"}
                      onChange={(e) =>
                        setFormUser((prev) => ({
                          ...prev,
                          is_active: e.target.value === "active",
                        }))
                      }
                      disabled={!editing}
                      className="mt-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 disabled:bg-gray-100 dark:disabled:bg-gray-800"
                    >
                      <option value="active">啟用</option>
                      <option value="inactive">停用</option>
                    </select>
                  </div>
                )}
                {editing && (
                  <div>
                    <label className="text-xs font-semibold text-gray-500">首次登入狀態</label>
                    <select
                      value={formUser.is_first_login ? "complete" : "pending"}
                      onChange={(e) =>
                        setFormUser((prev) => ({
                          ...prev,
                          is_first_login: e.target.value === "complete",
                        }))
                      }
                      disabled={!editing}
                      className="mt-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 disabled:bg-gray-100 dark:disabled:bg-gray-800"
                    >
                      <option value="pending">尚未完成</option>
                      <option value="complete">已完成</option>
                    </select>
                  </div>
                )}
              </div>

              {(editing || formUser.disabled_reason || formUser.disabled_at) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(editing || formUser.disabled_reason) && (
                    <div>
                      <label className="text-xs font-semibold text-gray-500">停用原因</label>
                      <input
                        value={formUser.disabled_reason || ""}
                        onChange={(e) =>
                          setFormUser((prev) => ({
                            ...prev,
                            disabled_reason: e.target.value,
                          }))
                        }
                        disabled={!editing}
                        className="mt-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 disabled:bg-gray-100 dark:disabled:bg-gray-800"
                      />
                    </div>
                  )}
                  {(editing || formUser.disabled_at) && (
                    <div>
                      <label className="text-xs font-semibold text-gray-500">停用日期</label>
                      <input
                        value={formUser.disabled_at || ""}
                        disabled
                        className="mt-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-3 py-2 text-sm text-gray-500"
                      />
                    </div>
                  )}
                </div>
              )}

              {showStudentSection && (
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <span className="material-symbols-outlined text-[18px]">school</span>
                    學生資料
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(editing || formStudent.student_code) && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500">學員編號</label>
                        <input
                          value={formStudent.student_code || ""}
                          onChange={(e) =>
                            setFormStudent((prev) => ({
                              ...prev,
                              student_code: e.target.value,
                            }))
                          }
                          disabled={!editing || !selectedUser.student_info}
                          className="mt-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 disabled:bg-gray-100 dark:disabled:bg-gray-800"
                        />
                      </div>
                    )}
                    {(editing || formStudent.teacher_code) && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500">綁定教師代碼</label>
                        <input
                          value={formStudent.teacher_code || ""}
                          onChange={(e) =>
                            setFormStudent((prev) => ({
                              ...prev,
                              teacher_code: e.target.value,
                            }))
                          }
                          disabled={!editing || !selectedUser.student_info}
                          className="mt-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 disabled:bg-gray-100 dark:disabled:bg-gray-800"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {showTeacherSection && (
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <span className="material-symbols-outlined text-[18px]">person</span>
                    教師資料
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(editing || formTeacher.teacher_code) && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500">教師代碼</label>
                        <input
                          value={formTeacher.teacher_code || ""}
                          onChange={(e) =>
                            setFormTeacher((prev) => ({
                              ...prev,
                              teacher_code: e.target.value,
                            }))
                          }
                          disabled={!editing || !selectedUser.teacher_info}
                          className="mt-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 disabled:bg-gray-100 dark:disabled:bg-gray-800"
                        />
                      </div>
                    )}
                    {(editing || formTeacher.title) && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500">教師頭銜</label>
                        <input
                          value={formTeacher.title || ""}
                          onChange={(e) =>
                            setFormTeacher((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          disabled={!editing || !selectedUser.teacher_info}
                          className="mt-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 disabled:bg-gray-100 dark:disabled:bg-gray-800"
                        />
                      </div>
                    )}
                    {(editing || formTeacher.experience_years) && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500">教學年資</label>
                        <input
                          type="number"
                          value={formTeacher.experience_years ?? ""}
                          onChange={(e) =>
                            setFormTeacher((prev) => ({
                              ...prev,
                              experience_years: e.target.value
                                ? Number(e.target.value)
                                : null,
                            }))
                          }
                          disabled={!editing || !selectedUser.teacher_info}
                          className="mt-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 disabled:bg-gray-100 dark:disabled:bg-gray-800"
                        />
                      </div>
                    )}
                    {(editing || formTeacher.base_price) && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500">每小時費用</label>
                        <input
                          type="number"
                          value={formTeacher.base_price ?? ""}
                          onChange={(e) =>
                            setFormTeacher((prev) => ({
                              ...prev,
                              base_price: e.target.value
                                ? Number(e.target.value)
                                : null,
                            }))
                          }
                          disabled={!editing || !selectedUser.teacher_info}
                          className="mt-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 disabled:bg-gray-100 dark:disabled:bg-gray-800"
                        />
                      </div>
                    )}
                    {(editing || formTeacher.is_public !== null) && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500">公開顯示</label>
                        <select
                          value={formTeacher.is_public ? "public" : "private"}
                          onChange={(e) =>
                            setFormTeacher((prev) => ({
                              ...prev,
                              is_public: e.target.value === "public",
                            }))
                          }
                          disabled={!editing || !selectedUser.teacher_info}
                          className="mt-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 disabled:bg-gray-100 dark:disabled:bg-gray-800"
                        >
                          <option value="public">公開</option>
                          <option value="private">不公開</option>
                        </select>
                      </div>
                    )}
                    {(editing || formTeacher.bio) && (
                      <div className="md:col-span-2">
                        <label className="text-xs font-semibold text-gray-500">教師簡介</label>
                        <textarea
                          value={formTeacher.bio || ""}
                          onChange={(e) =>
                            setFormTeacher((prev) => ({
                              ...prev,
                              bio: e.target.value,
                            }))
                          }
                          disabled={!editing || !selectedUser.teacher_info}
                          rows={3}
                          className="mt-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 disabled:bg-gray-100 dark:disabled:bg-gray-800"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {editing && (
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors disabled:opacity-60"
                  >
                    {saving ? "儲存中..." : "儲存變更"}
                  </button>
                </div>
              )}

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  變更密碼
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500">新密碼</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-200"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500">再次確認</label>
                    <input
                      type="password"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      className="mt-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-200"
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    變更密碼後，系統會將使用者狀態重設為首次登入。
                  </p>
                  <button
                    onClick={handlePasswordReset}
                    disabled={passwordSaving}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-60"
                  >
                    {passwordSaving ? "更新中..." : "更新密碼"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
