import { axiosInstance } from "@/apis/axios";

export const getMyNotifications = async (read?: boolean) => {
  const res = await axiosInstance.get(
    "/api/v1/notifications/my-notifications",
    {
      params: read !== undefined ? { read } : {},
    },
  );

  return res.data.data;
};

export const patchNotificationRead = async (notificationId: number) => {
  const res = await axiosInstance.patch(
    `/api/v1/notifications/${notificationId}/read`,
  );
  return res.data.data;
};

export const deleteNotification = async (notificationId: number) => {
  await axiosInstance.delete(`/api/v1/notifications/${notificationId}`);
};
