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

export const SHARE_TYPE_MAP: Record<string, string> = {
  "마스터 룸": "MASTER_ROOM",
  "거실 쉐어": "LIVING_SHARE",
  "세컨드 룸": "SECOND_ROOM",
};

export const RENT_TYPE_MAP: Record<string, string> = {
  하우스: "HOUSE",
  아파트: "APARTMENT",
  유닛: "UNIT",
  스튜디오: "STUDIO",
  타운하우스: "TOWNHOUSE",
  "그래니 플랫": "GRANNY_FLAT",
};
