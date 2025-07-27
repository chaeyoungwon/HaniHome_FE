import { useRouter } from "next/navigation";

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  completeTrade,
  fetchPropertyDetailList,
  fetchPropertyList,
  getMyDeals,
  getMyPropertiesWithFilter,
} from "@/apis/property";

import {
  MyPropertiesParams,
  Property,
  PropertyViewType,
  SummaryProperty,
} from "@/types/property";

export const usePropertyList = <T extends PropertyViewType>(params: {
  view: T;
  enabled?: boolean;
}) => {
  return useQuery<T extends "SUMMARY" ? SummaryProperty[] : Property[]>({
    queryKey: ["propertyList", params.view],
    queryFn: () => fetchPropertyList(params.view),
    enabled: params.enabled ?? true,
  });
};

export const usePropertyDetailList = (propertyId: string) => {
  return useQuery({
    queryKey: ["propertyDetailList", propertyId],
    queryFn: () => fetchPropertyDetailList(propertyId),
    enabled: !!propertyId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useMyProperties = (params: MyPropertiesParams) => {
  const { view, tradeStatus, displayStatus } = params;

  return useQuery({
    queryKey: ["my-properties", view, tradeStatus, displayStatus],
    queryFn: () => getMyPropertiesWithFilter(params),
    enabled: !!view,
  });
};

export const useCompleteTrade = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      propertyId,
      viewingId,
    }: {
      propertyId: number;
      viewingId: number;
    }) => completeTrade({ propertyId, viewingId }),

    onSuccess: () => {
      router.push("/mypage/listings");
    },
  });
};

export const useMyDeals = (dealerType: "DEAL_AS_GUEST") => {
  return useQuery<SummaryProperty[]>({
    queryKey: ["myDeals", dealerType],
    queryFn: () => getMyDeals(dealerType),
  });
};
