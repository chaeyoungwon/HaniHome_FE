import AlertModal from "@/components/common/AlertModal";

interface ExistVerifyKindAlertModalProps {
  onClose: () => void;
}
const ExistVerifyKindAlertModal = ({
  onClose,
}: ExistVerifyKindAlertModalProps) => {
  return (
    <AlertModal
      title="이미 인증된 요청이에요"
      description="동일한 인증수단을 재인증할 수 없어요"
      onClose={onClose}
    />
  );
};
export default ExistVerifyKindAlertModal;
