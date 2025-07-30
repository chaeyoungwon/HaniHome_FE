import { useState } from "react";

type Toast = {
  id: string;
  title: string;
  content?: string;
};

export const useToastQueue = () => {
  const [queue, setQueue] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = `${Date.now()}-${Math.random()}`;
    setQueue(prev => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setQueue(prev => prev.filter(t => t.id !== id));
  };

  return { queue, addToast, removeToast };
};
