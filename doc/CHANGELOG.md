# 更新日誌

格式參考 [Keep a Changelog](https://keepachangelog.com/)，依日期分段，每段標註對應的計畫檔。

## [Unreleased]

尚無項目。

## 2026-07-17（正常的登入登出 UI ＋ 讓假登入驗證帳密）

對應計畫：[plans/archive/2026-07-17-auth-account-validation.md](./plans/archive/2026-07-17-auth-account-validation.md)

背景：原本的假登入只要 Email／密碼欄位有填就直接成功，跟有沒有先「註冊」過無關；NavBar 也沒有登出 UI，使用者圖示固定導向「我的訂單」。使用者要求即使沒有真後端，也要有「先註冊才能登入、密碼要對得起來」的邏輯與正常的登入/登出入口。

### Added

- `app/utils/hash.ts`：`hashPassword()`，用瀏覽器原生 `crypto.subtle.digest('SHA-256', ...)` 雜湊密碼
- `app/utils/errorMessage.ts`：`getErrorMessage(err, fallback)`，從 `createError` 丟出的物件取出 `statusMessage`
- NavBar 帳號下拉選單：已登入時顯示姓名／「我的訂單」／「登出」，取代原本固定連到「我的訂單」的圖示

### Changed

- `app/stores/auth.ts`：新增 `ma_accounts` cookie 當假帳號資料庫（存 `{email, fullName, passwordHash}[]`）。`register()` 檢查密碼至少 8 碼、Email 是否重複註冊；`login()` 改成真的比對帳號是否存在與密碼雜湊是否相符（不存在回 404「帳號不存在」、密碼錯回 401「密碼錯誤」），不再是隨便輸入就能登入
- `app/pages/login.vue`、`register.vue`：`onSubmit` 改成 `await` 呼叫 store，catch 區塊改用 `getErrorMessage()` 顯示 store 丟出的具體錯誤訊息，而非原本寫死的固定字串
