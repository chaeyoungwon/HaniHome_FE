import { useRouter } from "next/navigation";

import {
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  completeTrade,
  deleteProperty,
  fetchPropertyDetaiEditlList,
  fetchPropertyDetailList,
  fetchPropertyList,
  getMyDeals,
  getMyPropertiesWithFilter,
  patchDisplayStatus,
  patchProperty,
  postProperty,
} from "@/apis/property";

import { PropertyDetail } from "@/types/listingDetailGet";
import { PropertyDetail as PropertyDetailPost } from "@/types/listingDetailPost";
import {
  MyPropertiesParams,
  Property,
  PropertyErrorResponse,
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
  return useQuery<Property, AxiosError<PropertyErrorResponse>>({
    queryKey: ["propertyDetailList", propertyId],
    queryFn: () => fetchPropertyDetailList(propertyId),
    enabled: !!propertyId,
    staleTime: 0,
    retry: false,
    refetchOnMount: true,
  });
};

export const usePropertyDetailEditList = (propertyId: string) => {
  return useQuery<PropertyDetail, AxiosError<PropertyErrorResponse>>({
    queryKey: ["propertyDetailList", propertyId],
    queryFn: () => fetchPropertyDetaiEditlList(propertyId),
    enabled: !!propertyId,
    staleTime: 0,
    retry: false,
    refetchOnMount: true,
  });
};

// 매물 수정
export const usePatchProperty = (propertyId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload:Partial<PropertyDetailPost>) => patchProperty(propertyId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["propertyDetailList", propertyId],
      });
    },
  });
};

// 매물 숨기기
export const usePatchDisplayStatus = (propertyId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      displayStatus,
      jsonDiscriminator,
    }: {
      displayStatus: "ACTIVE" | "INACTIVE";
      jsonDiscriminator: "SHARE" | "RENT";
    }) => {
      return patchDisplayStatus(propertyId, {
        jsonDiscriminator,
        displayStatus,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["propertyDetailList", propertyId],
      });
      queryClient.invalidateQueries({ queryKey: ["my-properties"] });
    },
  });
};

// 매물 삭제
export const useDeleteProperty = (propertyId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProperty(propertyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-properties"] });
    },
  });
};

export const useMyProperties = (
  params: MyPropertiesParams,
  options?: Omit<
    UseQueryOptions<SummaryProperty[], Error>,
    "queryKey" | "queryFn"
  >,
): UseQueryResult<SummaryProperty[], Error> => {
  const { view, tradeStatus, displayStatus } = params;

  return useQuery({
    queryKey: ["my-properties", view, tradeStatus, displayStatus],
    queryFn: () => getMyPropertiesWithFilter(params),
    enabled: !!view,
    staleTime: 0,
    ...options,
  });
};

export const useCompleteTrade = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      propertyId,
      viewingId,
      dealWithOutsider,
    }: {
      propertyId: number;
      viewingId?: number;
      dealWithOutsider: boolean;
    }) => completeTrade({ propertyId, viewingId, dealWithOutsider }),

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

export const usePostProperty = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PropertyDetailPost) => postProperty(payload),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["my-properties"] });
      router.push(`/listings/${data.id}`);
    },
  });
};
