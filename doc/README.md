# Summer 電商網站文件

本專案是 Summer 電商網站，採用 Nuxt 4 建置，視覺設計為編輯感拼貼風格（詳見 [ARCHITECTURE.md](./ARCHITECTURE.md) 的設計系統章節）。目前是純前端 demo，沒有後端、沒有資料庫，見 [ARCHITECTURE.md](./ARCHITECTURE.md) 開頭說明。

正在進行的開發工作請見 [plans/](./plans/)。

## 文件索引

| 文件 | 說明 |
|------|------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | 架構、目錄結構、API 路由總覽、資料庫 schema |
| [DEVELOPMENT.md](./DEVELOPMENT.md) | 開發規範、命名規則、環境變數、計畫歸檔流程 |
| [FEATURES.md](./FEATURES.md) | 功能清單、行為描述、錯誤碼 |
| [TESTING.md](./TESTING.md) | 測試規範、執行順序、撰寫指南 |
| [CHANGELOG.md](./CHANGELOG.md) | 更新日誌 |
| [plans/](./plans/) | 進行中的開發計畫 |
| [plans/archive/](./plans/archive/) | 已完成計畫歸檔 |

## 如何使用這些文件

1. **第一次接觸這個專案** → 先讀 [ARCHITECTURE.md](./ARCHITECTURE.md) 建立整體概念（技術棧、目錄結構、資料庫 schema）
2. **要開始寫程式前** → 讀 [DEVELOPMENT.md](./DEVELOPMENT.md) 了解命名規則、環境變數與開發流程
3. **要實作或確認某個功能的行為** → 查 [FEATURES.md](./FEATURES.md)
4. **要驗證改動是否正確** → 查 [TESTING.md](./TESTING.md)
5. **想知道某個時間點做了什麼改動** → 查 [CHANGELOG.md](./CHANGELOG.md)
6. **要開始新的開發工作** → 在 [plans/](./plans/) 建立新的計畫文件，完成後依 [DEVELOPMENT.md](./DEVELOPMENT.md) 的歸檔流程搬到 [plans/archive/](./plans/archive/)
