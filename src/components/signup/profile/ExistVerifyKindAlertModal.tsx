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
      description="이미 인증된 요청이에요"
      onClose={onClose}
    />
  );
};
export default ExistVerifyKindAlertModal;
