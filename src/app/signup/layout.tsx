"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import ContentWrapper from "@/components/layout/ContentWrapper";

const BackHeader = dynamic(
  () => import("@/components/layout/header/BackHeader"),
  { ssr: false },
);

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isCompletePage = pathname === "/signup/complete";

  if (isCompletePage) {
    return <>{children}</>;
  }

  return (
    <ContentWrapper>
      <BackHeader />
      <div className="px-4 pb-16">{children}</div>
    </ContentWrapper>
  );
}
