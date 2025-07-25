import {
  AnswerValue,
  CostDetailsOptions,
  MeetingTimeOptions,
} from "@/types/createPropertyAnswer";

import CostDetailField from "./CostDetailField";
import MeetingTimeField from "./MeetingTimeField";
import TimeSlotField from "./TimeSlotField";

function isCostDetailsOptions(val: AnswerValue): val is CostDetailsOptions {
  return (
    typeof val === "object" &&
    val !== null &&
    "weeklyCost" in val &&
    "deposit" in val
  );
}

function isMeetingTimeOptions(val: AnswerValue): val is MeetingTimeOptions {
  return (
    typeof val === "object" &&
    val !== null &&
    "meetingDateFrom" in val &&
    "meetingDateTo" in val
  );
}

interface ContractTermsContentProps {
  id: string;
  options: AnswerValue;
  onSelect: (id: string, value: AnswerValue) => void;
}

const ContractTermsContent = ({
  id,
  options,
  onSelect,
}: ContractTermsContentProps) => {
  if (id === "costDetails" && isCostDetailsOptions(options)) {
    return (
      <CostDetailField
        options={options}
        onChange={(field, value) => {
          const updated = {
            ...options,
            [field]: { ...options[field], value },
          };
          onSelect(id, updated);
        }}
      />
    );
  } else if (id === "meetingTime" && isMeetingTimeOptions(options)) {
    return (
      <MeetingTimeField
        meetingDateFrom={options.meetingDateFrom.value}
        meetingDateTo={options.meetingDateTo.value}
        onDateChange={(from, to) => {
          const updated = {
            ...options,
            meetingDateFrom: {
              ...options.meetingDateFrom,
              value: from,
            },
            meetingDateTo: {
              ...options.meetingDateTo,
              value: to,
            },
          };
          onSelect(id, updated);
        }}
      />
    );
  } else if (id === "timeSlots") {
    return <TimeSlotField />;
  }

  return null;
};

export default ContractTermsContent;
