import { useEffect } from "react";

import ModalLayout from "@/components/common/ModalLayout";

import CompletedIcon from "@/public/svgs/common/certificated-icon.svg";

interface CompleteModalProps {
  description: React.ReactNode;
  onClose: () => void;
}

const CompleteModal = ({ description, onClose }: CompleteModalProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <ModalLayout onClose={onClose} hideCloseButton={true}>
      <div className="flex flex-col items-center justify-center gap-3">
        <CompletedIcon className="h-6 w-6" />

        <div className="text-body1-sb text-mint-contrast text-center">
          {Array.isArray(description)
            ? description.map((line, idx) => <p key={idx}>{line}</p>)
            : description}
        </div>
      </div>
    </ModalLayout>
  );
};

export default CompleteModal;
