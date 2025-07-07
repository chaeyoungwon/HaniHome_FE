"use client";

import { useEffect } from "react";

import { useAuth } from "@/hooks/auth/useAuth";

import LoadingLottie from "@/components/common/LoadingLottie";

const GoogleCallbackPage = () => {
  const { login } = useAuth();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return;

    login({ code });
  }, [login]);

  return (
    <div className="flex h-screen items-center justify-center">
      <LoadingLottie />
    </div>
  );
};

export default GoogleCallbackPage;
