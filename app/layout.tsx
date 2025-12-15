import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"], // Note: 'latin' is often sufficient for loading variable font basic metrics, but 'chinese-traditional' is ideal if available, checking next/font docs implies subsets are limited.
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "雕刻時光 Denture Art - 首頁",
  description: "結合美學與精準的牙體形態雕刻教學",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="light">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lexend.variable} ${notoSansTC.variable} antialiased font-display`}
      >
        {children}
      </body>
    </html>
  );
}
