import ModalLayout from "@/components/common/ModalLayout";

import AlertIcon from "@/public/svgs/signup/alert-icon.svg";

import LoadingLottie from "./LoadingLottie";

interface AlertModalProps {
  title: string;
  description: React.ReactNode;
  onClose: () => void;
  actionLabel?: string;
  onActionClick?: () => void;
  actionDisabled?: boolean;
  loading?: boolean;
}

const AlertModal = ({
  title,
  description,
  onClose,
  actionLabel,
  onActionClick,
  actionDisabled,
  loading,
}: AlertModalProps) => {
  if (loading) {
    return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white/80 backdrop-blur-xs">
        <LoadingLottie />
      </div>
    );
  }

  return (
    <ModalLayout closeButtonColor="text-gray-400" onClose={onClose}>
      <div className="relative">
        <div className="mb-4 flex flex-col items-center gap-3">
          <AlertIcon className="h-6 w-6" />
          <span className="text-body1-sb text-red">{title}</span>
        </div>

        <div className="text-body2-med text-center leading-[1.5] text-gray-700">
          {Array.isArray(description)
            ? description.map((line, idx) => <p key={idx}>{line}</p>)
            : description}
        </div>

        {actionLabel && (
          <button
            onClick={onActionClick}
            disabled={actionDisabled}
            className={`text-lab1-b mt-6 h-9 w-full rounded text-white ${
              actionDisabled
                ? "cursor-not-allowed bg-gray-300"
                : "bg-mint cursor-pointer"
            }`}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </ModalLayout>
  );
};

export default AlertModal;
