import { ViewingPropertyItem } from "@/types/viewing";

import ViewingEmptyMessage from "./ViewingEmptyMessage";
import ViewingManageCard from "./ViewingManageCard";

interface ViewingCompletedSectionProps {
  data: ViewingPropertyItem[];
}

const ViewingCompletedSection = ({ data }: ViewingCompletedSectionProps) => {
  if (data.length === 0) {
    return <ViewingEmptyMessage message="완료된 뷰잉이 없어요" />;
  }

  return (
    <ul className="mt-4 flex flex-col gap-4">
      {data.map(item => {
        return (
          <li key={item.id}>
            <ViewingManageCard
              id={item.id}
              viewingItem={item}
              status="COMPLETED"
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ViewingCompletedSection;
