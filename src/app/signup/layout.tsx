"use client";

import { usePathname } from "next/navigation";

import ContentWrapper from "@/components/layout/ContentWrapper";
import BackHeader from "@/components/layout/header/BackHeader";

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
