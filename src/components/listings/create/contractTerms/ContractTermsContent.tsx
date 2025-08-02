import { useListingStore } from "@/stores/useListingStore";

import { ContractTermsOption } from "@/types/createPropertyAnswer";

import CostDetailField from "./CostDetailField";
import MeetingTimeField from "./MeetingTimeField";
import TimeSlotField from "./TimeSlotField";

interface ContractTermsContentProps {
  id: string;
  value?: ContractTermsOption;
  onSelect: (value: ContractTermsOption) => void;
  optionItemIds: number[];
  onOptionItemIdsChange: (ids: number[]) => void;
}

const ContractTermsContent = ({
  id,
  optionItemIds,
}: ContractTermsContentProps) => {
  const {
    costDetails,
    setAllCostDetails,
    setOptionItemIds,
    meetingDateFrom,
    meetingDateTo,
    setMeetingDateRange,
    viewingAlwaysAvailable,
    setViewingAlwaysAvailable,
    timeSlots,
    setTimeSlots,
  } = useListingStore();
  if (id === "costDetails") {
    return (
      <CostDetailField
        value={costDetails}
        optionItemIds={optionItemIds}
        onCostDetailsChange={setAllCostDetails}
        onOptionItemIdsChange={setOptionItemIds}
      />
    );
  } else if (id === "meetingTime") {
    return (
      <MeetingTimeField
        meetingDateFrom={meetingDateFrom}
        meetingDateTo={meetingDateTo}
        setMeetingDateRange={setMeetingDateRange}
        viewingAlwaysAvailable={viewingAlwaysAvailable}
        setViewingAlwaysAvailable={setViewingAlwaysAvailable}
      />
    );
  } else if (id === "timeSlots") {
    return <TimeSlotField value={timeSlots} onChange={setTimeSlots} />;
  }

  return null;
};

export default ContractTermsContent;
