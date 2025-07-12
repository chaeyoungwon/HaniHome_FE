import type { Metadata } from "next";
import localFont from "next/font/local";

import "@/styles/globals.css";

import ReactQueryProvider from "@/utils/reactQueryProvider";

import LayoutWrapper from "@/components/layout/LayoutWrapper";

const suit = localFont({
  src: "../../public/fonts/SUIT-Variable.woff2",
  display: "swap",
  style: "normal",
  weight: "45 920",
});

export const metadata: Metadata = {
  title: "하니홈",
  description: "해외 거주 한인을 위한 숙소 매칭 플랫폼",
  keywords: [
    "호주",
    "한인",
    "신뢰 기반 거래",
    "숙소 직거래",
    "검증된 매물",
    "스마트 숙소 검색",
    "간편 매물 등록",
    "효율적 뷰잉 예약",
    "조건별 게스트 매칭",
    "한인 숙소 플랫폼",
    "시간 절약",
    "안심 렌트",
  ],
  robots: "index, follow",
  authors: [{ name: "하니홈", url: "https://www.hanihome.app" }],
  icons: {
    icon: "/svgs/common/favicon.svg",
  },
  openGraph: {
    title: "하니홈",
    description: "해외 거주 한인을 위한 숙소 매칭 플랫폼",
    siteName: "하니홈",
    type: "website",
    url: "https://www.hanihome.app",
  },
  creator: "HaniHome",
  publisher: "HaniHome",
  category: "real estate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={suit.className}>
      <body>
        <ReactQueryProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
