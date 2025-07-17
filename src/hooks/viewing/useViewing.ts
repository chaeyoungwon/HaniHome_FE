import { useQuery } from "@tanstack/react-query";

import {
  getMyViewingDates,
  getMyViewingList,
  getViewingAvailableDates,
} from "@/apis/viewing";

interface UseMyViewingListOptions {
  view?: "DEFAULT" | "DATE_PROFILE" | "DATE_WITH_PROPERTY";
  enabled?: boolean;
}

export const useMyViewingList = <T>({
  view = "DEFAULT",
  enabled = true,
}: UseMyViewingListOptions = {}) => {
  return useQuery<T>({
    queryKey: ["myViewingList", view],
    queryFn: () => getMyViewingList<T>(view),
    enabled,
  });
};

export const useViewingAvailableDates = (propertyId: number) => {
  return useQuery({
    queryKey: ["viewingAvailableDates", propertyId],
    queryFn: () => getViewingAvailableDates(propertyId),
  });
};

export const useMyViewingDates = (
  status: "REQUESTED" | "CANCELLED" | "COMPLETED",
) => {
  return useQuery({
    queryKey: ["myViewingDates", status],
    queryFn: () => getMyViewingDates(status),
    select: res => res.data,
  });
};
