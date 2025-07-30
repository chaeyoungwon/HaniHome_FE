import { useEffect } from "react";

interface NotificationToastProps {
  title: string;
  content?: string;
  onClose: () => void;
}

const NotificationToast = ({
  title,
  content,
  onClose,
}: NotificationToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="border-mint bg-mint-light shadow-fab w-[343px] rounded-lg border p-4">
      <div className="text-body1-sb text-mint-contrast">{title}</div>
      {content && (
        <div className="text-cap1-med mt-1 text-gray-600">{content}</div>
      )}
    </div>
  );
};

export default NotificationToast;
