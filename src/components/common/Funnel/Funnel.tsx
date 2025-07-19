"use client";

import { createContext } from "react";

import Step from "./Step";

export const FunnelContext = createContext<{ step?: string }>({});

interface FunnelProps {
  children: React.ReactNode;
  step: string;
}

function Funnel({ children, step }: FunnelProps) {
  return (
    <FunnelContext.Provider value={{ step }}>{children}</FunnelContext.Provider>
  );
}

export default Object.assign(Funnel, { Step });
