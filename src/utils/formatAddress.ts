import { PropertyRegion } from "@/types/listingDetail";

export const formatAddress = (region: PropertyRegion): string => {
  const {
    streetNumber,
    streetName,
    suburb,
    state,
    postCode,
    country,
    buildingName,
  } = region;

  return [
    buildingName,
    [streetNumber, streetName].filter(Boolean).join(" "),
    [suburb, state, postCode].filter(Boolean).join(" "),
    country,
  ]
    .filter(Boolean)
    .join(", ");
};
