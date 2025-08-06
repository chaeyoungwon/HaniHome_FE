"use client";

import { useRouter } from "next/navigation";

import clsx from "clsx";

import CloseIcon from "@/public/svgs/common/close-icon.svg";
import BackArrow from "@/public/svgs/common/left-arrow.svg";
import DotThreeIcon from "@/public/svgs/header/dotThree-icon.svg";
import ReportIcon from "@/public/svgs/header/report-icon.svg";
import TrashIcon from "@/public/svgs/header/trash-icon.svg";

interface BackHeaderProps {
  title?: string;
  rightIcon?: "report" | "close" | "delete" | "more";
  onRightClick?: () => void;
  onBackClick?: () => void;
  hideBackIcon?: boolean;
  className?: string;
}

const BackHeader = ({
  title,
  rightIcon,
  onRightClick,
  onBackClick,
  hideBackIcon = false,
  className,
}: BackHeaderProps) => {
  const router = useRouter();

  return (
    <header
      className={clsx(
        "sticky top-0 left-1/2 z-50 flex h-12 max-w-[480px] min-w-[375px] items-center justify-between px-4 py-3",
        className || "bg-white",
      )}
    >
      {hideBackIcon ? (
        <div className="w-6" />
      ) : (
        <button
          onClick={
            onBackClick ??
            (() => {
              if (window.history.length > 1) {
                router.back();
              } else {
                router.push("/home");
              }
            })
          }
          className="cursor-pointer"
        >
          <BackArrow className="h-6 w-6" />
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
      ) : rightIcon === "delete" ? (
        <button onClick={onRightClick} className="cursor-pointer">
          <TrashIcon className="h-6 w-6" />
        </button>
      ) : rightIcon === "more" ? (
        <button onClick={onRightClick} className="cursor-pointer">
          <DotThreeIcon className="h-6 w-6" />
        </button>
      ) : (
        <div className="inline-block h-6 w-6" />
      )}
    </header>
  );
};

export default BackHeader;
