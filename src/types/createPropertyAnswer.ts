export interface CostDetailsOptions {
  weeklyCost: {
    label: string;
    value: string;
  };
  includedItems: {
    label: string;
    value: string[];
  };
  billDescription: {
    label: string;
    value: string;
  };
  deposit: {
    label: string;
    value: string;
  };
  keyDeposit: {
    label: string;
    value: string;
  };
}

export interface MeetingTimeOptions {
  meetingDateFrom: {
    label: string;
    value: string | null;
  };
  meetingDateTo: {
    label: string;
    value: string | null;
  };
}

export interface AvailabilityOptions {
  availableFrom: string | null;
  availableTo: string | null;
  immediate: boolean;
  negotiable: boolean;
}
export type AnswerValue =
  | string
  | string[]
  | CostDetailsOptions
  | MeetingTimeOptions
  | AvailabilityOptions
  | Record<string, string | string[]>;
