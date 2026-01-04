# TimeCarve 刻時 - 專案指南

## 專案概述

這是一個基於 **Next.js (App Router)** 構建的現代化家教預約平台專案，部署於 **Vercel**。TimeCarve 提供學生與教師高效的時間管理及課程預約工具，幫助他們規劃課表、管理預約、並追蹤個人化的學習進度。

## 技術堆疊

- **前端框架:** [Next.js 16](https://nextjs.org/) (App Router)
- **前端圖表:** [Chart.js](https://www.chartjs.org/)
- **後端服務:** [Supabase](https://supabase.com/) (PostgreSQL + Auth)
- **語言:** [TypeScript](https://www.typescriptlang.org/)
- **樣式:** [Tailwind CSS v4](https://tailwindcss.com/)
- **部署:** [Vercel](https://vercel.com/) (自動化 CI/CD)

## 快速開始

### 1. 安裝依賴

```bash
pnpm install
```

### 2. 設定環境變數

建立 `.env.local` 檔案：

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. 啟動開發伺服器

```bash
pnpm dev
# 訪問 http://localhost:3000
```

### 4. 建置生產版本

```bash
pnpm build
```

## 專案結構

```
time_carve_web/
├── src/                          # 原始碼目錄
│   ├── app/                      # Next.js App Router
│   │   ├── (public)/             # 公開頁面群組 (無需登入)
│   │   │   ├── auth/             # 登入/註冊/重設密碼
│   │   │   ├── courses/          # 課程瀏覽
│   │   │   └── teachers/         # 教師介紹
│   │   │
│   │   ├── student/              # 學生專區 (受 AuthGuard 保護)
│   │   │   ├── dashboard/        # 儀表板
│   │   │   ├── booking/          # 預約系統
│   │   │   ├── bookings/         # 預約記錄
│   │   │   │   └── [bookingId]/  # 預約詳情 (動態路由)
│   │   │   └── profile/          # 個人檔案
│   │   │
│   │   ├── teacher/              # 教師後台 (受 AuthGuard 保護)
│   │   │   ├── courses/          # 課程管理
│   │   │   ├── students/         # 學生管理 CRM
│   │   │   └── reports/          # 營收報表
│   │   │
│   │   ├── admin/                # 管理後台
│   │   ├── layout.tsx            # 根佈局
│   │   └── globals.css           # 全域樣式
│   │
│   ├── components/               # 共用 UI 組件
│   │   ├── AuthGuard.tsx         # 權限守衛
│   │   ├── ui/                   # 基礎 UI 組件
│   │   └── providers/            # Context Providers
│   │
│   ├── hooks/                    # 自定義 React Hooks
│   │   └── useSchools.ts
│   │
│   ├── lib/                      # 工具函數與設定
│   │   ├── supabase.ts           # Supabase 客戶端
│   │   ├── domain/               # 領域層 (實體與介面)
│   │   ├── infrastructure/       # 基礎設施層 (Repository 實作)
│   │   └── application/          # 應用層 (Use Cases)
│   │
│   └── types/                    # TypeScript 型別定義
│       └── database.types.ts     # Supabase 資料庫型別
│
├── public/                       # 靜態資源
├── supabase/                     # Supabase 設定與 Migrations
├── scripts/                      # 工具腳本
└── 設定檔案
```

## 路徑別名 (Path Aliases)

專案使用以下路徑別名（定義於 `tsconfig.json`）：

| 別名             | 對應路徑             |
| ---------------- | -------------------- |
| `@/*`            | `./src/*`            |
| `@/components/*` | `./src/components/*` |
| `@/hooks/*`      | `./src/hooks/*`      |
| `@/lib/*`        | `./src/lib/*`        |
| `@/types/*`      | `./src/types/*`      |

### 使用範例

```typescript
// ✅ 正確
import { supabase } from "@/lib/supabase";
import AuthGuard from "@/components/AuthGuard";
import { useSchools } from "@/hooks/useSchools";
import { Database } from "@/types/database.types";

// ❌ 避免使用
import { supabase } from "../../../lib/supabase";
```

## 核心架構說明

### 1. Vercel 部署

本專案使用 Vercel 原生部署模式，支援：

- **Server-Side Rendering (SSR)**: 動態渲染頁面
- **動態路由**: 如 `/student/bookings/[bookingId]` 無需預先生成
- **API Routes**: 可根據需要建立 `/src/app/api/` 路由
- **Edge Functions**: 支援邊緣計算功能

### 2. 權限管理 (Client-side Auth)

我們採用前端攔截策略進行權限管理：

- **`AuthGuard.tsx`**: 檢查使用者登入狀態
- 若無登入憑證，自動導向 `/auth/login`
- 所有後台頁面 (`/student`, `/teacher`, `/admin`) 皆透過 Layout 包覆此守衛

### 3. Vercel 部署設定

#### 連接 GitHub Repository

1. 前往 [vercel.com](https://vercel.com)
2. 點擊 **Add New Project**
3. Import 你的 GitHub repository

#### 環境變數設定

在 Vercel 專案設定 (Settings → Environment Variables) 中新增：

| Variable                        | Value                     |
| ------------------------------- | ------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | 你的 Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 你的 Supabase Anon Key    |

### 4. Clean Architecture (整潔架構)

本專案採用 Clean Architecture 的設計原則：

**分層架構**：

1. **領域層 (`lib/domain/`)**: 定義核心實體和業務規則
2. **應用層 (`lib/application/`)**: 包含 Use Cases
3. **基礎設施層 (`lib/infrastructure/`)**: 實作資料存取（Supabase）
4. **表示層 (`app/`, `components/`)**: React 組件和頁面

## 資料庫版本控制規範 (Supabase)

### Migration 建立規則

- **必須使用 CLI 指令**：如須建立資料庫變更，**必須**使用 `supabase migration new <name>` 指令

### `.gitignore` 設定

```
# Supabase
supabase/.branches
supabase/.temp
supabase/functions/*/deno.lock
supabase/functions/*/target/
```

## 功能模組詳情

### 前台 (學生端)

- **首頁與作品集:** RWD 響應式設計，高互動性 UI
- **課程方案:** 課程列表與詳情頁
- **學員系統:** 登入後可管理預約、查看課程內容

### 後台 (教師管理端)

- **課程管理:** 編輯課程內容與教案 (支援富文本)
- **預約系統:** 管理學生預約請求
- **CRM:** 追蹤學生學習進度與作品集

## 開發規則

### Supabase 客戶端使用

```typescript
// 標準用法
import { supabase } from "@/lib/supabase";

// 查詢資料
const { data, error } = await supabase.from("courses").select("*");
```

### TypeScript 設定

`tsconfig.json` 必須排除 Supabase Edge Functions 目錄：

```json
{
  "exclude": ["node_modules", "supabase/functions"]
}
```
