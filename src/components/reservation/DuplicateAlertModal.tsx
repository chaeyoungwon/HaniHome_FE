import AlertModal from "@/components/common/AlertModal";

interface DuplicateAlertModalProps {
  onClose: () => void;
}

const DuplicateAlertModal = ({ onClose }: DuplicateAlertModalProps) => {
  return (
    <AlertModal
      title="다른 뷰잉 일정과 겹쳐요"
      description={
        <>
          현재 설정한 모든 일정이
          <br />
          내가 기존에 예약한 뷰잉 일정들과 겹쳐요.
          <br />
          최소 1개 이상의 뷰잉 일정을 수정해주세요.
        </>
      }
      onClose={onClose}
    />
  );
};

export default DuplicateAlertModal;
