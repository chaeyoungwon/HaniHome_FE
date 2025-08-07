"use client";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

import CompletePage from "@/components/common/CompletePage";

const SignupCompletePage = () => {
  const router = useRouter();
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/home");
    }
  }, [isLoggedIn, router]);

  return (
    <CompletePage
      message="가입이 완료되었어요!"
      buttonLabel="시작하기"
      redirectUrl="/home"
      showDivider={false}
    />
  );
};

export default SignupCompletePage;
