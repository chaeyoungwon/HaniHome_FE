"use client";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  deleteUser,
  getUser,
  login,
  logout,
  refreshToken,
  signup,
  updateUser,
} from "@/apis/auth";

import { LoginResponse, SignupPayload } from "@/types/auth";
import { UserUpdateData } from "@/types/user";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { accessToken, setAccessToken, clearAuth } = useAuthStore();

  // 1. 회원가입
  const signupMutation = useMutation({
    mutationFn: (payload: SignupPayload) => signup(payload),
    onSuccess: () => router.push("/signup/complete"),
    onError: () => console.error("회원가입 실패"),
  });

  // 2. 로그인
  const loginMutation = useMutation({
    mutationFn: (payload: { code: string }) => login(payload),
    onSuccess: (data: LoginResponse) => {
      setAccessToken(data.accessToken);
      router.push("/home");
    },
    onError: () => console.error("로그인 실패"),
  });

  // 3. 로그아웃
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      router.push("/");
    },
    onError: () => console.error("로그아웃 실패"),
  });

  // 4. 토큰 재발급
  const refreshMutation = useMutation({
    mutationFn: refreshToken,
    onSuccess: ({ accessToken }) => setAccessToken(accessToken),
    onError: () => {
      clearAuth();
      router.push("/");
    },
  });

  // 5. 유저 정보 조회
  const useUser = (memberId: string) => {
    return useQuery({
      queryKey: ["user", memberId],
      queryFn: () => getUser(memberId),
      enabled: !!accessToken && !!memberId,
    });
  };

  // 6. 유저 정보 수정 (memberId 필요)
  const updateUserMutation = useMutation({
    mutationFn: ({
      memberId,
      payload,
    }: {
      memberId: string;
      payload: UserUpdateData;
    }) => updateUser(memberId, payload),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["user", data.id] });
    },
  });

  // 7. 회원 탈퇴
  const deleteUserMutation = useMutation({
    mutationFn: (memberId: string) => deleteUser(memberId),
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      router.push("/");
    },
  });

  return {
    accessToken,

    // 유저 쿼리
    useUser,

    // 인증
    signup: signupMutation.mutate,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    refresh: refreshMutation.mutate,

    // 유저 관련
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,

    // 상태
    isLoginLoading: loginMutation.isPending,
    isSignupLoading: signupMutation.isPending,
    loginError: loginMutation.error,
    signupError: signupMutation.error,
  };
};
