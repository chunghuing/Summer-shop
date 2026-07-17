# 正常的登入登出 UI ＋ 讓假登入驗證帳密

- 狀態：已歸檔：2026-07-17
- 建立日期：2026-07-17
- 相關文件：[ARCHITECTURE.md](../ARCHITECTURE.md)、[FEATURES.md](../FEATURES.md)、[CHANGELOG.md](../CHANGELOG.md)

## Context

`useAuthStore()` 原本的假登入完全不驗證：`login(email, password)` 只要兩個欄位有填就直接成功，跟有沒有先「註冊」過完全無關，任何人在 `/login` 隨便打一組不存在的帳密都能登入。NavBar 也沒有登出 UI（`logout()` 已實作但沒有按鈕可以觸發），登入後的使用者圖示點下去固定導向「我的訂單」，看起來像是永遠已登入。使用者認為即使是純前端 demo，也應該要有「先註冊才能登入、密碼要對得起來」的基本邏輯與正常的登入/登出入口。

## 做了什麼

- **NavBar 帳號選單**（`app/components/layout/NavBar.vue`）：使用者圖示改成下拉選單——已登入時顯示姓名、「我的訂單」連結、「登出」按鈕（點擊外部或登出後自動收合）；未登入時維持原本連到 `/login` 的圖示
- **`app/stores/auth.ts` 改用假帳號資料庫**：新增獨立的 `ma_accounts` cookie 存 `{email, fullName, passwordHash}[]`，密碼經 `app/utils/hash.ts`（`crypto.subtle.digest('SHA-256', ...)`）雜湊後才存入，不存明文
  - `register()`：Email／密碼為空 → 400；密碼 <8 碼 → 400；Email 已存在 → 409「此 Email 已經註冊過，請直接登入」；通過後把帳號存進 `ma_accounts` 並自動登入
  - `login()`：找不到對應 Email 的帳號 → 404「帳號不存在」；密碼雜湊不符 → 401「密碼錯誤」
  - `logout()` 不變，只清 session（`ma_user`），不動 `ma_accounts`
- **`app/utils/errorMessage.ts`**：`getErrorMessage(err, fallback)` 從 `createError` 丟出的物件取出 `statusMessage`，讓 `login.vue`/`register.vue` 的 catch 區塊能顯示 store 丟出的具體錯誤（先前 catch 完全沒讀 `err`，一律顯示寫死字串，是全專案既有的通病，這次一併修正這兩個頁面）

## 驗證

`npm run lint` 全過。瀏覽器手動測試：未註冊帳密登入 → 顯示「帳號不存在」；註冊密碼 <8 碼 → 顯示「密碼至少需要 8 碼」；正常註冊 → 自動登入且 NavBar 顯示對應姓名；登出後用錯密碼登入 → 顯示「密碼錯誤」；用正確密碼登入 → 成功；同一 Email 再註冊一次 → 顯示「此 Email 已經註冊過，請直接登入」。
