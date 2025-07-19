import { PropertyRegion } from "@/types/listingDetail";

export const formatAddress = (region: PropertyRegion): string => {
  const { streetNumber, streetName, suburb, state, postCode } = region;

  return [
    [streetNumber, streetName].filter(Boolean).join(" "),
    [suburb, state].filter(Boolean).join(" "),
    postCode,
  ]
    .filter(Boolean)
    .join(", ");
};
