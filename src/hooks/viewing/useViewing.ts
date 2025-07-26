import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  cancelViewing,
  getMyViewingDates,
  getMyViewingList,
  getViewingAvailableDates,
  getViewingCancelReason,
  getViewingChecklists,
  getViewingDetail,
  putViewingChecklists,
  putViewingPropertyNotes,
} from "@/apis/viewing";

import { ViewingStatus, ViewingViewType } from "@/types/viewing";

interface UseMyViewingListOptions {
  view?: ViewingViewType;
  status?: ViewingStatus;
  enabled?: boolean;
}

export const useMyViewingList = <T>({
  view = "DEFAULT",
  status = undefined,
  enabled = true,
}: UseMyViewingListOptions = {}) => {
  return useQuery<T>({
    queryKey: ["myViewingList", view, status],
    queryFn: () => getMyViewingList<T>(view, status),
    enabled,
  });
};

export const useViewingAvailableDates = (propertyId: number) => {
  return useQuery({
    queryKey: ["viewingAvailableDates", propertyId],
    queryFn: () => getViewingAvailableDates(propertyId),
  });
};

export const useMyViewingDates = (status: ViewingStatus) => {
  return useQuery({
    queryKey: ["myViewingDates", status],
    queryFn: () => getMyViewingDates(status),
    select: res => res.data,
  });
};

export const useViewingDetail = (viewingId: number) => {
  return useQuery({
    queryKey: ["viewingDetail", viewingId],
    queryFn: () => getViewingDetail(viewingId),
    enabled: !!viewingId,
  });
};

export const useCancelViewing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      viewingId,
      optionItemId,
      reason,
    }: {
      viewingId: number;
      optionItemId: number;
      reason: string;
    }) => cancelViewing(viewingId, { optionItemId, reason }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myViewingList"] });
    },
  });
};

export const useCancelReason = (viewingId: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["cancelReason", viewingId],
    queryFn: () => getViewingCancelReason(viewingId),
    enabled,
    staleTime: 0,
  });
};

export const useViewingChecklists = (viewingId: number) => {
  return useQuery({
    queryKey: ["viewingChecklists", viewingId],
    queryFn: () => getViewingChecklists(viewingId),
  });
};

export const usePutViewingChecklists = () => {
  return useMutation({
    mutationFn: putViewingChecklists,
  });
};

export const usePutViewingPropertyNotes = () => {
  return useMutation({
    mutationFn: putViewingPropertyNotes,
  });
};
