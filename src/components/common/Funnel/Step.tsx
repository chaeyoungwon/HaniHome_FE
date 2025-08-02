import React, { useContext } from "react";

import { FunnelContext } from "./Funnel";

interface StepProps {
  children: React.ReactNode;
  name: string;
}

export default function Step({ children, name }: StepProps) {
  const context = useContext(FunnelContext);
  if (context?.step === name) {
    return <>{children}</>;
  }
  return null;
}
