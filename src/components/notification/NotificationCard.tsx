import { NotificationItem } from "@/types/notification";

const NotificationCard = ({ title, description, isRead }: NotificationItem) => {
  return (
    <div className="flex h-fit w-[343px] flex-col gap-1 rounded-lg bg-white p-4">
      {!isRead && <div className="bg-red h-2 w-2 rounded-full" />}
      <p className="text-body1-sb text-gray-900">{title}</p>
      <p className="text-cap1-med text-gray-600">{description}</p>
    </div>
  );
};

export default NotificationCard;
