import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  deleteUser,
  getMyInfo,
  getUserInfo,
  updateUser,
} from "@/apis/memberApi";

import { UpdateUserPayload } from "@/types/auth.type";

// 내 정보 조회
export const useMyInfo = () => {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    staleTime: 1000 * 60 * 1,
    retry: 1,
    enabled: isLoggedIn,
  });
};

// 멤버 정보 조회
export const useMember = (memberId: number) => {
  return useQuery({
    queryKey: ["member", memberId],
    queryFn: () => getUserInfo(memberId),
    enabled: !!memberId,
  });
};

// 유저 정보 수정
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateUserPayload) => updateUser(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
      queryClient.invalidateQueries({
        queryKey: ["member", variables.nickname],
      });
    },
  });
};

// 유저 탈퇴
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { clearAuth } = useAuthStore();

  return useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      router.push("/");
    },
  });
};
