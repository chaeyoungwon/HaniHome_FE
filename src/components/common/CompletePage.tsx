"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { useState } from "react";

import BottomActionBar from "@/components/common/BottomActionBar";

import homeLottie from "@/public/lotties/home-lottie.json";
import LottieFallback from "@/public/svgs/signup/home-lottie-default.svg";

const Lottie = dynamic(
  () => import("react-lottie-player").then(mod => mod.default),
  { ssr: false },
);

interface CompletePageProps {
  message: string;
  description?: string[];
  buttonLabel: string;
  redirectUrl: string;
  showDivider?: boolean;
}

const CompletePage = ({
  message,
  description,
  buttonLabel,
  showDivider = true,
  redirectUrl,
}: CompletePageProps) => {
  const [isLottieReady, setIsLottieReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  const router = useRouter();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center gap-5 pb-16">
      {/* 애니메이션 영역 */}
      <div className="relative h-[276px] w-[223px]">
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            !isLottieReady || hasError ? "opacity-100" : "opacity-0"
          }`}
        >
          <LottieFallback className="h-[121px] w-[223px]" />
        </div>

        <Lottie
          animationData={homeLottie}
          play
          loop={false}
          onLoad={() => setIsLottieReady(true)}
          onError={() => setHasError(true)}
          className={`absolute inset-0 h-[276px] w-[223px] transition-opacity duration-300 ${
            isLottieReady && !hasError ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-heading1 text-mint-contrast">{message}</span>

        {description && (
          <span className="text-body2-med text-center leading-[150%] whitespace-pre-line text-gray-700">
            {description.join("\n")}
          </span>
        )}
      </div>

      <BottomActionBar
        label={buttonLabel}
        onClick={() => router.push(redirectUrl)}
        showDivider={showDivider}
      />
    </div>
  );
};

export default CompletePage;
