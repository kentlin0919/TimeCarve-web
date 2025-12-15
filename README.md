# Peggy Blog Web

## 專案簡介
這是一個基於 **Next.js (React)** 構建的現代化網頁應用程式，專為教育與課程管理設計。專案整合了學生端前台與教師管理後台，提供完整的課程預約、作品集展示及學員管理功能。

後端資料庫採用 **Supabase (PostgreSQL)**，並使用 **Tailwind CSS** 進行全站樣式開發，確保在各種裝置上都有良好的使用者體驗。

## 技術堆疊

*   **核心框架:** [Next.js 16](https://nextjs.org/) (App Router)
*   **前端函式庫:** [React 19](https://react.dev/)
*   **程式語言:** [TypeScript](https://www.typescriptlang.org/)
*   **樣式處理:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **資料庫 & Auth:** [Supabase](https://supabase.com/)
*   **字體:** `next/font` (Geist Sans & Geist Mono)
*   **套件管理:** pnpm

## 功能模組

### 1. 前台 (學生端)
*   **首頁與作品集:** 展示教學理念與精選作品。
*   **課程瀏覽:** 詳細的課程方案、價格與大綱說明。
*   **線上預約:** 直觀的時段選擇與預約流程。
*   **學生中心:** 管理個人預約、學習進度與個人資料。

### 2. 後台 (教師管理端)
*   **儀表板:** 系統營運概況與數據總覽。
*   **課程管理:** 課程方案的上架、編輯與教案設定。
*   **預約管理:** 處理學生的預約請求（確認/改期/取消）。
*   **學生 CRM:** 記錄學生學習歷程、筆記與作品。
*   **作品集 CMS:** 內建富文本編輯器，輕鬆管理作品集內容。
*   **營收報表:** 視覺化的營收趨勢分析。

## 快速開始

### 前置需求
確保您的環境已安裝：
*   Node.js (建議 v18 或更高版本)
*   pnpm

### 安裝步驟

1.  **克隆專案**
    ```bash
    git clone <your-repo-url>
    cd peggy-blog-web
    ```

2.  **安裝依賴**
    ```bash
    pnpm install
    ```

3.  **設定環境變數**
    複製 `.env.example` (如果存在) 並填入您的 Supabase 憑證：
    ```bash
    cp .env.example .env.local
    ```
    *需填入 `NEXT_PUBLIC_SUPABASE_URL` 與 `NEXT_PUBLIC_SUPABASE_ANON_KEY`*

4.  **啟動開發伺服器**
    ```bash
    pnpm dev
    ```
    打開瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

### 建置與部署

```bash
# 建置生產版本
pnpm build

# 預覽生產版本
pnpm start
```

## 專案結構 (App Router)

```
app/
├── public/                 # 公開頁面 (首頁, 課程, 登入, 法律條款)
│   ├── courses/            # 課程列表與詳細頁
│   ├── auth/               # 登入/註冊流程
│   └── teachers/           # 教師介紹
├── student/                # 學生專區 (需登入)
│   ├── dashboard/          # 學生儀表板
│   ├── booking/            # 預約流程
│   └── courses/            # 已購課程
├── teacher/                # 教師後台 (需權限)
│   ├── dashboard/          # 後台總覽
│   ├── courses/            # 課程管理
│   ├── students/           # 學生管理
│   └── reports/            # 營收報表
├── api/                    # API Route Handlers
├── layout.tsx              # 全域佈局
└── globals.css             # 全域樣式 (Tailwind)
```

## 開發規範

*   **組件架構:** 優先使用 React Server Components。互動組件請在文件頂部標註 `'use client'`。
*   **路由:** 遵循 Next.js App Router 的資料夾結構約定。
*   **樣式:** 全部使用 Tailwind CSS Utility Classes。
*   **Linting:** 提交代碼前請執行 `pnpm lint` 確保代碼品質。

## 授權

此專案採用 MIT 授權。詳情請參閱 [LICENSE](LICENSE) 文件。
