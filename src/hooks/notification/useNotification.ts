import { useEffect, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EventSourcePolyfill } from "event-source-polyfill";

import {
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

export const useNotificationStream = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const accessToken = useAuthStore(state => state.accessToken);

  useEffect(() => {
    if (!accessToken) return;

    const eventSource = new EventSourcePolyfill(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/notifications/stream`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      },
    );

    eventSource.onmessage = event => {
      const newMessage = event.data;
      console.log("[SSE 수신됨]", newMessage);
      setMessages(prev => [...prev, newMessage]);
    };

    eventSource.onerror = err => {
      console.error("SSE 연결 오류:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [accessToken]);

  return messages;
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
