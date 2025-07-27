import { useCancelReasons } from "@/hooks/optionItem/useOptionItem";
import { useCancelReason } from "@/hooks/viewing/useViewing";

import ModalLayout from "@/components/common/ModalLayout";

interface CancelReasonModalProps {
  isOpen: boolean;
  viewingId: number;
  onClose: () => void;
  userType: "guest" | "host";
}

const CancelReasonModal = ({
  isOpen,
  viewingId,
  userType,
  onClose,
}: CancelReasonModalProps) => {
  const { data: options } = useCancelReasons(userType);
  const { data: cancelDetail, isLoading } = useCancelReason(viewingId, isOpen);

  if (!isOpen) return null;
  if (isLoading || !cancelDetail || !options) return <></>;

  const hasOptionIds = cancelDetail.cancelReasonOptionItemIds?.length > 0;

  const isEtcSelected =
    cancelDetail.cancelReasonOptionItemIds?.some(id => {
      const found = options.find(opt => opt.optionItemId === id);
      return found?.itemName === "기타";
    }) ||
    (!hasOptionIds && !!cancelDetail.reason); // 사유만 있을 때도 기타로 간주

  const label = hasOptionIds
    ? cancelDetail.cancelReasonOptionItemIds
        .map(id => {
          const found = options.find(opt => opt.optionItemId === id);
          return found ? found.itemName : "알 수 없음";
        })
        .join(", ")
    : cancelDetail.reason
      ? "기타"
      : undefined;

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
          {label && (
            <span className="text-body1-med bg-gray-0 rounded p-3 text-gray-700">
              {label}
            </span>
          )}

          {isEtcSelected && (
            <div className="flex flex-col gap-3">
              <span className="text-body1-sb text-gray-800">
                취소 사유 기입
              </span>
              <p className="text-body1-med scrollbar-hide bg-gray-0 max-h-[176px] overflow-y-auto rounded p-3 whitespace-pre-wrap text-gray-700">
                {cancelDetail.reason || "-"}
              </p>
            </div>
          )}
        </div>
      </div>
    </ModalLayout>
  );
};

export default CancelReasonModal;
