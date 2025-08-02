export const CAPACITY_SHARE_MAP = {
  SINGLE: "독방",
  DOUBLE: "2인 1실",
  TRIPLE: "3인 1실",
  OTHER: "n인 1실",
} as const;

export const CAPACITY_RENT_MAP = {
  ONE: "1명",
  TWO: "2명",
  THREE: "3명",
  FOUR: "4명",
  OTHER: "기타 (5명 이상)",
} as const;

// 상세 페이지에서 사용하는 라벨 맵
export const CAPACITY_RENT_LABEL_MAP = {
  ONE: "1인",
  TWO: "2인",
  THREE: "3인",
  FOUR: "4인",
  OTHER: "5인 이상",
} as const;
