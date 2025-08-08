"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { ReactNode } from "react";

import FunnelStepMenu from "./FunnelStepMenu";

const BackHeader = dynamic(
  () => import("@/components/layout/header/BackHeader"),
  { ssr: false },
);

interface FunnelLayoutProps {
  children: ReactNode;
}

const FunnelLayout = ({ children }: FunnelLayoutProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col pb-[125px]">
      <BackHeader rightIcon="close" onRightClick={() => router.push("/home")} />
      <FunnelStepMenu />
      {children}
    </div>
  );
};

export default FunnelLayout;
