export interface ViewingItem {
  id: number;
  memberId: number;
  propertyId: number;
  meetingDay: string;
  status: "REQUESTED" | "CANCELLED" | "COMPLETED";
  cancelReason: string | null;
  photoUrls: string[];
  memo: string | null;
  optionItemNames: string[];
}

export interface ViewingCardItem extends ViewingItem {
  userType: "host" | "guest";
  profileImageUrl: string;
  roomImageUrl: string;
  nickname: string;
}

export type ViewingViewType = "DEFAULT" | "DATE_PROFILE" | "DATE_WITH_PROPERTY";
