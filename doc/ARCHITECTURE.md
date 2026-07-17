# 架構

> 本專案是**純前端 demo**：商品目錄寫死在前端、購物車/登入/訂單全部靠瀏覽器 cookie 模擬，沒有後端、沒有資料庫。

## 1. 專案概覽

Summer 是一個編輯感拼貼風格的電商網站。技術棧：

| 分類 | 選用 |
|---|---|
| 前端框架 | Nuxt 4（`app/` 為 source root）、Vue 3 |
| CSS | Tailwind CSS v3（透過 `@nuxtjs/tailwindcss`） |
| 資料層 | 靜態資料（`app/data/catalog.ts`）+ `useCookie`（無後端、無資料庫） |
| 狀態管理 | Pinia（`cart`、`auth`、`orders` 三個 store，見第 6 節） |
| Lint / Format | ESLint（`@nuxt/eslint`）＋ Prettier，透過 `eslint-plugin-prettier` 統一 |

## 2. 目錄結構

```
app/
  app.vue                 # 根元件，包住 <NuxtLayout><NuxtPage/></NuxtLayout>
  assets/css/main.css     # Tailwind 指令 + 全域基礎樣式
  data/
    catalog.ts               # 靜態商品目錄：categories[]、products[]（含 images/variants）
  pages/
    index.vue               # 商品首頁
    products/index.vue      # 商品列表
    products/[slug].vue     # 商品詳情
    cart.vue                 # 購物車
    checkout.vue              # 結帳
    login.vue                # 登入
    register.vue             # 註冊
    account/orders/index.vue    # 我的訂單
    account/orders/[id].vue     # 訂單詳情
  utils/
    formatPrice.ts            # NT.xxx 價格格式化
    catalog.ts                # getCategories / getProducts / getProductBySlug / getVariantById
    hash.ts                   # hashPassword：SHA-256 雜湊密碼，供 auth store 使用
    errorMessage.ts            # getErrorMessage：從 createError 物件取出 statusMessage
  layouts/
    default.vue              # 公告列 + Nav + Footer
    checkout.vue              # 精簡版頁首（logo + 步驟指示，無 Nav/Footer），結帳頁專用
  middleware/
    guest.ts                 # 已登入者造訪 /login、/register 時導向首頁
    auth.ts                  # 未登入時導向 /login?redirect=<path>，套用在 /checkout、/account/orders*
    cart-not-empty.ts         # 購物車為空時導回 /cart，套用在 /checkout
  components/
    layout/                 # AnnouncementBar / NavBar（含購物車數量徽章、登入後的帳號下拉選單） / AppFooter
    home/                   # HeroCollage / PromoBanner / BrandStory / CategorySection
    product/                # ProductCard（全域註冊名稱是 ProductCard，不是 ProductProductCard，見 CLAUDE.md）
    ui/                     # FormField（表單 label + input）、StatusBadge（訂單狀態徽章）
    checkout/                # OrderSummary（結帳頁訂單摘要，桌面/手機共用同一元件依斷點切換位置）
  stores/
    cart.ts                 # useCartStore：cookie-backed 購物車（見第 6 節）
    auth.ts                 # useAuthStore：cookie-backed 假登入
    orders.ts               # useOrdersStore：cookie-backed 假訂單
doc/                      # 本文件系統
tailwind.config.ts        # design tokens
```

## 3. 請求與資料流

```
瀏覽器
  │  SSR 首次渲染 / 之後的 client 導覽
  ▼
Nuxt 頁面（app/pages/*.vue）
  │  同步呼叫 app/utils/catalog.ts 的 getter，或讀寫 Pinia store
  ▼
app/data/catalog.ts（靜態資料）／useCookie（購物車、登入、訂單狀態）
```

沒有網路請求、沒有 loading 狀態要處理——所有資料在記憶體裡或已經隨 cookie 一起送達，SSR 渲染當下就是最終結果。`useCookie` 是 Nuxt 內建的 universal composable，SSR 與 client 共用同一份值，不會有 hydration 後閃爍或不一致的問題。

## 4. 商品目錄（`app/data/catalog.ts`）

沒有資料庫，商品/分類都是寫死的 TypeScript 物件：

| 型別 | 說明 |
|---|---|
| `Category` | `id`、`slug`、`name`、`description`、`cover_image_url`、`sort_order` |
| `Product` | `id`、`slug`、`category_id`、`name`、`description`、`base_price`、`currency`、`status`（`draft`/`active`/`archived`）、`cover_image_url`，內嵌 `product_images[]`、`product_variants[]` |
| `ProductVariant` | `id`、`sku`、`size`、`color`、`price_override`、`stock_quantity` |

`app/utils/catalog.ts` 提供的 getter 只回傳 `status === 'active'` 的商品，`categories` 欄位（`{slug,name}|null`）是即時從 `category_id` 反查組出來的，讓頁面 template 維持一致的資料形狀。

要新增/修改商品：直接編輯 `app/data/catalog.ts`。

## 5. 頁面路由

| 路由 | 說明 | 需登入 |
|---|---|---|
| `/` | 商品首頁 | 否 |
| `/products` | 商品列表（支援 `?category=slug` 篩選） | 否 |
| `/products/[slug]` | 商品詳情 | 否 |
| `/cart` | 購物車 | 否 |
| `/checkout` | 結帳 | 是（`auth` + `cart-not-empty` middleware） |
| `/login`、`/register` | 登入 / 註冊 | 訪客限定（`guest` middleware） |
| `/account/orders` | 我的訂單 | 是（`auth` middleware） |
| `/account/orders/[id]` | 訂單詳情 | 是（`auth` middleware） |

## 6. 狀態管理：三個 cookie-backed Pinia store

全部用 `useCookie()` 而非 `localStorage`：cookie 在 SSR 階段就讀得到，避免「先渲染空狀態、client 再補資料」的閃爍問題。三個 store 互相獨立但 `orders.ts` 的 `placeOrder()` 內部會呼叫 `useCartStore()`、`useAuthStore()`。

- **`app/stores/cart.ts`（`useCartStore`）**：cookie `ma_cart` 存 `{variantId, quantity}[]`。`items`/`itemCount`/`subtotal` 是 computed，即時從 `catalog` join 出完整商品資訊。`addItem`/`updateItemQuantity` 會檢查不得超過 `stock_quantity`，超過時 `createError({statusCode: 409})`。`itemId` 直接等於 `variantId`。
- **`app/stores/auth.ts`（`useAuthStore`）**：cookie `ma_user` 存目前登入的 session（`{email, fullName} | null`），另一個獨立的 cookie `ma_accounts` 存假帳號資料庫（`{email, fullName, passwordHash}[]`，密碼經 `hashPassword()` 雜湊後才存入）。`register()` 檢查密碼至少 8 碼、Email 是否重複註冊；`login()` 比對帳號是否存在、密碼雜湊是否相符，不再是隨便輸入就能登入。`logout()` 只清 `ma_user`，`ma_accounts` 保留，NavBar 已有登出按鈕可以呼叫它。
- **`app/stores/orders.ts`（`useOrdersStore`）**：cookie `ma_orders` 存訂單陣列（新訂單插入陣列最前面）。`placeOrder(address)` 從目前購物車組出訂單快照（商品名稱/規格/單價都是下單當下的快照，之後改商品目錄不會影響歷史訂單顯示），清空購物車，回傳新訂單物件供頁面導頁用。

## 7. 設計系統

Design tokens 來自 Pencil 設計稿，定義在根目錄 `tailwind.config.ts`（`theme.extend`）：

Pencil 原始設計檔存放於 [`doc/design/summer.pen`](./design/summer.pen)，需使用 Pencil 開啟編輯（.pen 為 Pencil 專屬格式，無法用一般文字編輯器檢視）。

**色彩**

| Token | Hex | 用途 |
|---|---|---|
| `surface-linen` | `#DCD0B8` | Hero 拼貼區背景 |
| `surface-white` | `#FFFFFF` | 促銷區背景 |
| `surface-dark` | `#242220` | 品牌故事 / footer 背景 |
| `surface-brick` | `#B8402A` | 商品分類區背景、強調色 |
| `surface-card` | `#EFE6D3` | 卡片底色 |
| `text-primary` | `#1C1A17` | 淺色背景主要文字 |
| `text-secondary` | `#5C5548` | 淺色背景次要文字 |
| `text-inverse` | `#F7F2E9` | 深色背景主要文字 |
| `text-inverse-muted` | `#C9C2B4` | 深色背景次要文字 |
| `accent-brick` | `#B8402A` | 強調色（CTA、價格） |
| `border-subtle` | `#B8AD96` | 淺色背景分隔線 |
| `border-inverse` | `#4A4642` | 深色背景分隔線 |

**字體**

| Token | 字型 | 用途 |
|---|---|---|
| `font-heading` | Playfair Display | 標題 |
| `font-body` | Newsreader | 內文、引言 |
| `font-caption` | Inter | 標籤、導覽、小字 |

已完成的 Pencil 視覺設計涵蓋：Nav、Hero 拼貼、「2 FOR NT.598」促銷、「Made in Taiwan」品牌故事、商品分類、Footer、商品詳情、購物車、結帳、登入/註冊、我的訂單、訂單詳情，桌面版（1440px）與手機版（390px）皆已補齊。
