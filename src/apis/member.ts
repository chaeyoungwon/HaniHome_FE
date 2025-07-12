import { Member } from "@/types/member";

import { axiosInstance } from "./axios";

export const fetchMemberById = async (memberId: number): Promise<Member> => {
  const res = await axiosInstance.get(`/api/v1/members/${memberId}`);
  return res.data;
};
