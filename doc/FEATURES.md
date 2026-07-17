# 功能清單

> 目前是純前端 demo（見 [ARCHITECTURE.md](./ARCHITECTURE.md)），沒有後端、沒有資料庫。商品資料寫死在 `app/data/catalog.ts`；購物車、登入、訂單狀態存在瀏覽器 cookie（`useCookie`），清 cookie／換瀏覽器就會遺失，這是刻意的設計取捨。

## 功能總覽

| 功能 | 對應路由 | 狀態 |
|---|---|---|
| 商品首頁 | `/` | 已完成 |
| 商品詳情 | `/products/[slug]` | 已完成 |
| 商品列表（依分類瀏覽） | `/products` | 已完成 |
| 購物車 | `/cart` | 已完成 |
| 結帳 | `/checkout` | 已完成 |
| 登入 / 註冊 / 登出 | `/login`、`/register`、NavBar 帳號選單 | 已完成（假帳號資料庫，需先註冊才能登入） |
| 我的訂單 | `/account/orders` | 已完成 |
| 訂單詳情 | `/account/orders/[id]` | 已完成 |

## 商品首頁（`/`）

呈現 Pencil 設計稿的六大行銷區塊：公告列、Nav、Hero 拼貼、「2 FOR NT.598」促銷、「Made in Taiwan」品牌故事、商品分類、Footer。分類資料來自 `getCategories()`（`app/utils/catalog.ts`，同步讀取靜態資料）。Hero 拼貼/促銷/品牌故事的裝飾照片與商品分類卡片都可點擊：分類卡片連到 `/products?category=slug`，其餘裝飾照片一律連到 `/products`（這些照片是編輯感素材照，不對應特定商品）。Nav 選單只有一個「熱賣商品」連結，導向 `/products`。

## 商品詳情（`/products/[slug]`）

顯示單一商品的圖片、名稱、描述、價格、規格（尺寸/顏色）選擇器與庫存狀態。選擇規格後「加入購物車」呼叫 `useCartStore().addItem()`。若 slug 不存在或商品非 `active` 狀態，`getProductBySlug()` 回傳 `null`，頁面丟出 404。

## 購物車（`/cart`）

列出目前購物車品項（`useCartStore`，cookie 持久化），可調整數量、移除品項，即時顯示小計。數量調整超過該規格庫存時 store 會丟出 `createError({statusCode: 409})`（UI 已用 `:disabled` 擋掉這個情境，不會實際觸發）。購物車為空時顯示「您的購物車目前是空的」空狀態並導回商品列表。Nav 列的購物車圖示會即時顯示品項數量徽章。「前往結帳」按鈕依登入狀態（`useAuthStore`）導向 `/checkout` 或 `/login?redirect=/checkout`。

## 結帳（`/checkout`）

需登入（`auth` middleware）且購物車不可為空（`cart-not-empty` middleware，空購物車導回 `/cart`）。採精簡版頁首版型（`layouts/checkout.vue`，僅 logo + 步驟指示，無完整 Nav/Footer）。表單依 Pencil 設計稿刻成：收件人姓名、聯絡電話、郵遞區號、縣市、鄉鎮市區、詳細地址；若使用者曾下過單會自動帶入最近一筆訂單的收貨地址（best-effort，讀 `useOrdersStore().orders[0]`）。付款方式固定顯示「貨到付款」。送出時呼叫 `useOrdersStore().placeOrder(form)`：從目前購物車組出訂單快照、清空購物車、回傳新訂單，導向該筆訂單的詳情頁。訂單狀態固定為 `pending`。

## 登入 / 註冊 / 登出（`/login`、`/register`、NavBar 帳號選單）

沒有真的後端，但 `useAuthStore()` 用一個獨立的 cookie（`ma_accounts`）模擬帳號資料庫，**不是隨便輸入一組帳密就能登入**：

- **註冊**：`register(fullName, email, password)` 檢查密碼至少 8 碼、Email 是否已註冊過（重複則擋下並提示「請直接登入」），通過後把 `{email, fullName, passwordHash}` 存進 `ma_accounts`（密碼經 SHA-256 雜湊，不存明文），並自動登入
- **登入**：`login(email, password)` 在 `ma_accounts` 裡找對應 Email，找不到顯示「帳號不存在」；找到但密碼雜湊不符顯示「密碼錯誤」
- **登出**：NavBar 使用者圖示登入後會顯示下拉選單（姓名／「我的訂單」／「登出」），點擊「登出」呼叫 `useAuthStore().logout()` 清空登入 session（`ma_user`），但保留 `ma_accounts`，之後可以用同一組帳密再登入

登入狀態存在 cookie（`ma_user`），不會過期，除非手動清 cookie 或登出。成功後導向 `redirect` query 參數指定的頁面（預設回首頁）。已登入者造訪 `/login`、`/register` 會被 `guest` middleware 導向首頁；未登入時存取需登入頁面會被 `auth` middleware 導向 `/login?redirect=<path>`，已套用在 `/checkout`、`/account/orders`、`/account/orders/[id]`。

## 我的訂單（`/account/orders`）

需登入（`auth` middleware）。列出目前 cookie（`ma_orders`）裡的所有訂單，新訂單在最前面，顯示訂單編號、狀態徽章（`UiStatusBadge`）、日期、總金額，點擊列項目前往訂單詳情。無訂單時顯示空狀態並導回商品列表。

## 訂單詳情（`/account/orders/[id]`）

需登入（`auth` middleware）。在 `useOrdersStore().orders` 裡依 `id` 尋找，顯示完整明細：商品品項（縮圖、名稱、規格快照、單價 × 數量、小計）、收貨地址快照、小計/運費/總計。找不到該 id 時丟出 404（單一使用者情境，沒有「非本人查看」的概念）。

## 錯誤情境

| 情境 | 處理方式 |
|---|---|
| 商品規格庫存不足 | `useCartStore().addItem()`/`updateItemQuantity()` 丟出 `createError({statusCode: 409})`；UI 已用庫存上限擋掉大部分情境 |
| 購物車為空時前往結帳 | `cart-not-empty` middleware 導回 `/cart` |
| 未登入存取需登入頁面 | `auth` middleware 導向 `/login?redirect=<path>` |
| 已登入造訪登入/註冊頁 | `guest` middleware 導向首頁 |
| 商品 slug 不存在 | 頁面丟出 `createError({statusCode: 404})` |
| 訂單 id 不存在 | 頁面丟出 `createError({statusCode: 404})` |
| 登入時 Email 未註冊過 | `useAuthStore().login()` 丟出 `createError({statusCode: 404})`，顯示「帳號不存在」 |
| 登入時密碼錯誤 | `useAuthStore().login()` 丟出 `createError({statusCode: 401})`，顯示「密碼錯誤」 |
| 註冊時 Email 已註冊過 | `useAuthStore().register()` 丟出 `createError({statusCode: 409})`，顯示「此 Email 已經註冊過，請直接登入」 |
| 註冊密碼不足 8 碼 | `useAuthStore().register()` 丟出 `createError({statusCode: 400})`，顯示「密碼至少需要 8 碼」 |

## 目前不做 / 未來規劃

- **真的後端**：目前是純前端模擬，商品/購物車/訂單/登入全部沒有真的後端邏輯
- 真實金流串接、多裝置同步（`ma_accounts` 只存在單一瀏覽器，換裝置或清 cookie 會遺失已註冊的帳號）、忘記密碼流程、促銷碼/折扣券、商品評論、願望清單——這些原本就需要真後端才有意義，目前都不在規劃內
