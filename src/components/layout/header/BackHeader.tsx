"use client";

import { useRouter } from "next/navigation";

import CloseIcon from "@/public/svgs/common/close-icon.svg";
import BackArrow from "@/public/svgs/common/left-arrow.svg";
import ReportIcon from "@/public/svgs/header/report-icon.svg";

interface BackHeaderProps {
  title?: string;
  rightIcon?: "report" | "close";
  onRightClick?: () => void;
  onBackClick?: () => void;
  hideBackIcon?: boolean;
}

const BackHeader = ({
  title,
  rightIcon,
  onRightClick,
  onBackClick,
  hideBackIcon = false,
}: BackHeaderProps) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 left-1/2 z-50 flex h-12 max-w-[768px] min-w-[375px] items-center justify-between bg-white px-4 py-3">
      {hideBackIcon ? (
        <div className="w-6" />
      ) : (
        <button
          onClick={onBackClick ?? (() => router.back())}
          className="cursor-pointer"
        >
          <BackArrow />
        </button>
      )}

      {title ? (
        <h1 className="text-heading2 text-gray-900">{title}</h1>
      ) : (
        <div />
      )}

      {rightIcon === "report" ? (
        <button onClick={onRightClick} className="cursor-pointer">
          <ReportIcon className="h-6 w-6" />
        </button>
      ) : rightIcon === "close" ? (
        <button onClick={onRightClick} className="cursor-pointer">
          <CloseIcon className="h-6 w-6" />
        </button>
      ) : (
        <div className="inline-block h-6 w-6" />
      )}
    </header>
  );
};

export default BackHeader;
