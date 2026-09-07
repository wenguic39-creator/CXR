# CXR Reading Lab

互動式胸部 X 光判讀學習網站，透過系統化判讀流程、疾病圖庫與揭曉提示，協助快速建立 CXR reading 的基本框架。

## 功能

- ABCDEF 系統化判讀 checklist
- 8 個常見疾病主題
- 每個主題至少 5 張胸部 X 光影像（共 40 張）
- 縮放、對比度調整與重點提示
- 小測驗與學習進度追蹤
- 影像來源與授權資訊列於圖庫資料中

## 本機啟動

```bash
npm install
npm run dev
```

開啟終端機顯示的本機網址即可使用。

## 建置檢查

```bash
npm run build
npx oxlint app
```

本專案使用 Next.js 相容的 Vinext 建置流程，影像資產位於 `public/images`，疾病圖庫索引位於 `app/cxr-library.json`。

## 教學用途

本網站是學習輔助工具，不能取代正式影像科訓練、臨床判讀或醫療專業意見。
