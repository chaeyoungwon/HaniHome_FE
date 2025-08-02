"use client";

import { useRouter } from "next/navigation";

import { ReactNode } from "react";

import BackHeader from "@/components/layout/header/BackHeader";

import FunnelStepMenu from "./FunnelStepMenu";

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
