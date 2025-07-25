import { useEffect } from "react";

interface NotificationToastProps {
  message: string;
  subMessage?: string;
  onClose: () => void;
}

const NotificationToast = ({
  message,
  subMessage,
  onClose,
}: NotificationToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="border-mint bg-mint-light shadow-fab fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-lg border p-4">
      <div className="text-body1-sb text-mint-contrast">{message}</div>
      {subMessage && (
        <div className="text-cap1-med mt-1 text-gray-600">{subMessage}</div>
      )}
    </div>
  );
};

export default NotificationToast;
