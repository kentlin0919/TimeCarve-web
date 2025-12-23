# TimeCarve 刻時 - 專案指南

## 專案概述

這是一個基於 **Next.js (App Router)** 構建的現代化家教預約平台專案，針對 **Static Export (GitHub Pages)** 進行了優化。TimeCarve 提供學生與教師高效的時間管理及課程預約工具，幫助他們規劃課表、管理預約、並追蹤個人化的學習進度。

## 技術堆疊

- **前端框架:** [Next.js 16](https://nextjs.org/) (App Router)
- **前端圖表:** [Chart.js](https://www.chartjs.org/)
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
   - 建置過程中會讀取 GitHub Secrets (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) 注入環境變數。
2. 將 `out` 資料夾部署至 GitHub Pages environment。

### 5. 環境變數設定 (Environment Variables)

為了讓 Supabase 在 GitHub Pages 正確運作，請在 GitHub Repository Settings 中設定以下 Secrets：

1. 進入 **Settings** > **Secrets and variables** > **Actions**。
2. 點擊 **New repository secret**。
3. 新增以下兩組密鑰：
   - `NEXT_PUBLIC_SUPABASE_URL`: 您的 Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 您的 Supabase Project API Key (Anon)

### 6. Clean Architecture (整潔架構)

本專案鼓勵採用 Clean Architecture (整潔架構) 的設計原則，以實現高可維護性、高可測試性及框架獨立性。雖然這是一個前端專案，但其核心思想對於複雜邏輯的組織與擴展至關重要。

**核心原則**：

*   **獨立於框架 (Framework Independence)**：架構不應依賴於特定函式庫或框架（如 Next.js）。
*   **可測試性 (Testability)**：業務邏輯應能獨立於 UI、資料庫、API 等外部因素進行測試。
*   **獨立於 UI (UI Independence)**： UI 可以在不改變系統其他部分的情況下輕鬆替換。
*   **獨立於資料庫 (Database Independence)**：資料庫可以輕鬆替換（例如從 Supabase 換到 Firebase）。

**分層與應用**：

儘管前端專案無法完全實現如傳統後端般嚴格的四層結構，但可以借鑒其核心思想，將應用程式邏輯劃分為以下層次：

1.  **領域層 (Domain Layer)**
    *   **內容**：定義應用程式的核心實體 (Entities)、業務規則 (Business Rules) 和通用介面 (Interfaces)。它是應用程式最內層，不依賴任何其他層。
    *   **本專案應用**：定義學生、教師、課程、預約等核心資料結構 (TypeScript Interfaces/Types)，以及這些資料操作的通用規則。

2.  **應用層 (Application Layer)**
    *   **內容**：包含應用程式的特定業務邏輯 (Use Cases)，協調領域層實體來完成特定功能。它定義了資料如何進出系統，並定義了資料庫（或外部服務）的抽象介面 (Repository Interfaces)。
    *   **本專案應用**：定義如 `bookCourseUseCase` (預約課程)、`updateUserProfileUseCase` (更新用戶資料) 等操作。這些 Use Case 會依賴在領域層定義的介面（例如 `UserRepository`, `CourseRepository`）。

3.  **基礎設施層 (Infrastructure Layer)**
    *   **內容**：實作應用層定義的所有抽象介面，處理與外部服務的互動。
    *   **本專案應用**：
        *   **資料庫實作**：使用 `@supabase/supabase-js` 實際呼叫 Supabase 進行資料的 CRUD 操作，實作 `UserRepositoryImpl`, `CourseRepositoryImpl` 等。
        *   **身份驗證**：Supabase Auth 相關的 API 呼叫。
        *   **服務整合**：未來可能包含其他第三方服務的 API 呼叫。

4.  **表示層 (Presentation Layer)**
    *   **內容**：UI 層，負責資料的呈現與使用者互動。它不包含任何業務邏輯，只負責協調應用層的 Use Cases 並呈現結果。
    *   **本專案應用**：Next.js 的 `app` Router 頁面、共用元件 (Components)、Hooks 等，它們呼叫應用層定義的 Use Cases，並將結果呈現在畫面上。

**優勢**：

*   **易於測試**：核心業務邏輯 (領域層和應用層) 可以獨立測試，無需模擬 UI 或資料庫。
*   **易於維護**：各層職責分離，修改某一層通常不會影響到其他層。
*   **靈活性**：可輕鬆替換技術棧，例如將 Supabase 替換為其他後端服務，只需修改基礎設施層的實作。

透過這種分層，即使專案規模擴大，也能保持清晰的結構與良好的可擴展性。

## 功能模組詳情

### 前台 (學生端)

- **首頁與作品集:** RWD 響應式設計，高互動性 UI。
- **課程方案:** 靜態生成的課程列表與詳情頁。
- **學員系統:** 登入後可管理預約、查看課程內容。

### 後台 (教師管理端)

- **課程管理:** 編輯課程內容與教案 (支援富文本)。
- **預約系統:** 管理學生預約請求。
- **CRM:** 追蹤學生學習進度與作品集。

## ⚠️ 靜態網站開發規則 (Static Export Rules)

本專案使用 `output: export` 靜態輸出模式，**必須遵守以下開發規則**：

### 禁止使用的功能

| 功能                                    | 原因                 | 替代方案                                       |
| --------------------------------------- | -------------------- | ---------------------------------------------- |
| `middleware.ts`                         | Static Export 不支援 | 使用 `AuthGuard.tsx` 客戶端守衛                |
| `@supabase/ssr` 的 `createServerClient` | 需要 Server Runtime  | 使用 `@supabase/supabase-js` 的 `createClient` |
| `next/headers` 的 `cookies()`           | 需要 Server Runtime  | 使用 `document.cookie` 或 Supabase 自動處理    |
| `getServerSideProps`                    | 需要 Server Runtime  | 使用 `useEffect` + Client Fetch                |
| API Routes (`app/api/*`)                | 需要 Server Runtime  | 直接呼叫 Supabase / Edge Functions             |

### Supabase 客戶端使用規則

```typescript
// ✅ 正確：使用 @supabase/supabase-js
import { createClient } from "@supabase/supabase-js";

export function createClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// ❌ 錯誤：不要使用 @supabase/ssr 的 Server 版本
import { createServerClient } from "@supabase/ssr"; // 禁止
```

### Cookie 處理規則

- **不能在 Server 端寫入 Cookie** (沒有 Server)
- Supabase Auth 會**自動**在 Client 端管理 Session Cookie
- 如需自訂 Cookie，使用 `document.cookie` 或 `js-cookie` 套件

### TypeScript 設定

`tsconfig.json` 必須排除 Supabase Edge Functions 目錄：

```json
{
  "exclude": ["node_modules", "supabase/functions"]
}
```

### 檔案命名規則

- **禁止** 在專案根目錄建立 `middleware.ts` 或 `proxy.ts`
- **禁止** 建立 `app/api/` 目錄下的 API Routes
