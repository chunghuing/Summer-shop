# 開發規範

## 1. 事前準備

- Node.js（版本對齊 `package.json` 的 Nuxt 4 要求）
- npm（repo 內為 `package-lock.json`）

## 2. 快速開始

```bash
npm install
npm run dev
```

不需要 `.env`——目前是純前端 demo，沒有後端、沒有資料庫，商品資料寫死在 `app/data/catalog.ts`，購物車/登入/訂單狀態存在瀏覽器 cookie。詳見 [ARCHITECTURE.md](./ARCHITECTURE.md)。

## 3. 環境變數

無。`.env.example` 保留檔案但內容只是一行說明，不需要填任何值。

## 4. 命名規則

**檔案 / 路由**
- 頁面路由：kebab-case，動態區段用 `[param]`（例：`app/pages/products/[slug].vue`）
- Vue 元件：PascalCase（例：`ProductCard.vue`）
- Composable / Pinia store：`useX` 開頭（例：`useCartStore`）

**Git**
- Commit message：說明「為什麼」而非「做了什麼」，優先參考既有 commit 風格
- 新功能開發前先在 `doc/plans/` 建立對應計畫檔

## 5. 程式撰寫規範

- Vue 元件一律用 Composition API + `<script setup>`
- TypeScript 優先，避免 `any`
- ESLint（`@nuxt/eslint`）與 Prettier 已透過 `eslint-plugin-prettier` 整合成單一檢查，`npm run lint` 未過不得提交
- Prettier 規則（`.prettierrc`）：不加分號、單引號、`printWidth: 100`、不加尾隨逗號、箭頭函式參數一律加括號
- Store action／頁面丟錯一律用 Nuxt 的 `createError({ statusCode, statusMessage })`（client/server 通用 composable），呼叫端用 `try/catch` 接：
  ```ts
  throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  ```
  各情境的錯誤處理方式見 [FEATURES.md](./FEATURES.md) 的「錯誤情境」表。

## 6. 資料層（無後端）

- 商品目錄是純資料，直接改 `app/data/catalog.ts`；讀取一律透過 `app/utils/catalog.ts` 的 getter（`getCategories`/`getProducts`/`getProductBySlug`/`getVariantById`），這些函式會自動 import
- 購物車/登入/訂單狀態用 `useCookie()`（Nuxt 內建 universal composable）存在瀏覽器，不要改用 `localStorage`——`useCookie` 在 SSR 階段就讀得到值，`localStorage` 不會，會重新引入「首次渲染閃爍」問題

## 7. 計畫撰寫與歸檔流程

- 新開發工作先在 `doc/plans/` 建立計畫檔，檔名格式：`<YYYY-MM-DD>-<kebab-slug>.md`（日期為開始撰寫該計畫的日期）
- 計畫檔開頭放中繼資料區塊：
  ```markdown
  - 狀態：草稿 | 進行中 | 完成
  - 建立日期：YYYY-MM-DD
  - 相關文件：[ARCHITECTURE.md](../ARCHITECTURE.md)、[FEATURES.md](../FEATURES.md)
  ```
- **歸檔條件**（需全部符合才能搬到 `doc/plans/archive/`）：
  1. 計畫內每個階段列出的驗證步驟都已實際執行並通過
  2. `ARCHITECTURE.md` / `FEATURES.md` 已同步更新，反映實際做出來的東西（不是原始規劃）
  3. `CHANGELOG.md` 已有對應條目
- 歸檔時用 `git mv doc/plans/<file>.md doc/plans/archive/<file>.md`，唯一允許的內容修改是把中繼資料的「狀態」改成「已歸檔：YYYY-MM-DD」
- 不重開已歸檔的計畫——新功能一律開新計畫檔，若需要參考舊決策就用連結引用

## 8. 測試

執行方式、撰寫指南見 [TESTING.md](./TESTING.md)。

## 9. 疑難排解 / FAQ

| 問題 | 排查方向 |
|---|---|
| Tailwind class 沒有作用 | 確認該檔案路徑有被 `@nuxtjs/tailwindcss` 的 content 掃描涵蓋（`app/pages`、`app/components`、`app/layouts` 等） |
| 登入後頁面沒有反映登入狀態 | 確認是否直接用了 `useAuthStore().user`，而不是自行快取的變數 |
| 新增的元件在 template 裡顯示「Failed to resolve component」 | Nuxt 自動命名會去除跟目錄名重複的前綴（`components/product/ProductCard.vue` 註冊為 `ProductCard`，不是 `ProductProductCard`），確認實際註冊名稱，見 [CLAUDE.md](../CLAUDE.md) |
| 購物車/登入/訂單重新整理後消失 | 確認瀏覽器沒有封鎖 cookie；這些狀態故意不做跨裝置同步，換瀏覽器/清 cookie 本來就會遺失 |
