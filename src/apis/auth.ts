import {
  LoginPayload,
  LoginResponse,
  SignupPayload,
  UpdateUserPayload,
} from "@/types/auth";

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
  const res = await axiosInstance.post<void>("/api/v1/auth/logout");
  return res.data;
};

// 내 정보 조회
export const getMyInfo = async () => {
  const res = await axiosInstance.get(`/api/v1/members/me`);
  return res.data.data;
};

// 사용자 상세 조회
export const getUser = async (memberId: string) => {
  const res = await axiosInstance.get(`/api/v1/members/${memberId}`);
  return res.data;
};

// 사용자 정보 수정
export const updateUser = async (
  memberId: string,
  payload: UpdateUserPayload,
) => {
  const res = await axiosInstance.patch(`/api/v1/members/${memberId}`, payload);
  return res.data;
};

// 회원 탈퇴
export const deleteUser = async (memberId: string) => {
  const res = await axiosInstance.delete(`/api/v1/members/${memberId}`);
  return res.data;
};
