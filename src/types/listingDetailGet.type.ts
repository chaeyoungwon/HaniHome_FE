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

export interface OptionItem {
  optionItemId: number;
  itemName: string;
  isActive: boolean;
  isCustom: boolean;
  categoryId: number;
  categoryName: string;
  parentItemId: number | null;
}

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
  billIncluded: boolean;
  depositAdjustable: boolean;
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
  timeFrom: string;
  timeTo: string;
}

export interface ShareInternalDetails {
  internalArea: number;
  totalArea: number;
  totalResidents: number;
  totalBathUser: number;
  totalFloors: number;
  propertyFloor: number;
  withPropertyOwner: boolean;
}

export interface RentInternalDetails {
  internalArea: number;
  totalArea: number;
  numberOfRoom: number;
  numberOfBath: number;
  totalFloors: number;
  propertyFloor: number;
  yardIncluded: boolean;
  verandaIncluded: boolean;
}

export interface ShareProperty {
  id: number;
  kind: "SHARE";
  sharePropertySubType: SharePropertySubType;
  displayStatus: string;
  tradeStatus: string;
  wishCount: number;
  createdAt: string;
  lastModifiedAt: string;
  memberId: number;
  optionItems: OptionItem[];
  genderPreference: GenderPreference;
  lgbtAvailable: boolean;
  region: PropertyRegion;
  photoUrls: string[];
  thumbnailUrl: string | null;
  costDetails: CostDetails;
  livingConditions: LivingConditions;
  moveInInfo: MoveInInfo;
  description: string;
  internalDetails: ShareInternalDetails;
  capacityShare: CapacityShare;
  hostSummary: {
    id: number;
    profileImage: string;
    nickname: string;
    verified: boolean;
  };
  metaInfo: {
    owner: boolean;
    wished: boolean;
  };
}

export interface RentProperty {
  id: number;
  kind: "RENT";
  rentPropertySubType: RentPropertySubType;
  displayStatus: string;
  tradeStatus: string;
  wishCount: number;
  createdAt: string;
  lastModifiedAt: string;
  memberId: number;
  optionItems: OptionItem[];
  genderPreference: GenderPreference;
  lgbtAvailable: boolean;
  region: PropertyRegion;
  photoUrls: string[];
  thumbnailUrl: string | null;
  costDetails: CostDetails;
  livingConditions: LivingConditions;
  moveInInfo: MoveInInfo;
  description: string;
  internalDetails: RentInternalDetails;
  capacityRent: CapacityRent;
  hostSummary: {
    id: number;
    profileImage: string;
    nickname: string;
    verified: boolean;
  };
  metaInfo: {
    owner: boolean;
    wished: boolean;
  };
}

export type PropertyDetail = ShareProperty | RentProperty;
