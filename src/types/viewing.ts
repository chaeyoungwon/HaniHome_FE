import { SummaryProperty } from "./property";

// 뷰잉 상태
export type ViewingStatus = "REQUESTED" | "CANCELLED" | "COMPLETED";

// 뷰잉 조회 뷰 타입 (API 요청 시 view 파라미터)
export type ViewingViewType =
  | "DEFAULT"
  | "DATE_PROFILE"
  | "DATE_WITH_PROPERTY"
  | "BELONGS_TO_PROPERTY";

// 기본 뷰잉 아이템
export interface ViewingItem {
  id: number;
  guestId: number;
  hostId: number;
  propertyId: number;
  meetingDay: string;
  status: ViewingStatus;
  cancelReason: string | null;
  photoUrls: string[];
  memo: string | null;
  optionItemNames: string[];
}

// 카드형 뷰잉 데이터 (UI 표시용)
export interface ViewingCardItem extends ViewingItem {
  userType: "host" | "guest";
  nickname: string;
}

// availableAPI 가능한 시간 데이터
export interface ViewingTime {
  time: string;
  reserved: boolean;
}

// 내 뷰잉 날짜 데이터 (중복 체크용)
export type MyViewingDates = Record<string, string[]>;

// DATE_PROFILE 조회시 응답 타입
export type MyViewingDateProfile = {
  id: number;
  meetingDay: string;
  propertyThumbnailUrl: string | null;
  counterpartImageUrl: string | null;
};

// DATE_WITH_PROPERTY 조회시 응답 타입
export interface ViewingPropertyItem {
  id: number;
  meetingDay: string;
  property: SummaryProperty;
  counterpartNickname: string | null;
  canSeeViewingDetail: boolean;
}
