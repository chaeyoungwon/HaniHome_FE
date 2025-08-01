// 공통 지역 정보 타입
export interface Region {
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

// 공통 옵션 아이템
export interface OptionItem {
  optionItemId: number;
  itemName: string;
  isActive: boolean;
  isCustom: boolean;
  categoryId: number;
  categoryName: string;
  parentItemId: number | null;
}

// 공통 비용 정보
export interface CostDetails {
  weeklyCost: number;
  costDescription: string;
  deposit: number;
  keyDeposit: number;
  depositAdjustable: boolean;
  billIncluded: boolean;
}

// 공통 거주 조건
export interface LivingConditions {
  noticePeriodWeeks: number;
  minimumStayWeeks: number;
  contractTerms: string;
  contractExtendable: boolean;
}

// 공통 입주 가능 정보
export interface MoveInInfo {
  availableFrom: string;
  availableTo: string;
  immediate: boolean;
  negotiable: boolean;
}

// 쉐어 매물 전용 내부 정보
interface InternalDetailsForShare {
  internalArea: number;
  totalArea: number;
  totalResidents: number;
  totalBathUser: number;
  totalFloors: number;
  propertyFloor: number;
}

// 렌트 매물 전용 내부 정보
interface InternalDetailsForRent {
  internalArea: number;
  totalArea: number;
  numberOfRoom: number;
  numberOfBath: number;
  totalFloors: number;
  propertyFloors: number;
}

interface HostSummary {
  id: number;
  profileImage: string;
  nickname: string;
  verified: boolean;
}

interface MetaInfo {
  owner: boolean;
  wished: boolean;
}

// 공통 매물 베이스 타입
interface BaseProperty {
  id: number;
  memberId: number;
  createdAt: string;
  lastModifiedAt: string;
  optionItems: OptionItem[];
  displayStatus: string;
  tradeStatus: string;
  genderPreference: string;
  lgbtAvailable: boolean;
  region: Region;
  photoUrls: string[];
  thumbnailUrl: string | null;
  costDetails: CostDetails;
  livingConditions: LivingConditions;
  moveInInfo: MoveInInfo;
  parkingOption: string;
  description: string;
  wishCount: number;
  metaInfo?: MetaInfo;
  hostSummary?: HostSummary;
}

// 쉐어 매물 타입
export interface ShareProperty extends BaseProperty {
  kind: "SHARE";
  sharePropertySubType: string;
  internalDetails: InternalDetailsForShare;
  capacityShare: string;
}

// 렌트 매물 타입
export interface RentProperty extends BaseProperty {
  kind: "RENT";
  rentPropertySubType: string;
  internalDetails: InternalDetailsForRent;
  capacityRent: string;
  isRealEstateIntervention: string;
  exposure: string;
}

// 전체 매물 유니언 타입
export type Property = ShareProperty | RentProperty;

// 매물 필터링 파라미터
export interface FilteredPropertyParams {
  kinds: ("SHARE" | "RENT")[];
  sharePropertySubTypes?: string[];
  rentPropertySubTypes?: string[];
  minWeeklyCost?: number;
  maxWeeklyCost?: number;
  billIncluded?: boolean;
  availableFrom?: string;
  availableTo?: string;
  immediate?: boolean;
  negotiable?: boolean;
  metroStopLatitude?: number;
  metroStopLongitude?: number;
  radiusKm?: number;
  suburb: string;
}

// 매물 조회 뷰 타입
export type PropertyViewType = "DEFAULT" | "SUMMARY";

// SUMMARY 뷰에서 사용하는 요약 매물 타입
export interface SummaryProperty {
  id: number;
  weeklyCost: number;
  suburb: string;
  internalArea: number;
  totalFloors: number;
  kind: "SHARE" | "RENT";
  propertySubType: string;
  billIncluded: boolean;
  createdAt: string;
  thumbnailUrl: string | null;
  tradeStatus: string;
  wishCount: number;
  nearestStation: NearestStation;
  metaInfo: {
    owner: boolean;
    wished: boolean;
  };
}

export interface NearestStation {
  metroStopId: number;
  name: string;
  distanceFromStation: number;
}

// 상세 매물 타입
export type FullProperty = ShareProperty | RentProperty;

// 내놓은 매물 쿼리 파라미터 타입
export interface MyPropertiesParams {
  view: "SUMMARY" | "DEFAULT";
  tradeStatus?: "BEFORE" | "IN_PROGRESS" | "COMPLETED";
  displayStatus?: "ACTIVE" | "INACTIVE";
}

// 매물 상세 에러 처리
export interface PropertyErrorResponse {
  serviceCode: string;
  message: string;
  data: {
    statusCode: number;
    message: string;
    codeName: string;
  };
  success: boolean;
}
