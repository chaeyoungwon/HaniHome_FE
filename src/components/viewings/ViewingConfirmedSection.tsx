import { useEffect, useState } from "react";

import { groupBy } from "lodash";

import { useCancelViewing } from "@/hooks/viewing/useViewing";

import { calculateDday } from "@/utils/dateFormatter";

import AlertModal from "@/components/common/AlertModal";
import ContentWrapper from "@/components/layout/ContentWrapper";

import { ViewingPropertyItem } from "@/types/viewing";

import CancelModal from "./CancelModal";
import DdayBadge from "./DdayBadge";
import ViewingEmptyMessage from "./ViewingEmptyMessage";
import ViewingManageCard from "./ViewingManageCard";

interface ViewingConfirmedSectionProps {
  data: ViewingPropertyItem[];
}

const ViewingConfirmedSection = ({ data }: ViewingConfirmedSectionProps) => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [nextModal, setNextModal] = useState<"alert" | null>(null);

  const [openCancelId, setOpenCancelId] = useState<number | null>(null);
  const [cancelPayload, setCancelPayload] = useState<{
    viewingId: number;
    optionItemId: number;
    reason: string;
  } | null>(null);

  const { mutateAsync } = useCancelViewing();

  useEffect(() => {
    if (openCancelId === null && nextModal === "alert") {
      setShowAlertModal(true);
      setNextModal(null);
    }
  }, [openCancelId, nextModal]);

  if (data.length === 0) {
    return <ViewingEmptyMessage message="예약된 뷰잉이 없어요" />;
  }

  // D-Day 기준 그룹핑
  const upcomingViewings = data.filter(
    item => calculateDday(item.meetingDay) >= 0,
  );
  const grouped = groupBy(upcomingViewings, item =>
    calculateDday(item.meetingDay),
  );

  return (
    <ContentWrapper className="mb-6 flex flex-col gap-6" bottomOffset={62}>
      {Object.entries(grouped)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([dday, items]) => (
          <div key={dday} className="flex flex-col gap-4">
            <DdayBadge dday={Number(dday)} />

            {items.map(item => {
              const isGuest = item.canSeeViewingDetail;
              const userType: "host" | "guest" = isGuest ? "guest" : "host";

              return (
                <div
                  key={`item-${dday}-${item.id}`}
                  className="flex flex-col gap-4"
                >
                  <ViewingManageCard
                    id={item.id}
                    viewingItem={item}
                    status="REQUESTED"
                    onCancelClick={() => setOpenCancelId(item.id)}
                  />
                  {openCancelId === item.id && (
                    <CancelModal
                      userType={userType}
                      onClose={() => setOpenCancelId(null)}
                      onConfirm={payload => {
                        setCancelPayload({
                          viewingId: item.id,
                          optionItemId: payload.optionItemId,
                          reason: payload.reason,
                        });
                        setOpenCancelId(null);
                        setShowAlertModal(true);
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}

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
          onActionClick={async () => {
            if (!cancelPayload) return;

            await mutateAsync({
              viewingId: cancelPayload.viewingId,
              optionItemId: cancelPayload.optionItemId,
              reason: cancelPayload.reason,
            });

            setShowAlertModal(false);
            setCancelPayload(null);
          }}
          onClose={() => setShowAlertModal(false)}
        />
      )}
    </ContentWrapper>
  );
};

export default ViewingConfirmedSection;
