# Peggy Blog Web - 專案指南

## 專案概述

這是一個基於 **Next.js (App Router)** 構建的現代化網頁應用程式專案，針對 **Static Export (GitHub Pages)** 進行了優化。專案整合了學生端前台與教師管理端後台，提供完整的課程預約、作品集展示及學員管理功能。

## 技術堆疊

- **前端框架:** [Next.js 16](https://nextjs.org/) (App Router)
- **架構模式:** Static Export (`output: export`)
- **後端服務:** [Supabase](https://supabase.com/) (PostgreSQL + Auth)
- **語言:** [TypeScript](https://www.typescriptlang.org/)
- **樣式:** [Tailwind CSS v4](https://tailwindcss.com/)
- **部署:** GitHub Pages (via GitHub Actions)

## 快速開始

### 1. 安裝依賴

```bash
pnpm install
```

### 2. 啟動開發伺服器

```bash
pnpm dev
# 訪問 http://localhost:3000
```

### 3. 建置生產版本

此指令會生成 `out` 資料夾，包含完整的靜態網站檔案。

```bash
pnpm build
```

## 專案結構

```
app/
├─ layout.tsx                     # Root layout
├─ not-found.tsx                  # 404 頁面
├─ error.tsx                      # 錯誤處理
│
├─ components/                    # 共用組件
│  └─ AuthGuard.tsx               # 客戶端權限守衛 (Client-side Auth)
│
├─ (public)/                      # 公開頁面 (無需登入)
│  ├─ page.tsx                    # 首頁
│  ├─ auth/                       # 登入/註冊 (Client Form)
│  ├─ courses/                    # 課程瀏覽
│  │  └─ [courseId]/              # 課程詳情 (需 generateStaticParams)
│  └─ teachers/                   # 教師介紹
│
├─ student/                       # 學生專區 (受 AuthGuard 保護)
│  ├─ layout.tsx                  # 包含 <AuthGuard>
│  ├─ dashboard/                  # 儀表板
│  ├─ booking/                    # 預約系統
│  └─ profile/                    # 個人檔案
│
└─ teacher/                       # 教師後台 (受 AuthGuard 保護)
   ├─ layout.tsx                  # 包含 <AuthGuard>
   ├─ courses/                    # 課程管理 Editor
   ├─ students/                   # 學生管理 CRM
   └─ reports/                    # 營收報表
```

## 核心架構說明

### 1. Static Export (靜態輸出)

本專案設定為 `output: export` 以支援 GitHub Pages 部署。這意味著：

- **不支援 Node.js Runtime 功能** (如 `getServerSideProps`, Middleware)。
- 所有 API 請求需由客戶端 (Client-side) 發起，直接對接 Supabase。
- `next/image` 需設定 loader 或使用雲端圖片服務。

### 2. 動態路由 (Dynamic Routes)

所有帶參數的路徑 (如 `[id]`) 必須實作 `generateStaticParams`，在建置時期預先生成 HTML。

```tsx
// 範例
export async function generateStaticParams() {
  return [{ id: "demo" }]; // 回傳所有可能的參數組合
}
```

### 3. 權限管理 (Client-side Auth)

由於無法使用 Middleware，我們採用前端攔截策略：

- **`AuthGuard.tsx`**: 檢查瀏覽器 Cookie/LocalStorage。
- 若無登入憑證，自動導向 `/auth/login`。
- 所有後台頁面 (`/student`, `/teacher`) 皆透過 Layout 包覆此守衛。

### 4. GitHub Actions 部署

專案包含 `.github/workflows/deploy.yml`，每次推送到 `main` 分支時：

1. 自動執行 `pnpm install` 與 `pnpm build`。
2. 將 `out` 資料夾部署至 GitHub Pages environment。

## 功能模組詳情

### 前台 (學生端)

- **首頁與作品集:** RWD 響應式設計，高互動性 UI。
- **課程方案:** 靜態生成的課程列表與詳情頁。
- **學員系統:** 登入後可管理預約、查看課程內容。

### 後台 (教師管理端)

- **課程管理:** 編輯課程內容與教案 (支援富文本)。
- **預約系統:** 管理學生預約請求。
- **CRM:** 追蹤學生學習進度與作品集。
