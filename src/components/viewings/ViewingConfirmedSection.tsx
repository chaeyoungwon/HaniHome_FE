import { useEffect, useState } from "react";

import { calculateDday } from "@/utils/dateFormatter";

import AlertModal from "@/components/common/AlertModal";

import { ViewingCardItem } from "@/types/viewing";

import CancelModal from "./CancelModal";
import DdayBadge from "./DdayBadge";
import ViewingEmptyMessage from "./ViewingEmptyMessage";
import ViewingManageCard from "./ViewingManageCard";

interface ViewingConfirmedSectionProps {
  data: ViewingCardItem[];
  currentUserId: number;
}

const ViewingConfirmedSection = ({
  data,
  currentUserId,
}: ViewingConfirmedSectionProps) => {
  const [openCancelId, setOpenCancelId] = useState<number | null>(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [nextModal, setNextModal] = useState<"alert" | null>(null);

  useEffect(() => {
    if (openCancelId === null && nextModal === "alert") {
      setShowAlertModal(true);
      setNextModal(null);
    }
  }, [openCancelId, nextModal]);

  if (data.length === 0) {
    return <ViewingEmptyMessage message="예약된 뷰잉이 없어요" />;
  }

  return (
    <div className="flex flex-col gap-4">
      {data
        .filter(item => calculateDday(item.meetingDay) >= 0)
        .sort(
          (a, b) => calculateDday(a.meetingDay) - calculateDday(b.meetingDay),
        )
        .map(item => {
          const dday = calculateDday(item.meetingDay);
          const isHost = currentUserId === item.memberId;
          const userType: "host" | "guest" = isHost ? "host" : "guest";

          return (
            <div key={item.id}>
              <DdayBadge dday={dday} />
              <ViewingManageCard
                id={item.id}
                propertyId={item.propertyId}
                status="REQUESTED"
                profileImageUrl={item.profileImageUrl}
                roomImageUrl={item.roomImageUrl}
                nickname={item.nickname}
                meetingDay={item.meetingDay}
                onCancelClick={() => setOpenCancelId(item.id)}
              />
              {openCancelId === item.id && (
                <CancelModal
                  userType={userType}
                  onClose={() => setOpenCancelId(null)}
                  onConfirm={() => {
                    setOpenCancelId(null);
                    setNextModal("alert");
                  }}
                />
              )}
            </div>
          );
        })}

      {openCancelId === null && nextModal === "alert" && (
        <div className="fixed inset-0 z-50 bg-gray-800/60" />
      )}

      {showAlertModal && (
        <AlertModal
          title="잠깐! 취소는 신중히 진행해주세요"
          description={[
            "예약을 취소한 후 다른 게스트가 해당 매물을 예약할 시,",
            "동일한 시간대에 예약할 수 없습니다.",
            "예약 취소를 진행하시겠습니까?",
          ]}
          actionLabel="취소하기"
          onClose={() => setShowAlertModal(false)}
          // onActionClick={} 추후 뷰잉 취소하기 API 연결
        />
      )}
    </div>
  );
};

export default ViewingConfirmedSection;
