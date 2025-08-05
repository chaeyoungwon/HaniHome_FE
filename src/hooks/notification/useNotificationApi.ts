import { useEffect, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EventSourcePolyfill } from "event-source-polyfill";

import {
  deleteNotification,
  getMyNotifications,
  patchNotificationRead,
} from "@/apis/notificationApi";

import {
  NOTIFICATION_TYPES,
  NotificationItem,
} from "@/types/notification.type";

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

export const useNotificationStream = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const accessToken = useAuthStore(state => state.accessToken);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!accessToken) return;

    const es = new EventSourcePolyfill(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/notifications/stream`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "text/event-stream",
        },
        withCredentials: true,
      },
    );

    NOTIFICATION_TYPES.forEach(type => {
      es.addEventListener(type, event => {
        try {
          const data = JSON.parse((event as MessageEvent).data);
          setNotifications(prev => [data, ...prev]);

          queryClient.invalidateQueries({ queryKey: ["myNotifications"] });
          queryClient.invalidateQueries({
            queryKey: ["unreadNotificationCount"],
          });
        } catch (e) {
          console.error(`${type} 파싱 오류:`, e);
        }
      });
    });

    es.onerror = err => {
      if (
        err instanceof ErrorEvent &&
        err.message?.includes("No activity within")
      ) {
        return;
      }

      console.error("SSE 연결 오류:", err);
      es.close();
    };

    return () => {
      es.close();
    };
  }, [accessToken, queryClient]);

  return notifications;
};

export const useUnreadNotificationCount = () => {
  const { isLoggedIn } = useAuthStore();

  return useQuery<number>({
    queryKey: ["unreadNotificationCount"],
    queryFn: async () => {
      const data = await getMyNotifications(false);
      return data.length;
    },
    enabled: isLoggedIn,
  });
};
