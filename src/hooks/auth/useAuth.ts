"use client";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/useAuthStore";
import { useSignupStore } from "@/stores/useSignupStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login, logout, refreshToken, signup } from "@/apis/auth";

import { LoginResponse, SignupPayload } from "@/types/auth";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { accessToken, setAccessToken, clearAuth } = useAuthStore();

  // 온보딩 회원정보 등록
  const signupMutation = useMutation({
    mutationFn: (payload: SignupPayload) => signup(payload),
    onSuccess: () => {
      useSignupStore.getState().reset();
      router.push("/signup/complete");
    },
    onError: () => {
      console.error("회원가입 실패");
    },
  });

  // 로그인
  const loginMutation = useMutation({
    mutationFn: (payload: { code: string }) => login(payload),
    onSuccess: (data: LoginResponse) => {
      if (data.newUser) {
        router.push("/signup/info");
      } else {
        router.push("/home");
      }
    },
    onError: () => console.error("로그인 실패"),
  });

  // 로그아웃
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      router.push("/");
    },
    onError: () => console.error("로그아웃 실패"),
  });

  // 토큰 재발급
  const refreshMutation = useMutation({
    mutationFn: refreshToken,
    onSuccess: ({ accessToken }) => setAccessToken(accessToken),
    onError: () => {
      clearAuth();
      router.push("/");
    },
  });

  return {
    /* 상태 */
    accessToken,

    /* 인증 액션 */
    signup: signupMutation.mutate,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    refresh: refreshMutation.mutate,

    /* 로딩·에러 */
    isLoginLoading: loginMutation.isPending,
    isSignupLoading: signupMutation.isPending,
    loginError: loginMutation.error,
    signupError: signupMutation.error,
  };
};
