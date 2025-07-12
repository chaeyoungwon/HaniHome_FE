import { Property } from "@/types/property";

import { axiosInstance } from "./axios";

type FilteredPropertyParams = {
  kinds?: ("SHARE" | "RENT")[];
  sharePropertySubTypes?: string[];
  rentPropertySubTypes?: string[];
  minWeeklyCost?: number;
  maxWeeklyCost?: number;
  billIncluded?: boolean;
  availableFrom?: string;
  availableTo?: string;
  immediate?: boolean;
  negotiable?: boolean;
  metroStopLatitude?: number;
  metroStopLongitude?: number;
  radiusKm?: number;
};

export const fetchPropertyList = async (): Promise<Property[]> => {
  const res = await axiosInstance.get("/api/v1/properties");
  console.log(res.data.data);

  return res.data.data;
};

export const fetchPropertyDetailList = async (
  propertyId: string,
): Promise<Property> => {
  const res = await axiosInstance.get(`/api/v1/properties/${propertyId}`);
  return res.data.data;
};

export const getFilteredPropertyCount = async (
  params: FilteredPropertyParams,
) => {
  const searchParams = new URLSearchParams();

  params.kinds?.forEach(kind => searchParams.append("kinds", kind));
  params.sharePropertySubTypes?.forEach(type =>
    searchParams.append("sharePropertySubTypes", type),
  );
  params.rentPropertySubTypes?.forEach(type =>
    searchParams.append("rentPropertySubTypes", type),
  );

  const restParams: (keyof FilteredPropertyParams)[] = [
    "minWeeklyCost",
    "maxWeeklyCost",
    "billIncluded",
    "availableFrom",
    "availableTo",
    "immediate",
    "negotiable",
    "metroStopLatitude",
    "metroStopLongitude",
    "radiusKm",
  ];

  restParams.forEach(key => {
    const value = params[key];
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const res = await axiosInstance.get(
    `/api/v1/properties/search?${searchParams.toString()}`,
  );

  return {
    totalElements: res.data.totalElements ?? res.data.data?.length ?? 0,
  };
};
