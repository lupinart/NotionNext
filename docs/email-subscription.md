# 啟用 EmailOctopus 電子報訂閱

NotionNext 內建的訂閱 API 已支援將訪客資訊送往 EmailOctopus。依照下列步驟即可在站點上開啟電子報表單並串接 EmailOctopus。

## 1. 準備 EmailOctopus 資訊
1. 前往 EmailOctopus 後台建立（或選擇）一個 `List`，記下其 **List ID**（`Audience` → `All lists` → 選擇列表後在網址列可看到 `lists/<LIST_ID>`）。
2. 於 `Developer` → `API keys` 建立一組 **API Key**，稍後會用來驗證呼叫。
3. 若想同步訪客的名字，請在該 List 的 `Fields` 中確認 `First name`、`Last name` 欄位已啟用，或依需求建立對應的自訂欄位。

## 2. 設定環境變數
在部署平台（如 Vercel）或本機 `.env.local` 檔案中新增下列環境變數，提供後端 API 連線至 EmailOctopus 使用：

```
EMAIL_OCTOPUS_API_KEY=<你的 EmailOctopus API Key>
EMAIL_OCTOPUS_LIST_ID=<你的 EmailOctopus List ID>
```

系統會將這兩個變數載入 `BLOG.EMAIL_OCTOPUS_API_KEY` 與 `BLOG.EMAIL_OCTOPUS_LIST_ID`，並由 [`lib/plugins/newsletter.js`](../lib/plugins/newsletter.js) 在呼叫 `/api/subscribe` 時組成 EmailOctopus 所需的請求內容。

> 保留既有的 Mailchimp 變數也沒問題；當 EmailOctopus 相關變數不存在時，API 仍會回退使用 Mailchimp 的設定。

## 3. 啟用主題內的訂閱表單
每個主題都有自己的開關。以 `starter` 主題為例，需要設定環境變數 `NEXT_PUBLIC_THEME_STARTER_NEWSLETTER=true` 才會顯示頁腳的訂閱表單：

```
NEXT_PUBLIC_THEME_STARTER_NEWSLETTER=true
```

`landing` 主題則是 `NEXT_PUBLIC_THEME_LANDING_NEWSLETTER`，其它主題請參考各自的 `themes/<theme>/config.js` 設定。

## 4. 驗證 API 是否生效
前端透過 `subscribeToNewsletter` 呼叫 `/api/subscribe` API，後端會由 `lib/plugins/newsletter.js` 判斷並發送請求至 EmailOctopus。若環境變數設定正確，API 將回傳 `Subscription successful!` 訊息。

你可以在本機啟動專案後於瀏覽器開啟啟用了訂閱表單的頁面，輸入測試 Email 來驗證。伺服器端會在終端機輸出 EmailOctopus 的回應內容，方便除錯。

## 5. 常見問題
- **沒有看到訂閱表單**：請確認主題的 `NEWSLETTER` 環境變數已啟用並重新部署。
- **API 回傳錯誤**：請檢查 API Key 是否仍有效、List ID 是否正確，以及 EmailOctopus 帳號是否允許新增重複 Email。錯誤訊息會在終端機輸出並同步於 API 回應中。
- **需要同步更多欄位**：可直接修改 `lib/plugins/newsletter.js` 中 `buildEmailOctopusPayload` 的欄位對應，或在 EmailOctopus 中建立新的自訂欄位後調整程式碼。

完成上述設定後，即可透過 EmailOctopus 收集網站訪客的電子報訂閱。
