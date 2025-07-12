import { useQuery } from "@tanstack/react-query";

import { fetchMemberById } from "@/apis/member";

export const useMember = (memberId: number) => {
  return useQuery({
    queryKey: ["member", memberId],
    queryFn: () => fetchMemberById(memberId),
    enabled: !!memberId,
  });
};
