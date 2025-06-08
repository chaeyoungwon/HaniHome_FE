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
  robots: "index, follow",
  authors: [{ name: "하니홈" }],
  icons: {
    icon: "/icons/favicon.svg",
  },
  openGraph: {
    title: "하니홈",
    description: "해외 거주 한인을 위한 숙소 매칭 플랫폼",
    siteName: "하니홈",
    type: "website",
  },
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
