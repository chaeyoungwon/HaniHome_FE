"use client";

import { useRouter } from "next/navigation";

import MainLogo from "@/public/svgs/common/logo-wordmark.svg";
import AlarmIcon from "@/public/svgs/header/alarm-icon.svg";

const MainHeader = () => {
  const router = useRouter();

  return (
    <header className="sticky top-0 left-1/2 z-50 flex h-12 max-w-[480px] min-w-[375px] items-center justify-between bg-white px-4 py-3">
      <button onClick={() => router.push("/home")} className="cursor-pointer">
        <MainLogo className="h-[18px] w-[126px]" />
      </button>

      <button
        onClick={() => router.push("/notifications")}
        className="cursor-pointer"
      >
        <AlarmIcon />
      </button>
    </header>
  );
};

export default MainHeader;
