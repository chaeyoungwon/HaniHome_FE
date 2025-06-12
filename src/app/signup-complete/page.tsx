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

const CompletePage = () => {
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

        {/* Lottie (전체 높이 고정) */}
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

      <span className="text-heading1 text-mint-contrast">
        가입이 완료되었어요!
      </span>

      <BottomActionBar
        label="시작하기"
        onClick={() => router.push("/home")}
        showDivider={false}
      />
    </div>
  );
};

export default CompletePage;
