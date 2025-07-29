import AlertModal from "@/components/common/AlertModal";

interface ListingDeleteModalProps {
  onClose: () => void;
}

const ListingDeleteModal = ({ onClose }: ListingDeleteModalProps) => {
  return (
    <AlertModal
      title="뷰잉 예약된 매물은 삭제할 수 없어요"
      description={[
        "뷰잉관리에서 뷰잉을 취소한 후,",
        "예약된 뷰잉이 없는 상태에서 삭제를 진행해주세요",
      ]}
      onClose={onClose}
    />
  );
};

export default ListingDeleteModal;
