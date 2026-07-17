# 測試規範

## 1. 測試理念

務實優先：先確保 `app/stores/*`（商業邏輯核心：庫存驗證、結帳、假登入）有自動化測試覆蓋，UI 元件測試與端對端測試留待專案穩定後再補齊。目前尚未建立測試框架設定，本文件描述建立後要遵循的規範。目前是純前端 demo（見 [ARCHITECTURE.md](./ARCHITECTURE.md)），沒有 server route 需要測試。

## 2. 測試分類與位置

| 類型 | 位置 | 對象 |
|---|---|---|
| Store 測試 | `app/stores/**/*.test.ts` | Pinia store 的 actions/getters（`cart`、`auth`、`orders`） |
| Utils 測試 | `app/utils/**/*.test.ts` | `catalog.ts` 的 getter 函式、`formatPrice` |
| 手動 QA | 無自動化，見第 6 節 | 完整使用者流程 |

## 3. 命名規則

測試檔一律以 `*.test.ts` 結尾，與被測檔案同名對應（例：`app/stores/cart.ts` → `cart.test.ts`）。

## 4. 執行方式

```bash
npm run test        # 規劃中：待導入 Vitest 後補上此 script
```

## 5. 撰寫指南

- **測 Pinia store**：在測試中建立獨立的 Pinia instance，`useCookie` 需要 mock 或在 `@nuxt/test-utils` 的環境下執行；驗證 `useCartStore` 的 actions 是否正確更新 `items`/`itemCount`/`subtotal`，庫存上限是否正確擋下超量加入
- **測 catalog 工具函式**：直接呼叫 `getProducts`/`getProductBySlug`，斷言篩選/查找邏輯正確（純函式，不需要 mock）
- 優先測「錯誤路徑」而非只測快樂路徑：庫存不足時加入購物車、購物車為空時結帳、查看不存在的訂單 id 等情境都要有對應測試

## 6. 手動 QA 檢查清單

每次牽動購物流程的改動，至少手動走過一次完整路徑：

1. 瀏覽商品首頁 `/`，確認各區塊正常顯示（含手機版 390px 寬度）
2. 點入商品詳情 `/products/[slug]`，切換規格，確認價格/庫存連動
3. 加入購物車，前往 `/cart` 確認品項與小計正確
4. 未登入狀態嘗試前往 `/checkout`，確認導向 `/login`
5. 註冊新帳號（任意 Email/密碼即可，假登入不驗證），確認自動導回 `redirect` 指定頁面
6. 在 `/checkout` 填寫地址並送出，確認成功建立訂單並導向訂單詳情頁
7. 前往 `/account/orders`，確認剛才的訂單出現在列表
8. 點入該筆訂單的 `/account/orders/[id]`，確認明細正確
9. 重新整理頁面，確認購物車/登入狀態/訂單都還在（`useCookie` 持久化）
10. 把某規格加到超過庫存上限，確認「+」按鈕會被 disable

## 7. 已知落差

- 尚未導入 Vitest / `@nuxt/test-utils`，第 4 節指令待補上
- 端對端測試（瀏覽器層級）目前不在規劃範圍內，僅靠第 6 節手動 QA 涵蓋
