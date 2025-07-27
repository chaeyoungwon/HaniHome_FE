import { useRouter } from "next/navigation";

import { usePatchDisplayStatus } from "@/hooks/property/useProperty";
import { useCancelAllViewings } from "@/hooks/viewing/useViewing";

import AlertModal from "@/components/common/AlertModal";

interface ListingHideModalProps {
  onClose: () => void;
  listingId: number;
  kind: "SHARE" | "RENT";
}

const ListingHideModal = ({
  onClose,
  listingId,
  kind,
}: ListingHideModalProps) => {
  const { mutate: patchDisplayStatus } = usePatchDisplayStatus(listingId);
  const { mutateAsync: cancelAllViewings } = useCancelAllViewings();
  const router = useRouter();

  const handleCancelAndHide = async () => {
    try {
      await cancelAllViewings(listingId);

      patchDisplayStatus(
        { displayStatus: "INACTIVE", jsonDiscriminator: kind },
        {
          onSuccess: () => {
            onClose();
            router.push("/mypage/listings");
          },
        },
      );
    } catch (err) {
      console.error("일괄 예약 취소 실패", err);
    }
  };

  const handleHideOnly = () => {
    patchDisplayStatus(
      { displayStatus: "INACTIVE", jsonDiscriminator: kind },
      {
        onSuccess: () => {
          onClose();
          router.push("/mypage/listings");
        },
      },
    );
  };

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
      onActionClick={handleCancelAndHide}
      subActionLabel="숨기기만 하기"
      onSubActionClick={handleHideOnly}
    />
  );
};

export default ListingHideModal;
