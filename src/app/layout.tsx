import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/providers/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"], // Note: 'latin' is often sufficient for loading variable font basic metrics, but 'chinese-traditional' is ideal if available, checking next/font docs implies subsets are limited.
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "TimeCarve 刻時 | 專業家教預約平台",
  description: "TimeCarve 刻時 - 為學生與家教打造的專屬時間管理與課程預約系統",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${notoSansTC.variable} antialiased font-display`}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
