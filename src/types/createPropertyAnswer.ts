import {
  CapacityRent,
  CapacityShare,
  CostDetails,
  GenderPreference,
  LivingConditions,
  MoveInInfo,
  RentInternalDetails,
  RentPropertySubType,
  ShareInternalDetails,
  SharePropertySubType,
  TimeSlot,
} from "./listingDetail";

export type MovingConditionsOption =
  | { type: "genderPreference"; value: GenderPreference | null }
  | { type: "optionItemIds"; value: number[] }
  | { type: "moveInInfo"; value: MoveInInfo | null }
  | { type: "livingConditions"; value: LivingConditions | null };

export type ContractTermsOption =
  | {
      type: "costDetails";
      value: CostDetails;
    }
  | {
      type: "meetingTime";
      value: {
        meetingDateFrom: string | null;
        meetingDateTo: string | null;
        viewingAlwaysAvailable: boolean | null;
      };
    }
  | {
      type: "timeSlots";
      value: TimeSlot[];
    }
  | { type: "optionItemIds"; value: number[] };

export type ListingDetailsOption =
  | { type: "propertyType"; value: RentPropertySubType | SharePropertySubType }
  | { type: "capacityPeople"; value: CapacityRent | CapacityShare }
  | { type: "highlights"; value: number[] }
  | { type: "furniture"; value: number[] }
  | { type: "isBrokered"; value: number }
  | {
      type: "internalDetails";
      value: ShareInternalDetails | RentInternalDetails;
    };
