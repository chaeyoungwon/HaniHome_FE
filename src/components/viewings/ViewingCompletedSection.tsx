import { ViewingCardItem } from "@/types/viewing";

import ViewingEmptyMessage from "./ViewingEmptyMessage";
import ViewingManageCard from "./ViewingManageCard";

interface ViewingCompletedSectionProps {
  data: ViewingCardItem[];
}

const ViewingCompletedSection = ({ data }: ViewingCompletedSectionProps) => {
  if (data.length === 0) {
    return <ViewingEmptyMessage message="완료된 뷰잉이 없어요" />;
  }

  return (
    <ul className="flex flex-col gap-4">
      {data.map(item => {
        return (
          <li key={item.id}>
            <ViewingManageCard
              id={item.id}
              propertyId={item.propertyId}
              status="COMPLETED"
              profileImageUrl={item.profileImageUrl}
              roomImageUrl={item.roomImageUrl}
              nickname={item.nickname}
              meetingDay={item.meetingDay}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ViewingCompletedSection;
