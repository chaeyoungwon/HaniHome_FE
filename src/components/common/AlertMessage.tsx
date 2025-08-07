import { useEffect } from "react";

interface AlertMessageProps {
  message: string;
  className?: string;
  onDone: () => void;
}

const AlertMessage = ({ message, onDone, className }: AlertMessageProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDone();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`text-mint-light text-lab1-sb fixed left-1/2 z-50 w-full max-w-[398px] -translate-x-1/2 rounded-sm bg-gray-900 px-4 py-1 text-center ${className}`}
    >
      {message}
    </div>
  );
};

export default AlertMessage;
