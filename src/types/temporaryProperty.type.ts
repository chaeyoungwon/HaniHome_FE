import {
  CapacityRent,
  CapacityShare,
  GenderPreference,
  PropertyRegion,
  PropertySuperType,
  RentInternalDetails,
  RentPropertySubType,
  ShareInternalDetails,
  SharePropertySubType,
} from "./listingDetailPost.type";

export type FunnelSteps =
  | "ADDRESS_PHOTO"
  | "LISTING_DETAILS"
  | "MOVING_CONDITIONS"
  | "CONTRACT_TERMS"
  | "LISTING_DESCRIPTION"
  | "CREATE_CONFIRM";

export interface TemporaryPropertyId {
  temporaryPropertyId: number;
  createdAt: string;
  status: FunnelSteps;
}

export interface TemporaryCostDetails {
  weeklyCost: number;
  costDescription: string;
  deposit: number;
  keyDeposit: number;
  billIncluded: boolean;
  depositAdjustable: boolean;
}

export interface TemporaryLivingConditions {
  noticePeriodWeeks: number;
  minimumStayWeeks: number;
  contractTerms: string;
  contractExtendable: boolean;
}

export interface TemporaryMoveInInfo {
  availableFrom: string; // ISO datetime
  availableTo: string; // ISO datetime
  immediate: boolean;
  negotiable: boolean;
}

export interface TemporaryTimeSlot {
  timeFrom: string;
  timeTo: string;
}

export interface ViewingAvailableDateTime {
  date: string; // "YYYY-MM-DD"
  time: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  timeInterval: "MINUTE30" | "MINUTE60"; // 가능성에 따라 enum 처리
  reserved: boolean;
}

interface TemporaryPropertyBase {
  jsonDiscriminator: PropertySuperType;
  id?: number;
  status: FunnelSteps;
  kind: PropertySuperType; // "RENT" | "SHARE"
  genderPreference?: GenderPreference | null;
  lgbtAvailable?: boolean | null;
  region: PropertyRegion | null;
  photoUrls: string[] | null;
  costDetails?: TemporaryCostDetails | null;
  optionItemIds?: number[] | null;
  livingConditions?: TemporaryLivingConditions | null;
  moveInInfo?: TemporaryMoveInInfo | null;
  meetingDateFrom?: string | null; //isoDate
  meetingDateTo?: string | null; // isoDate
  timeSlots?: TemporaryTimeSlot[] | null;
  viewingAvailableDateTimes?: ViewingAvailableDateTime[] | null;
  viewingAlwaysAvailable?: boolean | null;
  description?: string | null;
  createdAt?: string | null; // ISO date
  sharePropertySubType?: SharePropertySubType | null;
  capacityShare?: CapacityShare | null;
  rentPropertySubType?: RentPropertySubType | null;
  capacityRent?: CapacityRent | null;
}

export interface ShareTemporaryProperty extends TemporaryPropertyBase {
  internalDetails?: ShareInternalDetails | null;
}

export interface RentTemporaryProperty extends TemporaryPropertyBase {
  internalDetails?: RentInternalDetails | null;
}

export type TemporaryPropertyPost =
  | ShareTemporaryProperty
  | RentTemporaryProperty;
