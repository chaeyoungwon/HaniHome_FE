import AlertModal from "@/components/common/AlertModal";

interface ListingHideModalProps {
  onClose: () => void;
}

const ListingHideModal = ({ onClose }: ListingHideModalProps) => {
  return (
    <AlertModal
      title="이 매물에 확정된 뷰잉 예약이 있어요"
      description={[
        "이 상세페이지를 숨기면, 뷰잉을 예약한 게스트가",
        "상세페이지를 볼 수 없게 되어 문제가 발생할 수 있어요.",
        "숨김 처리와 함께 해당 예약을 취소하시겠어요?",
      ]}
      onClose={onClose}
      actionLabel="예약 취소 후 숨기기"
      onActionClick={() => {
        // TODO: 예약 취소 및 숨기기 로직
        onClose();
      }}
      subActionLabel="숨기기만 하기"
      onSubActionClick={() => {
        // TODO: 숨기기만 하기 로직
        console.log("숨기기만 하기");
        onClose();
      }}
    />
  );
};

export default ListingHideModal;
