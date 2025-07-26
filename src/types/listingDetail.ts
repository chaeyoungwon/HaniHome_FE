export type PropertySuperType = "RENT" | "SHARE";

export type GenderPreference = "ANY" | "MALE_ONLY" | "FEMALE_ONLY" | "COUPLE";

export type ParkingOption = "NONE" | "STREET_PARKING" | "RESERVED_SPACE";

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

export interface Furniture {
  [subCategory: string]: string[];
}

export interface AdditionalInfo {
  smokingAllowed: boolean | null;
  petsAllowed: boolean | null;
  visitorsAllowed: boolean | null;
  parking: string[]; // 주차 옵션 목록
  kitchenAccess: boolean | null;
}

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
  isImmediate: boolean;
  isNegotiable: boolean;
}

export interface TimeSlot {
  timeFrom: string;
  timeTo: string;
}

export interface InternalDetailsBase {
  internalArea: number;
  totalArea: number;
  totalFloors: number;
  propertyFloor: number;
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
  parkingOption: ParkingOption;
  meetingDateFrom: string;
  meetingDateTo: string;
  timeSlots: TimeSlot[];
  viewingAlwaysAvailable: boolean;
  description: string;
}

// --- SHARE 전용 ---
export interface ShareInternalDetails extends InternalDetailsBase {
  totalResidents: number; //총거주
  totalBathUser: number; //욕실쉐어자수
}

export interface SharePropertyDetail extends PropertyBase {
  jsonDiscriminator: "SHARE";
  sharePropertySubType: SharePropertySubType;
  internalDetails: ShareInternalDetails;
  capacityShare: CapacityShare;
}

// --- RENT 전용 ---
export interface RentInternalDetails extends InternalDetailsBase {
  numberOfRoom: number;
  numberOfBath: number;
}

export interface RentPropertyDetail extends PropertyBase {
  jsonDiscriminator: "RENT";
  rentPropertySubType: RentPropertySubType;
  internalDetails: RentInternalDetails;
  capacityRent: CapacityRent;
}

export type PropertyDetail = SharePropertyDetail | RentPropertyDetail;
