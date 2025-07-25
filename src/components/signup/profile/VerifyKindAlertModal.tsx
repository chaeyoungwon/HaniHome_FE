import AlertModal from "@/components/common/AlertModal";

interface VerfiyKindAlertModalProps {
  onClose: () => void;
}
const VerfiyKindAlertModal = ({ onClose }: VerfiyKindAlertModalProps) => {
  return (
    <AlertModal
      title="기존 이미지를 모두 삭제해주세요"
      description={[
        "인증수단 변경 시 기존 인증 이미지를 전체 삭제 후",
        "인증수단 변경이 가능합니다",
      ]}
      onClose={onClose}
    />
  );
};
export default VerfiyKindAlertModal;
