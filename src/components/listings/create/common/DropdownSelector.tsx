import { useEffect, useState } from "react";

import clsx from "clsx";

import DownArrow from "@/public/svgs/common/down-arrow.svg";

interface DropdownSelectorProps {
  label: string;
  answer?: string;
  children: React.ReactNode;
  isOpen: boolean;
  isVisible: boolean;
  onClick: () => void;
}

const DropdownSelector = ({
  label,
  answer,
  children,
  isOpen,
  isVisible,
  onClick,
}: DropdownSelectorProps) => {
  const [, setLocalVisible] = useState(false); // 초기값 false

  useEffect(() => {
    if (isOpen && isVisible) {
      const timer = setTimeout(() => setLocalVisible(true), 10); // 애니메이션 지연
      return () => clearTimeout(timer);
    }
    setLocalVisible(isVisible);
  }, [isOpen, isVisible]);

  return (
    <>
      {isVisible && (
        <>
          <div
            className={clsx(
              "flex h-19 w-full max-w-[430px] cursor-pointer items-start justify-between p-4",
              isOpen && "mb-1",
            )}
            onClick={onClick}
          >
            <div className="flex flex-col gap-1">
              <div
                className={clsx(
                  "text-heading3",
                  isOpen ? "text-gray-900" : "text-gray-500",
                )}
              >
                {label}
              </div>
              <div className="text-cap1-med text-gray-400">
                {answer || "답변 내용"}
              </div>
            </div>
            <div>
              <DownArrow
                className={clsx(
                  "h-6 w-6 cursor-pointer",
                  isOpen ? "rotate-180 text-gray-900" : "text-gray-500",
                )}
              />
            </div>
          </div>

          {/* 아래 children 영역은 isOpen일 때만 보여줌 */}
          {isOpen && <div>{children}</div>}
        </>
      )}
    </>
  );
};

export default DropdownSelector;
