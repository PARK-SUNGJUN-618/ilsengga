import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ilsengga.vercel.app"),

  title: {
    default: "일생가 - 일본 생활 가능하세요?",
    template: "%s | 일생가",
  },

  description:
    "일본 생활에 필요한 생활 도구와 정보를 한곳에서 쉽게 이용해보세요.",

  keywords: [
    "일생가",
    "일본 생활",
    "일본 생활 계산기",
    "일본 월급 계산기",
    "일본 연봉 계산기",
    "일본 이직",
    "일본 생활비",
    "일본 생활 한국인",
    "일본 거주 한국인",
    "일본 생활 도구",
  ],

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: "ooUq3pvp035NuyiOwzCh0PPo6ww7rn6is_D5UczFbrM",
  },

  openGraph: {
    title: "일생가 - 일본 생활 가능하세요?",
    description:
      "일본에 사는 한국인을 위한 생활 도구와 정보를 한곳에서 제공합니다.",
    url: "https://ilsengga.vercel.app",
    siteName: "일생가",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
