import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'CXR Lab｜胸片判讀練習室',
  description:
    '從正常解剖到常見異常，透過真實胸片、系統判讀與即時測驗建立胸部 X 光判讀基礎。',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
