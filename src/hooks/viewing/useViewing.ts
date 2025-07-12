import { useQuery } from "@tanstack/react-query";

import { getMyViewingList } from "@/apis/viewing";

interface UseMyViewingListOptions {
  view?: "DEFAULT" | "DATE_PROFILE" | "DATE_WITH_PROPERTY";
  enabled?: boolean;
}

export const useMyViewingList = ({
  view = "DEFAULT",
  enabled = true,
}: UseMyViewingListOptions = {}) => {
  return useQuery({
    queryKey: ["myViewingList", view],
    queryFn: () => getMyViewingList(view),
    enabled,
  });
};
