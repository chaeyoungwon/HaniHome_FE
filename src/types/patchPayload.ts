import {
  CapacityRent,
  CapacityShare,
  GenderPreference,
  LivingConditions,
  MoveInInfo,
  RentInternalDetails,
  RentPropertySubType,
  ShareInternalDetails,
  SharePropertySubType,
} from "@/types/listingDetailPost";

export type PatchPayload =
  | {
      jsonDiscriminator: "RENT";
      rentPropertySubType?: RentPropertySubType;
      capacityRent?: CapacityRent;
      internalDetails?: RentInternalDetails;
      genderPreference?: GenderPreference;
      lgbtAvailable?: boolean;
      livingConditions?: LivingConditions;
      moveInInfo?: MoveInInfo;
      optionItemIds?: number[];
    }
  | {
      jsonDiscriminator: "SHARE";
      sharePropertySubType?: SharePropertySubType;
      capacityShare?: CapacityShare;
      internalDetails?: ShareInternalDetails;
      genderPreference?: GenderPreference;
      lgbtAvailable?: boolean;
      livingConditions?: LivingConditions;
      moveInInfo?: MoveInInfo;
      optionItemIds?: number[];
    };
