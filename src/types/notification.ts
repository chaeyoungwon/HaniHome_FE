export interface NotificationItem {
  id: number;
  title: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

// SSE 알림 타입
export const NOTIFICATION_TYPES = [
  "VIEWING_REMINDER",
  "VIEWING_CREATED",
  "VIEWING_CANCELLED",
  "ONE_ON_ONE_CONSULT_REPLIED",
  "VERIFICATION_CHECKED",
] as const;
