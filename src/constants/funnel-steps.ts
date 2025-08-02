export const FUNNEL_FLOW = [
  { step: "ListingType" },
  {
    step: "AddressPhoto",
    subSteps: ["address", "photo"],
  },
  { step: "ListingDetails" },
  { step: "MovingConditions" },
  { step: "ContractTerms" },
  { step: "ListingDescription" },
  { step: "CreateConfirm" },
  { step: "CreateSuccess" },
] as const;

export const FUNNEL_STEPS_LABEL = [
  { key: "AddressPhoto", label: "주소와 사진" },
  { key: "ListingDetails", label: "매물 상세" },
  { key: "MovingConditions", label: "입주 조건" },
  { key: "ContractTerms", label: "계약 사항" },
] as const;
