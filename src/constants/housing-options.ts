export const ROOM_TYPES = [
  "하우스",
  "아파트",
  "유닛",
  "스튜디오",
  "타운하우스",
  "그래니 플랫",
  "마스터 룸",
  "거실 쉐어",
  "세컨드 룸",
];

export const SHARE_ONLY_ROOM_TYPES = ["마스터 룸", "거실 쉐어", "세컨드 룸"];

export const HOUSE_TYPES = ["쉐어", "렌트"] as const;

export const SHARE_TYPE_MAP = {
  SECOND_ROOM: "세컨드 룸",
  MASTER_ROOM: "마스터 룸",
  LIVING_SHARE: "거실 쉐어",
} as const;

export const RENT_TYPE_MAP = {
  HOUSE: "하우스",
  APARTMENT: "아파트",
  UNIT: "유닛",
  GRANNY_FLAT: "그래니플랫",
  STUDIO: "스튜디오",
  TOWN_HOUSE: "타운하우스",
} as const;
