import Divider from "@/components/common/Divider";
import ViewingScheduleCard from "@/components/reservation/ViewingScheduleCard";

import { Schedule } from "@/types/schedule";

interface ViewingScheduleSectionProps {
  title: string;
  schedules: Schedule[];
  onSelect?: (schedule: Schedule) => void;
  disabled?: boolean;
}

const ViewingScheduleSection = ({
  title,
  schedules,
  onSelect,
  disabled = false,
}: ViewingScheduleSectionProps) => {
  if (schedules.length === 0) return null;

  return (
    <div className="mt-10">
      <span className="text-lab1-sb px-4 py-3 text-gray-600">{title}</span>
      {schedules.map((s, i) => {
        if (s.date === null) return null;

        return (
          <div key={i}>
            <ViewingScheduleCard
              date={s.date}
              time={s.time}
              onClick={!disabled ? () => onSelect?.(s) : undefined}
              disabled={disabled}
            />
            {i < schedules.length - 1 && <Divider className="my-1" />}
          </div>
        );
      })}
    </div>
  );
};

export default ViewingScheduleSection;
