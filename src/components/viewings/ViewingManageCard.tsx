import { useRouter } from "next/navigation";

import { formatViewingCardTime } from "@/utils/dateFormatter";

import Divider from "@/components/common/Divider";
import ViewingPostCard from "@/components/common/ViewingPostCard";

import { ViewingPropertyItem } from "@/types/viewing";

interface ViewingManageCardProps {
  id: number;
  viewingItem: ViewingPropertyItem;
  onCancelClick?: () => void;
  onArrowClick?: () => void;
  status: "REQUESTED" | "CANCELLED" | "COMPLETED";
}

const ViewingManageCard = ({
  id,
  viewingItem,
  onCancelClick,
  onArrowClick,
  status,
}: ViewingManageCardProps) => {
  const router = useRouter();
  const { date, time } = formatViewingCardTime(viewingItem.meetingDay);

  return (
    <div className="mx-4 flex flex-col items-center justify-between gap-4 rounded-lg border border-gray-200 px-4 py-3">
      <div className={status === "CANCELLED" ? "w-full opacity-50" : "w-full"}>
        <div
          className="flex w-full cursor-pointer flex-col gap-1.5"
          onClick={() =>
            router.push(`/listings/${viewingItem.property.id}?mode=viewing`)
          }
        >
          <div className="flex items-center justify-between">
            <div className="text-body1-sb flex flex-1 gap-2 font-bold text-black">
              <span>{date}</span>
              <span>{time}</span>
            </div>
            <span className="text-lab1-sb text-gray-800">
              {viewingItem.counterpartNickname}
            </span>
          </div>
          <Divider className="my-1" />

          {!viewingItem ? (
            <div className="text-cap1-med text-gray-500"></div>
          ) : (
            <ViewingPostCard
              thumbnailUrl={viewingItem.property.thumbnailUrl ?? ""}
              weeklyCost={viewingItem.property.weeklyCost}
              suburb={viewingItem.property.suburb}
              internalArea={viewingItem.property.internalArea}
              totalFloors={viewingItem.property.totalFloors}
              kind={viewingItem.property.kind}
              billIncluded={viewingItem.property.billIncluded}
              distanceInKm={
                viewingItem.property.nearestStation.distanceFromStation
              }
              wrapperClassName="gap-5"
            />
          )}
        </div>
      </div>

      <div className="flex w-full items-center">
        {status === "CANCELLED" ? (
          <div className="flex w-full items-center justify-center overflow-hidden rounded border border-gray-300 py-2">
            {viewingItem.canSeeViewingDetail && (
              <>
                <button
                  onClick={() => router.push(`/viewing/${id}/record`)}
                  className="flex w-1/2 cursor-pointer flex-col items-center justify-center"
                >
                  <span className="text-cap1-b text-gray-700">노트에 기록</span>
                </button>
                <div className="h-3 w-px bg-gray-500" />
              </>
            )}
            <button
              onClick={onArrowClick}
              className="flex w-1/2 cursor-pointer flex-col items-center justify-center"
            >
              <span className="text-cap1-b text-gray-700">취소 사유 확인</span>
            </button>
          </div>
        ) : (
          <div className="flex w-full items-center justify-center overflow-hidden rounded border border-gray-300 py-2">
            {viewingItem.canSeeViewingDetail && (
              <>
                <button
                  onClick={() => router.push(`/viewing/${id}/record`)}
                  className="flex w-1/2 cursor-pointer flex-col items-center justify-center"
                >
                  <span className="text-cap1-b text-gray-700">노트에 기록</span>
                </button>
                <div className="h-3 w-px bg-gray-500" />
              </>
            )}

            <button
              onClick={onCancelClick}
              className={`flex cursor-pointer flex-col items-center justify-center ${viewingItem.canSeeViewingDetail ? "w-1/2" : "w-full"} `}
            >
              <span className="text-cap1-b text-gray-700">예약 취소</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewingManageCard;
