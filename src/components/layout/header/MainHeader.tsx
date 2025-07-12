"use client";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/useAuthStore";
import { useLoginModalStore } from "@/stores/useLoginModalStore";

import MainLogo from "@/public/svgs/common/logo-wordmark.svg";
import AlarmIcon from "@/public/svgs/header/alarm-icon.svg";

const MainHeader = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const { openModal } = useLoginModalStore();

  const handleAlarmClick = () => {
    if (!isLoggedIn) {
      openModal();
      return;
    }
    router.push("/notifications");
  };

  return (
    <header className="bg-gray-0 sticky top-0 left-1/2 z-50 flex h-12 max-w-[480px] min-w-[375px] items-center justify-between px-4 py-3">
      <button onClick={() => router.push("/home")} className="cursor-pointer">
        <MainLogo className="h-[18px] w-[126px]" />
      </button>

      <button onClick={handleAlarmClick} className="cursor-pointer">
        <AlarmIcon />
      </button>
    </header>
  );
};

export default MainHeader;
