"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { getFabInitialTranslateX } from "@/utils/layout/getFabInitialTranslateX";

import PlusIcon from "@/public/svgs/common/plus-icon.svg";

const AddListingFab = () => {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [translateX, setTranslateX] = useState<string>(() =>
    getFabInitialTranslateX(),
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateTransform = () => {
      setTranslateX(getFabInitialTranslateX());
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
      className={`bg-mint shadow-fab active:bg-mint-contrast fixed bottom-23.5 left-1/2 z-50 flex h-13.5 cursor-pointer items-center rounded-full text-white ${
        mounted ? "transition-all duration-500" : "transition-none"
      } ${hovered ? "px-4" : "px-[15px]"}`}
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
