import { useQuery } from "@tanstack/react-query";

import { fetchPropertyDetailList, fetchPropertyList } from "@/apis/property";

export const usePropertyList = () => {
  return useQuery({
    queryKey: ["propertyList"],
    queryFn: fetchPropertyList,
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
