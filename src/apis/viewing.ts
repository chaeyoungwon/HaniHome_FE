import { axiosInstance } from "@/apis/axios";

import { ViewingItem } from "@/types/viewing";

export const getViewingList = async (): Promise<ViewingItem[]> => {
  const res = await axiosInstance.get("/api/viewings/my-viewings"); // 실제 경로로 교체
  return res.data;
};
