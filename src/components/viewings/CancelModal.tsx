import { useEffect, useRef, useState } from "react";

import ModalLayout from "@/components/common/ModalLayout";
import SelectableChip from "@/components/common/SelectableChip";

import {
  GUEST_REASONS,
  HOST_REASONS,
  PLACEHOLDER_TEXT,
} from "@/constants/cancel";

interface CancelModalProps {
  onClose: () => void;
  onConfirm: () => void;
  userType: "host" | "guest";
}

const CancelModal = ({ onClose, onConfirm, userType }: CancelModalProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [customReason, setCustomReason] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const cancelReasons = userType === "host" ? HOST_REASONS : GUEST_REASONS;
  const isOtherSelected = selected === "기타";
  const isDisabled = !selected || (isOtherSelected && !customReason.trim());

  /* textarea height 조정 로직 */
  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const [min, max, placeholder] = [46, 176, 68];
    textarea.style.height = "auto";
    textarea.style.height = `${!customReason.trim() ? placeholder : Math.max(min, Math.min(textarea.scrollHeight, max))}px`;
  };

  useEffect(() => {
    if (isOtherSelected) resizeTextarea();
  }, [customReason, isOtherSelected]);

  return (
    <ModalLayout
      onClose={onClose}
      className="px-4 py-6"
      closeButtonPosition="top-6 right-4"
    >
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-1">
          <h1 className="text-heading3 text-gray-900">
            취소 사유를 선택해주세요
          </h1>
          <span className="text-cap1-med text-gray-600">
            예약 시간 1시간 전까지만 취소할 수 있어요
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {cancelReasons.map(reason => (
            <SelectableChip
              key={reason}
              label={reason}
              selected={selected === reason}
              onClick={() => setSelected(reason)}
            />
          ))}
        </div>

        {/* 기타 사유 입력 */}
        {isOtherSelected && (
          <div className="flex flex-col gap-3">
            <h1 className="text-heading3 text-gray-900">취소 사유 기입</h1>
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={customReason}
                onChange={e => setCustomReason(e.target.value)}
                maxLength={150}
                rows={1}
                placeholder="placeholder"
                className="text-body1-med bg-gray-0 scrollbar-hide max-h-[176px] w-full resize-none overflow-y-auto rounded p-3 text-gray-700 placeholder-transparent outline-none"
              />
              {!customReason && (
                <p className="text-body1-med pointer-events-none absolute top-3 left-3 whitespace-pre-line text-gray-400">
                  {PLACEHOLDER_TEXT[userType]}
                </p>
              )}
            </div>
          </div>
        )}

        <button
          disabled={isDisabled}
          onClick={onConfirm}
          className={`text-lab1-b h-9 rounded text-white ${
            isDisabled
              ? "cursor-not-allowed bg-gray-300"
              : "bg-mint cursor-pointer"
          }`}
        >
          취소하기
        </button>
      </div>
    </ModalLayout>
  );
};

export default CancelModal;
