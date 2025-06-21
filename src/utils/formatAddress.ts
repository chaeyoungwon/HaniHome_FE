import { RegionType } from "@/types/listingDetail";

export const formatAddress = (region: RegionType): string => {
  const { streetNumber, streetName, suburb, state, postCode } = region;

  return [
    [streetNumber, streetName].filter(Boolean).join(" "),
    [suburb, state].filter(Boolean).join(" "),
    postCode,
  ]
    .filter(Boolean)
    .join(", ");
};
