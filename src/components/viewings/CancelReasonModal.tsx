import ModalLayout from "@/components/common/ModalLayout";

interface CancelReasonModalProps {
  isOpen: boolean;
  reason: string;
  onClose: () => void;
}

const CancelReasonModal = ({
  isOpen,
  reason,
  onClose,
}: CancelReasonModalProps) => {
  if (!isOpen) return null;

  const label = "기타"; // 임시 하드코딩

  return (
    <ModalLayout
      onClose={onClose}
      className="px-4 py-6"
      closeButtonPosition="top-6 right-4"
    >
      <div className="flex flex-col gap-5">
        <h1 className="text-heading3 text-gray-900">
          취소 사유를 확인해주세요
        </h1>

        <div className="flex flex-col gap-9">
          <span className="text-body1-med bg-gray-0 rounded p-3 text-gray-700">
            {label}
          </span>

          <div className="flex flex-col gap-3">
            <span className="text-body1-sb text-gray-800">취소 사유 기입</span>
            <p className="text-body1-med scrollbar-hide bg-gray-0 max-h-[176px] overflow-y-auto rounded p-3 whitespace-pre-wrap text-gray-700">
              {reason}
            </p>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default CancelReasonModal;
