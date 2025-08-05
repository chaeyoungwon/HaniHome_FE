import { serializePropertyFilters } from "@/utils/filter/serializePropertyFilters";

import { PropertyDetail as PropertyDetailGet } from "@/types/listingDetailGet";
import { PropertyDetail as PropertyDetailPost } from "@/types/listingDetailPost";
import {
  MyPropertiesParams,
  Property,
  PropertyViewType,
  SummaryProperty,
} from "@/types/property";
import { FilteredPropertyParams } from "@/types/property";

import { axiosInstance } from "./axios";

// 매물 목록 조회
export const fetchPropertyList = async <T extends PropertyViewType>(
  view: T,
): Promise<T extends "SUMMARY" ? SummaryProperty[] : Property[]> => {
  const res = await axiosInstance.get(`/api/v1/properties?view=${view}`);
  return res.data.data;
};

// 매물 상세 조회
export const fetchPropertyDetailList = async (
  propertyId: string,
): Promise<Property> => {
  const res = await axiosInstance.get(`/api/v1/properties/${propertyId}`);
  return res.data.data;
};

//내놓은 매물 상세 조회
export const fetchPropertyDetaiEditlList = async (
  propertyId: string,
): Promise<PropertyDetailGet> => {
  const res = await axiosInstance.get(`/api/v1/properties/${propertyId}`);
  return res.data.data;
};

// 매물 수정
export const patchProperty = async (propertyId: number, payload: Partial<PropertyDetailPost>) => {
  const res = await axiosInstance.patch(
    `/api/v1/properties/${propertyId}`,
    payload,
  );
  return res.data.data;
};

export const patchDisplayStatus = (
  propertyId: number,
  payload: {
    jsonDiscriminator: "SHARE" | "RENT";
    displayStatus: "ACTIVE" | "INACTIVE";
  },
) => {
  return axiosInstance.patch(`/api/v1/properties/${propertyId}`, payload);
};

// 매물 삭제
export const deleteProperty = async (propertyId: number) => {
  const res = await axiosInstance.delete(`/api/v1/properties/${propertyId}`);
  return res.data.data;
};

// 매물 검색 필터링
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

// 매물 신고
export const postReport = async (body: {
  targetId: number;
  targetType: string;
  documentImageUrls: string[];
  description: string;
}) => {
  return axiosInstance.post("/api/v1/reports", body);
};

// 내놓은 매물 조회
export const getMyPropertiesWithFilter = async (params: MyPropertiesParams) => {
  const res = await axiosInstance.get("/api/v1/properties/my-properties", {
    params,
  });
  return res.data.data;
};

// 거래 완료 상태 변경
export const completeTrade = async ({
  propertyId,
  viewingId,
  dealWithOutsider,
}: {
  propertyId: number;
  viewingId?: number;
  dealWithOutsider: boolean;
}) => {
  const params: {
    dealWithOutsider: boolean;
    viewingId?: number;
  } = {
    dealWithOutsider,
  };

  if (viewingId !== undefined) {
    params.viewingId = viewingId;
  }

  const res = await axiosInstance.post(
    `/api/v1/properties/${propertyId}/complete`,
    null,
    { params },
  );

  return res.data.data;
};

// 구한 매물 조회
export const getMyDeals = async (
  dealerType: "DEAL_AS_GUEST",
): Promise<SummaryProperty[]> => {
  const res = await axiosInstance.get("/api/v1/deals/my-deals", {
    params: { dealerType },
  });
  return res.data.data;
};

//매물 등록
export const postProperty = async (payload: PropertyDetailPost) => {
  const { data } = await axiosInstance.post("/api/v1/properties", payload);
  return data;
};
