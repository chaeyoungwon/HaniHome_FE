import { useEffect } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  connectNotificationStream,
  deleteNotification,
  getMyNotifications,
  patchNotificationRead,
} from "@/apis/notification";

import { NotificationItem } from "@/types/notification";

export const useMyNotifications = (read?: boolean) => {
  return useQuery<NotificationItem[]>({
    queryKey: ["myNotifications", read],
    queryFn: () => getMyNotifications(read),
    select: data => [...data].reverse(),
  });
};

export const usePatchNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) =>
      patchNotificationRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myNotifications"] });
    },
  });
};

export const useDeleteAllNotifications = (notificationIds: number[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await Promise.all(notificationIds.map(id => deleteNotification(id)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myNotifications"] });
    },
  });
};

export const useNotificationStream = (
  onMessage: (data: { timeout: number }) => void,
) => {
  useEffect(() => {
    const eventSource = connectNotificationStream();

    eventSource.onmessage = event => {
      const parsed = JSON.parse(event.data) as { timeout: number };
      onMessage(parsed);
    };

    return () => {
      eventSource.close();
    };
  }, [onMessage]);
};
