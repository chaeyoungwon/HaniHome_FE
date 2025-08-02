"use client";

import { useRef } from "react";

import { useClickOutside } from "@/hooks/common/useClickOutside";
import { useScrollLock } from "@/hooks/common/useScrollLock";

import CloseIcon from "@/public/svgs/common/close-icon.svg";

interface ModalLayoutProps {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  closeButtonPosition?: string;
  closeButtonColor?: string;
  hideCloseButton?: boolean;
}

const ModalLayout = ({
  onClose,
  children,
  className = "p-4",
  closeButtonPosition = "top-4 right-4",
  closeButtonColor,
  hideCloseButton = false,
}: ModalLayoutProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, onClose);
  useScrollLock();

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-gray-800/60">
      <div
        ref={modalRef}
        className={`relative w-[343px] rounded-lg bg-white ${className}`}
      >
        {!hideCloseButton && (
          <button
            className={`absolute z-20 ${closeButtonPosition} cursor-pointer`}
            onClick={onClose}
            aria-label="닫기"
          >
            <CloseIcon
              className={`h-6 w-6 ${closeButtonColor ?? "text-gray-700"}`}
            />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
