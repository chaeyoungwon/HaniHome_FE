import AlertModal from "@/components/common/AlertModal";

interface MaxImageAlertModalProps {
  onClose: () => void;
}
const MaxImageAlertModal = ({ onClose }: MaxImageAlertModalProps) => {
  return (
    <AlertModal
      title="이미지 두 장까지만 업로드할 수 있어요"
      description={[
        "인증 이미지를 변경하고 싶다면",
        "기존 이미지를 삭제 후 진행해주세요",
      ]}
      onClose={onClose}
    />
  );
};
export default MaxImageAlertModal;
