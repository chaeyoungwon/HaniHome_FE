import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";

import UserRoomPreview from "@/components/common/UserRoomPreview";

interface ViewingScheduleCardProps {
  date: Date;
  time: string;
}

const ViewingScheduleCard = ({ date, time }: ViewingScheduleCardProps) => {
  const formattedDate = format(date, "yy.MM.dd (EEE)", { locale: ko });

  return (
    <div className="flex items-center gap-4 p-4">
      <UserRoomPreview
        userImg="/svgs/common/profile-img.svg"
        roomImg="/svgs/common/room-img.svg"
        variant="lg"
      />

      <div className="text-body2-med flex flex-col gap-1 text-gray-800">
        <div className="flex items-center gap-2">
          <span>날짜</span>
          <div className="h-[12px] w-px bg-gray-300" />
          {formattedDate}
        </div>
        <div className="flex items-center gap-2">
          <span>시간</span>
          <div className="h-[12px] w-px bg-gray-300" />
          {time}
        </div>
      </div>
    </div>
  );
};

export default ViewingScheduleCard;
