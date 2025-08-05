"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import { Suspense, useEffect } from "react";

import { useNotificationStream } from "@/hooks/notification/useNotificationApi";
import { useToastQueue } from "@/hooks/notification/useToastQueue";

import TabBar from "@/components/layout/TabBar";
import NotificationToast from "@/components/notification/NotificationToast";

const ScrollHandler = dynamic(
  () => import("@/components/layout/ScrollHandler"),
  {
    ssr: false,
  },
);

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const notifications = useNotificationStream();
  const { queue, addToast, removeToast } = useToastQueue();

  const showBottomNavbarPaths = ["/home", "/wishlist", "/viewing", "/mypage"];
  const showNavbar = showBottomNavbarPaths.includes(pathname);
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    if (notifications.length === 0) return;
    const latest = notifications[0];

    addToast({
      title: latest.title || "새 알림이 도착했어요!",
      content: latest.content,
    });
  }, [notifications]);

  return (
    <div
      className={
        isAdmin
          ? "min-h-screen w-full overflow-y-auto bg-white"
          : "scrollbar-hide mx-auto h-screen max-w-[480px] min-w-[375px] overflow-y-auto"
      }
    >
      <Suspense fallback={null}>
        <ScrollHandler />
      </Suspense>

      {children}

      {!isAdmin && showNavbar && <TabBar />}
      <div className="fixed top-[47.85px] left-1/2 z-[999] flex w-full -translate-x-1/2 flex-col items-center gap-2">
        {queue.map(toast => (
          <NotificationToast
            key={toast.id}
            title={toast.title}
            content={toast.content}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default LayoutWrapper;
