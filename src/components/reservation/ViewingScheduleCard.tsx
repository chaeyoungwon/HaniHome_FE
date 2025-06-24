import { formatDateTime } from "@/utils/time";

import UserRoomPreview from "@/components/common/UserRoomPreview";

interface ViewingScheduleCardProps {
  date: Date;
  time: string;
  disabled?: boolean;
  onClick?: () => void;
}

const ViewingScheduleCard = ({
  date,
  time,
  disabled,
  onClick,
}: ViewingScheduleCardProps) => {
  const { formattedDate, period, hour, minute } = formatDateTime(date, time);

  return (
    <div
      className={`flex cursor-pointer items-center gap-4 px-4 py-3 ${
        disabled ? "opacity-40" : ""
      }`}
      onClick={onClick}
    >
      <UserRoomPreview
        userImg="/svgs/common/profile-img.svg"
        roomImg="/svgs/common/room-img.svg"
        variant="md"
      />

      <div className="text-body2-med flex flex-col gap-1 text-gray-800">
        <div className="flex items-center gap-2">
          <span>날짜</span>
          <div className="h-[12px] border-l border-gray-300" />
          {formattedDate}
        </div>
        <div className="flex items-center gap-2">
          <span>시간</span>
          <div className="h-[12px] border-l border-gray-300" />
          <span>{period}</span>
          <div>
            <span>{hour}</span>
            <span>:</span>
            <span>{minute}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewingScheduleCard;
