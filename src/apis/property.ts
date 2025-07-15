import { serializePropertyFilters } from "@/utils/serializePropertyFilters";

import { Property, PropertyViewType, SummaryProperty } from "@/types/property";
import { FilteredPropertyParams } from "@/types/property";

import { axiosInstance } from "./axios";

export const fetchPropertyList = async <T extends PropertyViewType>(
  view: T,
): Promise<T extends "SUMMARY" ? SummaryProperty[] : Property[]> => {
  const res = await axiosInstance.get(`/api/v1/properties?view=${view}`);
  return res.data.data;
};

export const fetchPropertyDetailList = async (
  propertyId: string,
): Promise<Property> => {
  const res = await axiosInstance.get(`/api/v1/properties/${propertyId}`);
  return res.data.data;
};

export const fetchPropertySearch = async (params: FilteredPropertyParams) => {
  const searchParams = serializePropertyFilters(params);
  const queryString = searchParams.toString();

  const url = queryString
    ? `/api/v1/properties/search?${queryString}`
    : `/api/v1/properties/search`;

  const res = await axiosInstance.get(url);
  const { data } = res.data;

  return {
    list: data,
    count: data?.length ?? 0,
  };
};
