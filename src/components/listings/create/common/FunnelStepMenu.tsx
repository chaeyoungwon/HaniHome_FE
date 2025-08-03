"use client";

import { useSearchParams } from "next/navigation";

import { FUNNEL_STEPS_LABEL } from "@/constants/funnel-steps";

interface FunnelStepMenuProps {
  fixedKey?: string;
}
const FunnelStepMenu = ({ fixedKey }: FunnelStepMenuProps) => {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step");

  return (
    <div className="flex items-center justify-center gap-6 border-b border-gray-200 px-4 py-2">

      {FUNNEL_STEPS_LABEL.map(({ key, label }) => {
        const isActive = currentStep === key || fixedKey === key;
        return (
          <div
            key={key}
            className={`flex flex-col items-center gap-1 ${
              isActive ? "text-mint" : "text-gray-400"
            }`}
          >
            <div
              className={`h-2 w-2 rounded-full ${
                isActive ? "bg-mint" : "bg-gray-400"
              }`}
            />
            <div className="text-cap1-b">{label}</div>
          </div>
        );
      })}
    </div>
  );
};
export default FunnelStepMenu;
