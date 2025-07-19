import { UpdateUserPayload } from "@/types/auth";
import { Member } from "@/types/member";

import { axiosInstance } from "./axios";

// 내 정보 조회
export const getMyInfo = async () => {
  const res = await axiosInstance.get(`/api/v1/members/me`);
  return res.data.data;
};

// 멤버 정보 조회
export const getUserInfo = async (memberId: number): Promise<Member> => {
  const res = await axiosInstance.get(`/api/v1/members/${memberId}`);
  return res.data.data;
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
