export type PropertySuperType = "RENT" | "SHARE";

export type GenderPreference = "ANY" | "MALE_ONLY" | "FEMALE_ONLY" | "COUPLE";

export type SharePropertySubType =
  | "SECOND_ROOM"
  | "MASTER_ROOM"
  | "LIVING_SHARE";

export type RentPropertySubType =
  | "HOUSE"
  | "APARTMENT"
  | "UNIT"
  | "STUDIO"
  | "TOWN_HOUSE"
  | "GRANNY_FLAT";

export type CapacityShare = "SINGLE" | "DOUBLE" | "TRIPLE" | "OTHER";

export type CapacityRent = "ONE" | "TWO" | "THREE" | "FOUR" | "OTHER";

// --- 공통 타입 ---
export interface PropertyRegion {
  country: string;
  postCode: string;
  state: string;
  suburb: string;
  streetName: string;
  streetNumber: string;
  unit: string;
  buildingName: string;
  longitude: number;
  latitude: number;
}

export interface CostDetails {
  weeklyCost: number;
  costDescription: string;
  deposit: number;
  keyDeposit: number;
  depositAdjustable: boolean;
  billIncluded: boolean;
}

export interface LivingConditions {
  noticePeriodWeeks: number;
  minimumStayWeeks: number;
  contractTerms: string;
  contractExtendable: boolean;
}

export interface MoveInInfo {
  availableFrom: string;
  availableTo: string;
  immediate: boolean;
  negotiable: boolean;
}

export interface TimeSlot {
  timeFrom: string | null;
  timeTo: string | null;
}

export interface InternalDetailsBase {
  internalArea: number | null;
  totalArea: number | null;
  totalFloors: number | null;
  propertyFloor: number | null;
}

// --- 공통 베이스 ---
interface PropertyBase {
  jsonDiscriminator: PropertySuperType;
  memberId: number;
  kind: PropertySuperType;
  genderPreference: GenderPreference;
  lgbtAvailable: boolean;
  region: PropertyRegion;
  photoUrls: string[];
  thumbnailUrl: string | null;
  costDetails: CostDetails;
  optionItemIds: number[];
  livingConditions: LivingConditions;
  moveInInfo: MoveInInfo;
  meetingDateFrom: string | null;
  meetingDateTo: string | null;
  timeSlots: TimeSlot[];
  viewingAlwaysAvailable: boolean;
  description: string;
}

// --- SHARE 전용 ---
export interface ShareInternalDetails extends InternalDetailsBase {
  totalResidents: number | null;
  totalBathUser: number | null;
  withPropertyOwner: boolean;
}

export interface SharePropertyDetail extends PropertyBase {
  jsonDiscriminator: "SHARE";
  sharePropertySubType: SharePropertySubType | null;
  internalDetails: ShareInternalDetails | null;
  capacityShare: CapacityShare | null;
}

// --- RENT 전용 ---
export interface RentInternalDetails extends InternalDetailsBase {
  numberOfRoom: number | null;
  numberOfBath: number | null;
  yardIncluded: boolean;
  verandaIncluded: boolean;
}

export interface RentPropertyDetail extends PropertyBase {
  jsonDiscriminator: "RENT";
  rentPropertySubType: RentPropertySubType | null;
  internalDetails: RentInternalDetails | null;
  capacityRent: CapacityRent | null;
}

export type PropertyDetail = SharePropertyDetail | RentPropertyDetail;
