"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import homeLottie from "@/public/lotties/home-lottie.json";
import LottieFallback from "@/public/svgs/signup/home-lottie-default.svg";

const Lottie = dynamic(
  () => import("react-lottie-player").then(mod => mod.default),
  { ssr: false },
);

const CreateSuccess = () => {
  const router = useRouter();
  const [isLottieReady, setIsLottieReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  // 애니메이션 끝나면 홈으로 이동
  useEffect(() => {
    const duration = (homeLottie.op / 60) * 1000; // 총 프레임 기준 시간 계산
    const timer = setTimeout(() => {
      router.push("/home");
    }, duration);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center gap-5 bg-white">
      <div className="relative h-[276px] w-[160px]">
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            !isLottieReady || hasError ? "opacity-100" : "opacity-0"
          }`}
        >
          <LottieFallback className="h-[160px] w-[160px]" />
        </div>

        <Lottie
          animationData={homeLottie}
          play
          loop={false}
          onLoad={() => setIsLottieReady(true)}
          onError={() => setHasError(true)}
          className={`absolute inset-0 h-[276px] w-[160px] transition-opacity duration-300${
            isLottieReady && !hasError ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-heading1 text-mint-contrast">
          등록 완료되었어요!
        </span>
      </div>
    </div>
  );
};

export default CreateSuccess;
