"use client";

import { useState } from "react";

import {
  useDeleteAllNotifications,
  useMyNotifications,
} from "@/hooks/notification/useNotificationApi";

import AlertModal from "@/components/common/AlertModal";
import LoadingLottie from "@/components/common/LoadingLottie";
import ContentWrapper from "@/components/layout/ContentWrapper";
import BackHeader from "@/components/layout/header/BackHeader";
import NotificationCard from "@/components/notification/NotificationCard";

const NotificationPage = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data: notifications = [], isLoading } = useMyNotifications();
  const notificationIds = notifications.map(item => item.id);

  const { mutate: deleteAll } = useDeleteAllNotifications(notificationIds);

  const handleDeleteAll = () => {
    deleteAll();
    setShowDeleteModal(false);
  };

  const hasNotifications = notifications && notifications.length > 0;

  return (
    <ContentWrapper className="bg-gray-0 flex min-h-screen flex-col gap-2">
      <BackHeader
        className="bg-gray-0"
        rightIcon="delete"
        onRightClick={() => setShowDeleteModal(true)}
      />
      <main className="flex flex-1 flex-col px-4">
        {isLoading ? (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white/80 backdrop-blur-xs">
            <LoadingLottie />
          </div>
        ) : hasNotifications ? (
          <>
            <div className="flex flex-col gap-2">
              {notifications.map(item => (
                <NotificationCard key={item.id} {...item} />
              ))}
            </div>
            <div className="h-10" />
          </>
        ) : (
          <div className="text-body flex flex-1 items-center justify-center pb-[57px] text-gray-500">
            알림이 없어요
          </div>
        )}
      </main>
      {showDeleteModal && (
        <AlertModal
          title="알림을 전부 삭제하시겠습니까?"
          description={[
            "알림 미확인에 의한 책임은 당사자에게 있으며,",
            "이후 동일한 알림을 재전송하지 않습니다",
          ]}
          actionLabel="삭제"
          onActionClick={handleDeleteAll}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </ContentWrapper>
  );
};

export default NotificationPage;
