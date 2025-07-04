"use client";

import dynamic from "next/dynamic";

import loadingLottie from "@/public/lotties/loading-lottie.json";

const Lottie = dynamic(
  () => import("react-lottie-player").then(mod => mod.default),
  { ssr: false },
);

const LoadingLottie = () => (
  <div className="flex h-full w-full items-center justify-center">
    <Lottie
      loop
      play
      animationData={loadingLottie}
      style={{ width: 66, height: 66 }}
    />
  </div>
);

export default LoadingLottie;
