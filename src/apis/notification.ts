import { axiosInstance } from "@/apis/axios";

interface EventSourceWithCredentials extends EventSource {
  new (
    url: string,
    eventSourceInitDict?: { withCredentials?: boolean },
  ): EventSource;
}

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

export const connectNotificationStream = () => {
  const CustomEventSource =
    EventSource as unknown as EventSourceWithCredentials;

  const eventSource = new CustomEventSource(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/notifications/stream`,
    { withCredentials: true },
  );

  return eventSource;
};
