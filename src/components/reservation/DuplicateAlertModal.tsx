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
          날짜와 시간대가 같은 다른 매물 뷰잉 일정이 있어요.
          <br />
          현재 뷰잉 일정을 변경하거나,
          <br />
          다른 매물의 뷰잉 일정을 변경한 후
          <br />
          다시 예약해주세요.
        </>
      }
      onClose={onClose}
    />
  );
};

export default DuplicateAlertModal;
