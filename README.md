# 牙體雕刻家教中心 (Denture Art Web)

這是一個專為牙體技術教學設計的現代化平台，整合了課程展示、線上預約與教學管理系統。專案採用 **Next.js (App Router)** 構建，並針對 **GitHub Pages** 進行了靜態輸出 (Static Export) 優化。

## 🚀 專案特色

- **靜態輸出優化:** 設定為 `output: export`，可部署於任何靜態主機（如 GitHub Pages, Vercel, Netlify）。
- **路由群組架構:** 使用 Next.js App Router 的 Route Groups `(public)` 來區分公開與受保護的頁面結構。
- **客戶端權限管理:** 由於靜態輸出的限制，採用客製化的 `AuthGuard` 組件來實現前端路由保護（取代 Middleware）。
- **動態路由預渲染:** 所有動態頁面（如課程詳情、學生資料）皆實作 `generateStaticParams` 以支援建置時生成。
- **現代化 UI/UX:** 使用 **Tailwind CSS v4** 打造響應式且精美的介面。

## 🛠 技術堆疊

- **核心框架:** [Next.js 16](https://nextjs.org/) (App Router)
- **語言:** [TypeScript](https://www.typescriptlang.org/)
- **樣式:** [Tailwind CSS v4](https://tailwindcss.com/)
- **資料庫 & 認證:** [Supabase](https://supabase.com/) (整合中)
- **部署:** GitHub Pages (透過 GitHub Actions)

## 📂 專案結構

```
app/
├── (public)/               # 公開頁面 (無需登入)
│   ├── auth/               # 登入、註冊頁面 (Client-side Form)
│   ├── courses/            # 課程列表與詳情 (Static params)
│   └── teachers/           # 師資介紹
├── student/                # 學生專區 (受 AuthGuard 保護)
│   ├── dashboard/          # 儀表板
│   └── booking/            # 預約系統
├── teacher/                # 教師後台 (受 AuthGuard 保護)
│   ├── courses/            # 課程編輯
│   └── students/           # 學生管理 CRM
├── components/             # 共用組件
│   └── AuthGuard.tsx       # 客戶端權限守衛
├── api/                    # API Route Handlers (開發中)
└── layout.tsx              # Root Layout
```

## ⚡️ 快速開始

### 1. 安裝依賴

```bash
pnpm install
```

### 2. 啟動開發伺服器

```bash
pnpm dev
```

前往 [http://localhost:3000](http://localhost:3000) 查看成果。

### 3. 建置生產版本

此指令會生成 `out` 資料夾，包含所有靜態 HTML/CSS/JS 檔案。

```bash
pnpm build
```

## 🔐 權限與路由保護

由於專案採用靜態輸出，Next.js 的 `middleware.ts` 無法在 GitHub Pages 等靜態環境中運作。因此，我們採用 **Client-side Auth Guard** 策略：

- **AuthGuard 元件:** 位於 `app/components/AuthGuard.tsx`，在頁面載入時檢查認證狀態（Cookie 或 LocalStorage）。
- **Layout 保護:** `app/student/layout.tsx` 與 `app/teacher/layout.tsx` 皆已包覆 `<AuthGuard>`，確保未登入使用者無法存取這些路徑。

## ⚠️ 開發注意事項

1.  **動態路由 (Dynamic Routes):**
    若要在靜態輸出中使用動態路由（如 `[id]/.tsx`），**必須** 在該頁面匯出 `generateStaticParams` 函式。

    ```tsx
    export async function generateStaticParams() {
      // 回傳一組預設參數讓 Build 通過
      return [{ id: "demo" }];
    }
    ```

2.  **客戶端互動 (Use Client):**
    包含 `useState`, `useEffect`, `onClick` 或表單 `onSubmit` 的組件，務必在檔案最上方加上 `'use client'`。

3.  **GitHub Pages 部署:**
    專案包含 `.github/workflows/deploy.yml`，推送到 `main` 分支時會自動觸發。
    _請確保 GitHub Repo 的 Settings -> Pages -> Source 已設定為 **GitHub Actions**。_

## 📄 授權

MIT License
