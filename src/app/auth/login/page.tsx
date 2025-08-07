"use client";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

import GoogleLoginButton from "@/components/login/GoogleLoginButton";

import LogoSymbol from "@/public/svgs/common/logo-symbol.svg";
import LogoWordmark from "@/public/svgs/common/logo-wordmark.svg";
import GuestIcon from "@/public/svgs/login/guest-icon.svg";

const LoginPage = () => {
  const router = useRouter();
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/home");
    }
  }, [isLoggedIn, router]);

  const handleGuestClick = () => {
    router.push("/home");
  };

  if (isLoggedIn === null) return null;

  return (
    <div className="flex min-h-screen w-full flex-col items-center pt-52">
      <div className="flex min-h-[155px] w-[225px] flex-col items-center gap-5 pb-27">
        <LogoSymbol width={147} height={104} />
        <LogoWordmark width={225} height={31} />
      </div>

      {!isLoggedIn && (
        <div className="flex flex-col gap-4 px-4 py-3">
          <GoogleLoginButton />
          <button
            onClick={handleGuestClick}
            className="flex h-6 w-full max-w-[398px] cursor-pointer items-center justify-center gap-2 bg-white py-[10px]"
          >
            <GuestIcon />
            <span className="text-lab1-b text-mint underline">
              게스트 모드로 시작하기
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
