import { useQuery } from "@tanstack/react-query";

import { fetchPropertyDetailList, fetchPropertyList } from "@/apis/property";

import { Property, PropertyViewType, SummaryProperty } from "@/types/property";

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
