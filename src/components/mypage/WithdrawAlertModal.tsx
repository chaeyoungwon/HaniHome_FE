import { useState } from "react";

import { useDeleteUser } from "@/hooks/member/useMemberApi";

import AlertModal from "@/components/common/AlertModal";
import CompleteModal from "@/components/common/CompleteModal";

interface WithdrawAlertModalProps {
  onClose: () => void;
}

const WithdrawAlertModal = ({ onClose }: WithdrawAlertModalProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const { mutate: deleteUser, isPending } = useDeleteUser();

  const handleWithdraw = async () => {
    try {
      await deleteUser();
      setIsCompleted(true);
    } catch (err) {
      console.error("탈퇴 실패", err);
      onClose();
    }
  };

  if (isCompleted) {
    return (
      <CompleteModal
        description={["탈퇴가 완료되었습니다."]}
        onClose={onClose}
      />
    );
  }

  return (
    <AlertModal
      title="탈퇴하시겠습니까?"
      onClose={onClose}
      actionLabel="탈퇴"
      onActionClick={handleWithdraw}
      loading={isPending}
      description={[
        "탈퇴 시 본 계정에 저장된 기록이 소멸되며",
        "탈퇴 후 14일 내로 재가입할 수 없습니다.",
        "탈퇴하시겠습니까?",
      ]}
    />
  );
};

export default WithdrawAlertModal;
