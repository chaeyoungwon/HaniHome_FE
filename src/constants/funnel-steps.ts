export const FUNNEL_FLOW = [
  { step: "listingType" },
  {
    step: "addressPhoto",
    subSteps: ["address", "photo"],
  },
  { step: "listingDetails" },
  { step: "movingConditions" },
  { step: "contractTerms" },
  { step: "listingDescription" },
  { step: "createConfirm" },
  { step: "createSuccess" },
] as const;

export const FUNNEL_STEPS_LABEL = [
  { key: "addressPhoto", label: "주소와 사진" },
  { key: "listingDetails", label: "매물 상세" },
  { key: "movingConditions", label: "입주 조건" },
  { key: "contractTerms", label: "계약 사항" },
] as const;

export const FUNNEL_STEPS_MAP = [
  { key: "ADDRESS_PHOTO", label: "addressPhoto" },
  { key: "LISTING_DETAILS", label: "listingDetails" },
  { key: "MOVING_CONDITIONS", label: "movingConditions" },
  { key: "CONTRACT_TERMS", label: "contractTerms" },
  { key: "LISTING_DESCRIPTION", label: "listingDescription" },
  { key: "CREATE_CONFIRM", label: "createConfirm" },
] as const;
