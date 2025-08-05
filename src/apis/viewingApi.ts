import { axiosInstance } from "@/apis/axios";

import {
  MyViewingDates,
  ViewingGuest,
  ViewingItem,
  ViewingStatus,
  ViewingTime,
  ViewingViewType,
} from "@/types/viewing.type";

// 내 뷰잉 리스트 조회
export const getMyViewingList = async <T>(
  view: ViewingViewType,
  status?: ViewingStatus,
): Promise<T> => {
  const res = await axiosInstance.get(`/api/v1/viewings/my-viewings`, {
    params: { view, status },
  });

  return res.data.data;
};

// 내 뷰잉 날짜 리스트 조회 (status 없이 전체 조회)
export const getViewingList = async (): Promise<ViewingItem[]> => {
  const res = await axiosInstance.get("/api/v1/viewings/my-viewings/dates");
  return res.data;
};

// 특정 매물의 뷰잉 가능한 날짜/시간 조회
export const getViewingAvailableDates = async (
  propertyId: number,
): Promise<Record<string, ViewingTime[]>> => {
  const res = await axiosInstance.get(
    `/api/v1/properties/${propertyId}/viewing-available-dates`,
  );
  return res.data.data;
};

// 내 뷰잉 날짜 조회 (status로 필터링)
export const getMyViewingDates = async (status: ViewingStatus) => {
  const res = await axiosInstance.get<{ data: MyViewingDates }>(
    "/api/v1/viewings/my-viewings/dates",
    {
      params: { status },
    },
  );
  return res.data;
};

// 뷰잉 상세 조회
export const getViewingDetail = async (viewingId: number) => {
  const res = await axiosInstance.get(`/api/v1/viewings/${viewingId}`);
  return res.data.data;
};

// 뷰잉 생성
export const createViewing = async (body: {
  propertyId: number;
  preferredTimes: string[];
}) => {
  const res = await axiosInstance.post("/api/v1/viewings", body);
  return res.data;
};

// 뷰잉 취소
export const cancelViewing = async (
  viewingId: number,
  payload: { optionItemId: number; reason: string },
) => {
  return axiosInstance.put(`/api/v1/viewings/${viewingId}/cancel`, {
    viewingId,
    cancelOptionItemIds: [payload.optionItemId],
    reason: payload.reason,
  });
};

// 뷰잉 일괄 취소
export const cancelAllViewings = async (propertyId: number) => {
  const res = await axiosInstance.patch(
    `/api/v1/properties/${propertyId}/viewings/cancel-all`,
  );
  return res.data.data;
};

// 뷰잉 취소 사유 조회
export const getViewingCancelReason = async (viewingId: number) => {
  const res = await axiosInstance.get(`/api/v1/viewings/${viewingId}/cancel`);

  return res.data.data as {
    viewingId: number;
    cancelReasonOptionItemIds: number[];
    reason: string;
  };
};

// 뷰잉 기록 작성 (파일/메모 저장)
export const putViewingPropertyNotes = async ({
  viewingId,
  fileUrls,
  memo,
}: {
  viewingId: number;
  fileUrls: string[];
  memo: string;
}) => {
  const res = await axiosInstance.put(
    `/api/v1/viewings/${viewingId}/property-notes`,
    {
      viewingId,
      fileUrls,
      memo,
    },
  );

  return res.data.data;
};

// 뷰잉 체크리스트 조회
export const getViewingChecklists = async (viewingId: number) => {
  const res = await axiosInstance.get(
    `/api/v1/viewings/${viewingId}/checklists`,
  );

  return res.data.data as {
    viewingId: number;
    checklistOptionItemIds: number[];
  };
};

// 뷰잉 체크리스트 작성
export const putViewingChecklists = async ({
  viewingId,
  allOptionItemIds,
}: {
  viewingId: number;
  allOptionItemIds: number[];
}) => {
  const res = await axiosInstance.put(`/api/v1/viewings/checklists`, {
    viewingId,
    allOptionItemIds,
  });

  return res.data.data;
};

// 뷰잉 예약한 게스트 목록 조회
export const fetchViewingGuests = async (
  propertyId: number,
  status?: ViewingStatus[],
): Promise<ViewingGuest[]> => {
  const searchParams = new URLSearchParams();
  status?.forEach(s => searchParams.append("status", s));

  const res = await axiosInstance.get(
    `/api/v1/properties/${propertyId}/viewings?${searchParams.toString()}`,
  );
  return res.data.data;
};
