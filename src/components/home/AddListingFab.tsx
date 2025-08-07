"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import PlusIcon from "@/public/svgs/common/plus-icon.svg";

const AddListingFab = () => {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [translateX, setTranslateX] = useState<string>("");

  useEffect(() => {
    const updateTransform = () => {
      const screenW = window.innerWidth;
      const maxWidth = Math.min(screenW, 430);
      const half = maxWidth / 2;

      // 최소 180px 기준 ~ 최대 215px 기준 사이에서 대응
      const clampedHalf = Math.max(180, Math.min(half, 215));
      const offset = clampedHalf - 20;

      setTranslateX(`calc(${offset}px - 100%)`);
    };

    updateTransform(); // 초기 실행
    window.addEventListener("resize", updateTransform);
    return () => window.removeEventListener("resize", updateTransform);
  }, []);

  return (
    <button
      type="button"
      onClick={() => router.push("/listings/create/redirect")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bg-mint shadow-fab active:bg-mint-contrast fixed bottom-23.5 left-1/2 z-50 flex h-13.5 cursor-pointer items-center rounded-full text-white transition-all duration-500 ${
        hovered ? "px-4" : "px-[15px]"
      }`}
      style={{
        transform: `translateX(${translateX})`,
      }}
    >
      <PlusIcon className="h-6 w-6 text-white" />
      <span
        className={`text-body1-sb overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out ${
          hovered
            ? "ml-2 max-w-[67px] translate-x-0 opacity-100"
            : "max-w-0 -translate-x-2 opacity-0"
        }`}
      >
        매물 등록
      </span>
    </button>
  );
};

export default AddListingFab;
