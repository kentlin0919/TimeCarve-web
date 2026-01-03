"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Setting {
  key: string;
  value: string | null;
  label: string | null;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("platform_settings")
      .select("*")
      .order("key");

    if (error) {
      console.error("Error fetching settings:", error);
    } else {
      setSettings(data || []);
    }
    setLoading(false);
  };

  const handleChange = (key: string, newValue: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.key === key ? { ...s, value: newValue } : s))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      // Update one by one or bulk? Supabase doesn't support bulk update easily without upsert logic
      // Upsert is good.
      const updates = settings.map(({ key, value }) => ({
        key,
        value,
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase
        .from("platform_settings")
        .upsert(updates);

      if (error) throw error;

      setMessage("設定已儲存");
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      console.error("Save error:", err);
      setMessage("儲存失敗: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">載入中...</div>;

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        系統設定
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-white border-b pb-2 dark:border-gray-700">
          平台聯絡資訊
        </h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm ${
              message.includes("失敗")
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-600"
            }`}
          >
            {message}
          </div>
        )}

        <div className="space-y-5">
          {settings.map((setting) => (
            <div key={setting.key}>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5">
                {setting.label || setting.key}
              </label>
              <input
                type="text"
                value={setting.value || ""}
                onChange={(e) => handleChange(setting.key, e.target.value)}
                className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-bold shadow-md shadow-sky-500/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {saving ? "儲存中..." : "儲存設定"}
          </button>
        </div>
      </div>
    </div>
  );
}
