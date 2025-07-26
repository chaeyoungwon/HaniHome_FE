export const PARRKING_OPTIONS_MAP = {
  NONE: "불가능",
  STREET_PARKING: "노상주차",
  RESERVED_SPACE: "전용공간",
} as const;

export const PARKING_OPTIONID_MAP: Record<number, string> = {
  41: "전용공간 있음",
  42: "Street Parking 가능",
  43: "주차 불가능",
};
