import { axiosInstance } from "@/apis/axios";

import { ViewingItem, ViewingViewType } from "@/types/viewing";

export const getMyViewingList = async (
  view: ViewingViewType,
): Promise<ViewingItem[]> => {
  const res = await axiosInstance.get(
    `/api/v1/viewings/my-viewings?view=${view}`,
  );
  return res.data;
};

export const getViewingList = async (): Promise<ViewingItem[]> => {
  const res = await axiosInstance.get("/api/v1/viewings/my-viewings/dates");
  return res.data;
};
