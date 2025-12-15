# Peggy Blog Web - 專案指南

## 專案概述

這是一個基於 **Next.js (React)** 構建的現代化網頁應用程式專案。專案採用 **TypeScript** 進行開發，並使用 **Tailwind CSS** 進行樣式處理。資料庫則使用 **Supabase (PostgreSQL)**。此專案旨在提供一個完整的學生端前台功能及教師管理端後台功能。

## 技術堆疊

- **前端框架:** [Next.js](https://nextjs.org/) (App Router) with [React](https://react.dev/)
- **後端服務/資料庫:** [Supabase](https://supabase.com/) (PostgreSQL)
- **語言:** [TypeScript](https://www.typescriptlang.org/)
- **樣式:** [Tailwind CSS](https://tailwindcss.com/)
- **字體:** `next/font` (Geist Sans & Geist Mono)
- **套件管理:** pnpm (根據 `pnpm-lock.yaml` 推斷)

## 快速開始

### 1. 安裝依賴

```bash
pnpm install
# 或使用 npm / yarn / bun
```

### 2. 啟動開發伺服器

```bash
pnpm dev
```

瀏覽器打開 [http://localhost:3000](http://localhost:3000) 查看結果。

### 3. 建置生產版本

```bash
pnpm build
pnpm start
```

### 4. 程式碼品質檢查

```bash
pnpm lint
```

## 專案結構

主要採用 Next.js App Router 結構：

- **`app/`**: 應用程式的主要程式碼，詳細結構如下：
  ```
  app/
  ├─ layout.tsx                     # Root layout（全站）
  ├─ not-found.tsx                  # 全站 404
  ├─ error.tsx                      # 全站錯誤 fallback
  ├─ middleware.ts                  # 權限 / role guard（可選）

  ├─ public/                        # 未登入可存取
  │  ├─ layout.tsx                  # 公開頁面 layout（navbar / footer）
  │  ├─ page.tsx                    # 首頁＋作品集（screen: 首頁與作品集）
  │  │
  │  ├─ courses/
  │  │  ├─ page.tsx                 # 課程方案列表
  │  │  └─ [courseId]/
  │  │     └─ page.tsx              # 課程方案公開詳細頁（補缺）
  │  │
  │  ├─ teachers/
  │  │  └─ [teacherId]/
  │  │     └─ page.tsx              # 教師公開介紹頁（品牌 / 招生）
  │  │
  │  ├─ auth/
  │  │  ├─ layout.tsx
  │  │  ├─ login/
  │  │  │  └─ page.tsx              # 登入頁
  │  │  ├─ register/
  │  │  │  └─ page.tsx              # 獨立註冊頁
  │  │  ├─ forgot-password/
  │  │  │  └─ page.tsx              # 忘記密碼（補缺）
  │  │  ├─ reset-password/
  │  │  │  └─ page.tsx              # 重設密碼（補缺）
  │  │  └─ verify/
  │  │     └─ page.tsx              # Email 驗證狀態頁
  │  │
  │  └─ legal/
  │     ├─ terms/
  │     │  └─ page.tsx              # 使用者條款
  │     └─ privacy/
  │        └─ page.tsx              # 隱私政策
  │
  ├─ student/                       # 學生登入後
  │  ├─ layout.tsx                  # Student layout（role guard）
  │  │
  │  ├─ dashboard/
  │  │  └─ page.tsx                 # 學生儀表板
  │  │
  │  ├─ booking/
  │  │  ├─ page.tsx                 # 預約課程介面
  │  │  ├─ success/
  │  │  │  └─ page.tsx              # 預約成功（補缺）
  │  │  ├─ error/
  │  │  │  └─ page.tsx              # 預約失敗（補缺）
  │  │  └─ [bookingId]/
  │  │     └─ reschedule/
  │  │        └─ page.tsx           # 改期頁（補缺）
  │  │
  │  ├─ courses/
  │  │  └─ page.tsx                 # 我已購買 / 已報名的課程
  │  │
  │  ├─ notifications/
  │  │  └─ page.tsx                 # 學生通知中心（補缺）
  │  │
  │  └─ profile/
  │     └─ page.tsx                 # 編輯個人檔案（學生）
  │
  ├─ teacher/                       # 教師 / Admin 後台
  │  ├─ layout.tsx                  # Teacher layout（嚴格 role guard）
  │  │
  │  ├─ dashboard/
  │  │  └─ page.tsx                 # 教師管理後台總覽
  │  │
  │  ├─ courses/
  │  │  ├─ page.tsx                 # 課程方案管理
  │  │  └─ [courseId]/
  │  │     └─ edit/
  │  │        └─ page.tsx           # 課程方案詳細編輯
  │  │
  │  ├─ lesson-plans/
  │  │  ├─ page.tsx                 # 教案列表
  │  │  └─ [planId]/
  │  │     └─ edit/
  │  │        └─ page.tsx           # 教案設定
  │  │
  │  ├─ bookings/
  │  │  └─ page.tsx                 # 預約管理
  │  │
  │  ├─ students/
  │  │  ├─ page.tsx                 # 學生列表（搜尋）
  │  │  └─ [studentId]/
  │  │     └─ page.tsx              # 學生詳細（分頁：預約 / 筆記 / 作品）
  │  │
  │  ├─ portfolio/
  │  │  ├─ page.tsx                 # 作品集管理
  │  │  └─ [workId]/
  │  │     └─ edit/
  │  │        └─ page.tsx           # 作品詳細編輯（富文本）
  │  │
  │  ├─ reports/
  │  │  └─ revenue/
  │  │     └─ page.tsx              # 營收報表
  │  │
  │  ├─ notifications/
  │  │  └─ page.tsx                 # 教師通知中心（補缺）
  │  │
  │  ├─ settings/
  │  │  └─ page.tsx                 # 系統設定（時段 / 規則）
  │  │
  │  └─ profile/
  │     └─ page.tsx                 # 教師個人檔案
  │
  └─ api/                           # Route Handlers / Server Actions
     ├─ auth/
     ├─ courses/
     ├─ bookings/
     ├─ lesson-plans/
     ├─ students/
     ├─ portfolio/
     └─ reports/
  ```
- **`public/`**: 存放靜態資源（如圖片、SVG）。
- **設定檔**:
  - `next.config.ts`: Next.js 設定。
  - `tailwind.config.ts`: (如果存在，v4 可能直接在 CSS 中設定或自動偵測，目前依賴 `postcss.config.mjs`)。
  - `tsconfig.json`: TypeScript 設定。

## 開發規範

- **組件:** 優先使用 React Server Components (RSC)，需要互動時使用 `'use client'`。
- **樣式:** 使用 Tailwind CSS Utility classes 進行開發。
- **路徑:** 遵循 Next.js App Router 的資料夾路由規則。

## 常用指令列表

| 指令    | 說明                   |
| ------- | ---------------------- |
| `dev`   | 啟動開發環境           |
| `build` | 建置生產版本           |
| `start` | 執行已建置的生產版本   |
| `lint`  | 執行 ESLint 檢查程式碼 |

---

## 專案功能詳情

### 1. 系統核心與基礎架構

- **技術棧：** Next.js (React) + Supabase (PostgreSQL) + Tailwind CSS。
- **身份驗證系統：** 支援學生註冊/登入、教師後台權限管理。
- **專案建置：** 包含 Git 版本控制、資料庫 schema 設計、GitHub Pages 自動化部署設定。

### 2. 前台 (學生端)

- **首頁與作品集：** 現代化 RWD 響應式設計，展示作品集與教學理念。
- **課程方案列表：** 卡片式設計，清晰展示課程內容、價格與大綱。
- **預約課程系統：** 直觀的日期與時段選擇器，防止重複預約邏輯。
- **學生儀表板：** 查看已預約課程、學習進度追蹤、個人資料管理。

### 3. 後台 (教師管理端)

- **教師儀表板：** 系統概況總覽。
- **課程與教案管理：** 新增、編輯、刪除課程方案與詳細教案內容。
- **作品集管理 (CMS)：** 富文本編輯器，支援圖片上傳與作品說明撰寫。
- **預約管理系統：** 查看學生預約請求，執行確認、改期或取消操作。
- **學生資訊管理 (CRM)：** 學生專屬頁面，記錄學習筆記、預約歷史與學生作品集。
- **營收報表：** 圖表化顯示營收總額與趨勢分析。
- **個人檔案設定：** 編輯教師簡介與聯絡資訊。
