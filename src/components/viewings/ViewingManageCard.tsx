import { useRouter } from "next/navigation";

import { formatMeetingDay } from "@/utils/dateFormatter";

import UserRoomPreview from "@/components/common/UserRoomPreview";

import CancelIcon from "@/public/svgs/common/close-icon.svg";
import Arrow from "@/public/svgs/common/left-arrow.svg";
import RecordIcon from "@/public/svgs/viewings/record-icon.svg";

interface ViewingManageCardProps {
  id: number;
  propertyId: number;
  profileImageUrl: string;
  roomImageUrl: string;
  nickname: string;
  meetingDay: string;
  onCancelClick?: () => void;
  onArrowClick?: () => void;
  status: "REQUESTED" | "CANCELLED" | "COMPLETED";
  isActive?: boolean;
}

const ViewingManageCard = ({
  id,
  propertyId,
  profileImageUrl,
  roomImageUrl,
  nickname,
  meetingDay,
  onCancelClick,
  onArrowClick,
  status,
  //   isActive = false,
}: ViewingManageCardProps) => {
  const router = useRouter();
  const { date, time } = formatMeetingDay(meetingDay);

  return (
    <div className="flex items-center justify-between rounded-lg p-4">
      {/* 왼쪽 영역 */}
      <div
        className="flex cursor-pointer items-center justify-center gap-4"
        onClick={() => router.push(`/listings/${propertyId}?mode=viewing`)}
      >
        <UserRoomPreview
          userImg={profileImageUrl}
          roomImg={roomImageUrl}
          variant="md"
        />
        <div className="flex flex-col gap-2">
          <p className="text-body1-sb text-gray-800">{nickname}</p>
          <div className="text-cap1-med flex flex-col gap-1 text-gray-700">
            <div className="flex items-center gap-2">
              <span>날짜</span>
              <div className="h-3 border-l border-gray-300" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>시간</span>
              <div className="h-3 border-l border-gray-300" />
              <span>{time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 버튼 영역 */}
      <div className="flex items-center gap-2">
        {status === "CANCELLED" ? (
          <button
            onClick={onArrowClick}
            className="flex cursor-pointer flex-col items-center justify-center gap-1"
          >
            <div className="flex h-6 w-6 items-center justify-center">
              <Arrow className="rotate-180 text-gray-800" />
            </div>
            <span className="text-cap1-med text-gray-600">사유 확인</span>
          </button>
        ) : (
          <>
            <button
              onClick={() => router.push(`/viewing/${id}/record`)}
              className="flex w-12 cursor-pointer items-center justify-center rounded border border-gray-300 px-3 py-2"
            >
              <div className="flex flex-col gap-1">
                <RecordIcon />
                <span className="text-cap1-med text-mint">기록</span>
              </div>
            </button>

            {status === "REQUESTED" && (
              <button
                onClick={onCancelClick}
                className="text-cap1-med flex w-12 cursor-pointer items-center justify-center rounded border border-gray-300 px-3 py-2"
              >
                <div className="flex flex-col gap-1">
                  <CancelIcon className="text-gray-600" />
                  <span className="text-cap1-med text-gray-600">취소</span>
                </div>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewingManageCard;
