"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import LogoSymbol from "@/public/svgs/login/white-logo.svg";

const RootRedirectPage = () => {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 200);
    const redirectTimer = setTimeout(() => router.replace("/auth/login"), 800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="bg-mint-brand flex min-h-screen w-full flex-col items-center pt-52">
      <div className="flex min-h-[155px] w-[225px] flex-col items-center">
        <div
          className={`transition-opacity duration-600 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <LogoSymbol width={147} height={104} />
        </div>
      </div>
    </div>
  );
};

export default RootRedirectPage;
