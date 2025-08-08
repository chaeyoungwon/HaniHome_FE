import AvailableDatePicker from "@/components/home/filter/AvailableDatePicker";

import { MoveInInfo } from "@/types/listingDetailPost.type";

interface MoveInfoContentProps {
  value: MoveInInfo | null;
  onSelect: (value: MoveInInfo) => void;
}

const MoveInfoContent = ({ value, onSelect }: MoveInfoContentProps) => {
  if (!value) return null;
  const handleDateChange = (from: string, to: string) => {
    // from과 to 날짜를 비교하여 더 빠른 날짜와 늦은 날짜를 교환
    if (new Date(from) > new Date(to)) {
      [from, to] = [to, from]; // 교환
    }

    onSelect({
      ...value,
      availableFrom: from,
      availableTo: to,
    });
  };

  const toggleImmediate = () =>
    onSelect({
      ...value,
      immediate: !value.immediate,
    });

  const toggleNegotiable = () =>
    onSelect({
      ...value,
      negotiable: !value.negotiable,
    });

  return (
    <AvailableDatePicker
      availableFrom={value.availableFrom}
      availableTo={value.availableTo}
      immediate={value.immediate}
      negotiable={value.negotiable}
      onDateChange={handleDateChange}
      onImmediateToggle={toggleImmediate}
      onNegotiableToggle={toggleNegotiable}
    />
  );
};
export default MoveInfoContent;
