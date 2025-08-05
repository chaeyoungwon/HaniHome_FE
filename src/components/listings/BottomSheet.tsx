import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { useDeleteProperty } from "@/hooks/property/usePropertyApi";

import Divider from "@/components/common/Divider";

interface BottomSheetProps {
  onClose: () => void;
  onHideClick: () => void;
  displayStatus?: "ACTIVE" | "INACTIVE";
  viewingCount: number;
  onShowDeleteModal: () => void;
}

const BottomSheet = ({
  onClose,
  onHideClick,
  displayStatus,
  viewingCount,
  onShowDeleteModal,
}: BottomSheetProps) => {
  const { id } = useParams();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const { mutate: deleteProperty } = useDeleteProperty(Number(id));

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeSheet = (callback?: () => void) => {
    setIsOpen(false);
    setTimeout(() => {
      onClose();
      callback?.();
    }, 300);
  };

  const handleEditClick = () => {
    router.push(`/listings/${id}/edit`);
  };

  const handleHideClick = () => {
    closeSheet(onHideClick);
  };

  const handleDeleteClick = () => {
    if (displayStatus === "ACTIVE" && viewingCount > 0) {
      closeSheet(() => {
        onShowDeleteModal();
      });
      return;
    }

    deleteProperty(undefined, {
      onSuccess: () => {
        closeSheet(() => {
          router.replace("/mypage/listings");
        });
      },
    });
  };

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 z-[100] bg-gray-800 opacity-60"
        onClick={() => closeSheet()}
      />

      {/* 바텀시트 */}
      <div
        className={`fixed bottom-0 left-1/2 z-[100] w-[375px] -translate-x-1/2 rounded-t-2xl border border-gray-500 bg-white pt-3 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center pb-4">
          <div className="h-1 w-[53px] rounded-[50px] bg-gray-500" />
        </div>

        <Divider className="my-1" />
        <div
          className="text-body1-sb w-full cursor-pointer py-4 text-center text-gray-900"
          onClick={handleEditClick}
        >
          매물정보 수정
        </div>
        <Divider className="my-1" />
        <div
          className="text-body1-sb w-full cursor-pointer py-4 text-center text-gray-900"
          onClick={handleHideClick}
        >
          {displayStatus === "ACTIVE" ? "숨기기" : "숨기기 취소"}
        </div>
        <Divider className="my-1" />
        <div
          className="text-body1-sb text-red w-full cursor-pointer py-4 text-center"
          onClick={handleDeleteClick}
        >
          삭제
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
