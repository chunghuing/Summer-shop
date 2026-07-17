# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案

Summer —— 一個編輯感拼貼風格的電商網站，採用 Nuxt 4 建置。`doc/` 內所有文件皆以繁體中文撰寫；編輯時請沿用此慣例。

**請先讀 `doc/README.md`**——它索引了完整的文件系統（`ARCHITECTURE.md`、`DEVELOPMENT.md`、`FEATURES.md`、`TESTING.md`、`CHANGELOG.md`、`doc/plans/`）。本文件只涵蓋能讓你快速上手所需的內容。

**目前是純前端 demo，沒有後端、沒有資料庫**：商品目錄寫死在 `app/data/catalog.ts`，購物車/登入/訂單狀態全部靠 `useCookie` 存在瀏覽器（不會跨裝置、清 cookie 就會遺失，這是刻意的設計取捨，不是 bug）。

## 常用指令

```bash
npm run dev           # 開發伺服器，:3000
npm run build          # production build
npm run lint            # eslint .（透過 eslint-plugin-prettier 一併檢查 Prettier）
npm run lint:fix        # eslint . --fix
npm run format:check     # prettier --check .
```

目前尚無測試套件（`npm run test` 為規劃中、尚未串接，詳見 `doc/TESTING.md`）。提交前 `npm run lint` 必須通過；沒有另外的 typecheck script。不需要任何環境變數，`.env`/`.env.example` 目前是空的。

## 架構

技術棧：Nuxt 4（`app/` 為 source root）＋ Vue 3 ＋ Tailwind v3（`@nuxtjs/tailwindcss`）＋ Pinia。**沒有 `server/api/*`**——所有資料都在前端（靜態資料 + cookie），頁面直接呼叫 store/utils，不打任何內部 API。

### 資料層：靜態商品目錄 + 三個 cookie-backed Pinia store

- `app/data/catalog.ts`：純資料，`categories[]`／`products[]`（每個 product 內嵌 `product_images[]`、`product_variants[]`）。要新增/修改商品直接改這個檔案。
- `app/utils/catalog.ts`（`app/utils/*.ts` 會自動 import）：`getCategories()`、`getProducts({ category })`、`getProductBySlug(slug)`、`getVariantById(id)`，都是同步函式，不用 `await`/`useFetch`。
- `app/stores/cart.ts`（`useCartStore`）：內部用 `useCookie('ma_cart')` 存 `{variantId, quantity}[]`，`items`/`itemCount`/`subtotal` 是 computed，即時從 `catalog` join 出完整商品資訊（不會有「快照過期」問題）。`itemId` 就是 `variantId`（一個購物車只會有一筆對應該規格）。
- `app/stores/auth.ts`（`useAuthStore`）：`useCookie('ma_user')` 存目前登入 session（`{email, fullName} | null`），另一個 `useCookie('ma_accounts')` 存假帳號資料庫（`{email, fullName, passwordHash}[]`）。`register()` 檢查密碼長度、Email 是否重複註冊，密碼經雜湊後才存入；`login()` 比對帳號是否存在、密碼雜湊是否相符——需要先註冊過才能登入，不是隨便輸入就成功。
- `app/stores/orders.ts`（`useOrdersStore`）：`useCookie('ma_orders')` 存訂單陣列。`placeOrder(address)` 從 `cartStore.items` 組出訂單快照、清空購物車、回傳新訂單。

全部用 `useCookie`（Nuxt 內建的 universal cookie composable）而不是 `localStorage`：cookie 在 SSR 階段就讀得到，不會有「先渲染空的、client 再補資料」的閃爍或水合不一致問題——這也是為什麼**沒有** SSR cookie 轉發那類 gotcha 需要處理，頁面不呼叫任何內部 API，自然沒有轉發不轉發的問題。

### 登入驗證

`app/middleware/auth.ts`、`guest.ts` 判斷 `useAuthStore().user`。`cart-not-empty.ts` 在購物車為空時把 `/checkout` 導回 `/cart`。頁面透過 `definePageMeta({ middleware: [...] })` 個別套用保護。

### 慣例

- Store action 丟錯一律用 Nuxt 的 `createError({ statusCode, statusMessage })`（client/server 通用），呼叫端用 `try/catch` 接。
- `app/utils/*.ts` 匯出的函式會自動 import（Nitro/Nuxt 慣例）——`formatPrice`、`getCategories`、`getProducts`、`getProductBySlug`、`getVariantById` 都不需要手動 import。
- Nuxt 元件自動命名會**去除跟目錄名重複的前綴**：`app/components/product/ProductCard.vue` 的全域名稱是 `ProductCard`，不是 `ProductProductCard`（曾經因為這個誤會導致商品列表頁引用了不存在的元件名稱，一直沒被發現是因為當時商品資料來源是空的，`v-for` 從沒真的跑過；改成有資料後才暴露出來，已修正）。改其他目錄下的元件前記得確認實際註冊名稱。
- Design tokens（色彩、字體）定義在 `tailwind.config.ts`，來源是 Pencil 設計檔 `doc/design/summer.pen`（只能透過 Pencil MCP 工具開啟——它是加密檔案，不要用 `Read`/`Grep`）。
- 新功能開發一律先在 `doc/plans/<YYYY-MM-DD>-<slug>.md` 建立計畫檔；要等 `ARCHITECTURE.md`/`FEATURES.md` 已同步反映實際做出來的東西、且 `CHANGELOG.md` 有對應條目後，才能搬到 `doc/plans/archive/`（完整規則見 `doc/DEVELOPMENT.md` 第 7 節）。
