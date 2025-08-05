import { FilteredPropertyParams } from "@/types/property.type";

export const serializePropertyFilters = (params: FilteredPropertyParams) => {
  const searchParams = new URLSearchParams();

  const arrayFields = [
    { key: "kinds", values: params.kinds },
    { key: "sharePropertySubTypes", values: params.sharePropertySubTypes },
    { key: "rentPropertySubTypes", values: params.rentPropertySubTypes },
  ];

  arrayFields.forEach(({ key, values }) => {
    values?.forEach(value => searchParams.append(key, value));
  });

  const singleFields = [
    "minWeeklyCost",
    "maxWeeklyCost",
    "billIncluded",
    "availableFrom",
    "availableTo",
    "immediate",
    "negotiable",
    "metroStopLatitude",
    "metroStopLongitude",
    "radiusKm",
    "suburb",
  ] as const;

  singleFields.forEach(key => {
    const value = params[key];
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams;
};
