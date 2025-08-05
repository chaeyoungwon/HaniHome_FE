import { usePatchNotificationRead } from "@/hooks/notification/useNotificationApi";

import { NotificationItem } from "@/types/notification.type";

const NotificationCard = ({ id, title, content, isRead }: NotificationItem) => {
  const { mutate } = usePatchNotificationRead();

  const handleClick = () => {
    if (isRead) return;
    mutate(id);
  };

  return (
    <div
      onClick={handleClick}
      className="flex h-fit w-[343px] cursor-pointer flex-col gap-1 rounded-lg bg-white p-4"
    >
      {!isRead && <div className="bg-red h-2 w-2 rounded-full" />}
      <p className="text-body1-sb text-gray-900">{title}</p>
      <p className="text-cap1-med text-gray-600">{content}</p>
    </div>
  );
};

export default NotificationCard;
