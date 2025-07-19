import { LoginPayload, LoginResponse, SignupPayload } from "@/types/auth";

import { axiosInstance } from "./axios";

// 회원가입
export const signup = async (payload: SignupPayload) => {
  const res = await axiosInstance.post<void>(
    "/api/v1/members/complete-profile",
    payload,
  );
  return res.data;
};

// 로그인 (인증코드 콜백)
export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await axiosInstance.post("/api/v1/auth/social/login", payload);
  return res.data.data;
};

// 닉네임 중복 확인
export const checkNicknameDuplicate = async (nickname: string) => {
  const res = await axiosInstance.get("/api/v1/members/check-nickname", {
    params: { nickname },
  });
  return res.data.data;
};

// 토큰 재발급
export const refreshToken = async () => {
  const res = await axiosInstance.post<{ accessToken: string }>(
    "/api/v1/auth/token/refresh",
  );
  return res.data;
};

// 로그아웃
export const logout = async () => {
  await axiosInstance.post("/api/v1/auth/logout");
};
