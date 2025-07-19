import { useRouter } from "next/navigation";

import { usePropertyList } from "@/hooks/property/useProperty";

import { formatViewingCardTime } from "@/utils/dateFormatter";

import Divider from "../common/Divider";
import ViewingPostCard from "../common/ViewingPostCard";

interface ViewingManageCardProps {
  id: number;
  propertyId: number;
  roomImageUrl: string;
  nickname: string;
  meetingDay: string;
  onCancelClick?: () => void;
  onArrowClick?: () => void;
  status: "REQUESTED" | "CANCELLED" | "COMPLETED";
}

const ViewingManageCard = ({
  id,
  propertyId,
  roomImageUrl,
  nickname,
  meetingDay,
  onCancelClick,
  onArrowClick,
  status,
}: ViewingManageCardProps) => {
  const router = useRouter();
  const { date, time } = formatViewingCardTime(meetingDay);

  const { data: listData, isLoading } = usePropertyList<"SUMMARY">({
    view: "SUMMARY",
  });
  const summary = listData?.find(item => item.id === Number(propertyId));

  return (
    <div className="mx-4 flex flex-col items-center justify-between gap-4 rounded-lg border border-gray-200 px-4 py-3">
      <div className={status === "CANCELLED" ? "w-full opacity-50" : "w-full"}>
        <div
          className="flex w-full cursor-pointer flex-col gap-1.5"
          onClick={() => router.push(`/listings/${propertyId}?mode=viewing`)}
        >
          <div className="flex items-center justify-between">
            <div className="text-body1-sb flex flex-1 gap-2 font-bold text-black">
              <span>{date}</span>
              <span>{time}</span>
            </div>
            <span className="text-lab1-sb text-gray-800">{nickname}</span>
          </div>
          <Divider className="my-1" />

          {isLoading || !summary ? (
            <div className="text-cap1-med text-gray-500"></div>
          ) : (
            <ViewingPostCard
              thumbnailUrl={summary.thumbnailUrl ?? roomImageUrl}
              weeklyCost={summary.weeklyCost}
              suburb={summary.suburb}
              internalArea={summary.internalArea}
              totalFloors={summary.totalFloors}
              kind={summary.kind}
              billIncluded={summary.billIncluded}
              distanceInKm={summary.nearestStation.distanceFromStation}
              wrapperClassName="gap-5"
            />
          )}
        </div>
      </div>

      {/* 버튼 영역은 opacity 적용 안함 */}
      <div className="flex w-full items-center">
        {status === "CANCELLED" ? (
          <div className="flex w-full items-center justify-center overflow-hidden rounded border border-gray-300 py-2">
            <button
              onClick={() => router.push(`/viewing/${id}/record`)}
              className="flex w-1/2 cursor-pointer flex-col items-center justify-center"
            >
              <span className="text-cap1-b text-gray-700">노트에 기록</span>
            </button>

            <div className="h-3 w-px bg-gray-500" />
            <button
              onClick={onArrowClick}
              className="flex w-1/2 cursor-pointer flex-col items-center justify-center"
            >
              <span className="text-cap1-b text-gray-700">취소 사유 확인</span>
            </button>
          </div>
        ) : (
          <div className="flex w-full items-center justify-center overflow-hidden rounded border border-gray-300 py-2">
            <button
              onClick={() => router.push(`/viewing/${id}/record`)}
              className="flex w-1/2 cursor-pointer flex-col items-center justify-center"
            >
              <span className="text-cap1-b text-gray-700">노트에 기록</span>
            </button>
            {status === "REQUESTED" && (
              <>
                <div className="h-3 w-px bg-gray-500" />
                <button
                  onClick={onCancelClick}
                  className="flex w-1/2 cursor-pointer flex-col items-center justify-center"
                >
                  <span className="text-cap1-b text-gray-700">예약 취소</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewingManageCard;
