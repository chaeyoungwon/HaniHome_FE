import {
  CAPACITY_RENT_MAP,
  CAPACITY_SHARE_MAP,
} from "@/constants/capacity-options";
import { GENDER_PREFERENCE_MAP } from "@/constants/gender-options";
import {
  HOUSE_TYPES,
  RENT_TYPE_MAP,
  SHARE_TYPE_MAP,
} from "@/constants/housing-options";
import { CATEGORY_OPTIONS } from "@/constants/property-category";

import {
  CapacityRent,
  CapacityShare,
  CostDetails,
  GenderPreference,
  LivingConditions,
  MoveInInfo,
  PropertyRegion,
  PropertySuperType,
  RentInternalDetails,
  RentPropertySubType,
  ShareInternalDetails,
  SharePropertySubType,
} from "@/types/listingDetailPost";

import { formatDateToMonthDay } from "./dateFormatter";

export const formatKind = (propertyKind: PropertySuperType) => {
  if (!propertyKind) return "N/A";

  return propertyKind === "SHARE" ? HOUSE_TYPES[0] : HOUSE_TYPES[1];
};
export const formatAddress = (region?: PropertyRegion): string => {
  if (!region) return "N/A";

  const mainAddressParts = [
    region.streetNumber && region.streetName
      ? `${region.streetNumber} ${region.streetName}`
      : null,
    region.suburb && region.state ? `${region.suburb} ${region.state}` : null,
  ];

  const detailParts = [
    region.buildingName || null,
    region.unit ? `Unit ${region.unit}` : null,
  ];

  return [
    ...mainAddressParts.filter(Boolean),
    detailParts.filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(", ");
};
export const formatPropertySubType = (
  subType: SharePropertySubType | RentPropertySubType,
  kind: "SHARE" | "RENT",
) => {
  if (!subType) return "N/A";
  return kind === "SHARE"
    ? SHARE_TYPE_MAP[subType as SharePropertySubType]
    : RENT_TYPE_MAP[subType as RentPropertySubType];
};

export const formatCapcityPeople = (
  capcityPeople: CapacityRent | CapacityShare,
  kind: "RENT" | "SHARE",
) => {
  if (!capcityPeople) return "N/A";

  return kind === "RENT"
    ? CAPACITY_RENT_MAP[capcityPeople as CapacityRent]
    : CAPACITY_SHARE_MAP[capcityPeople as CapacityShare];
};

export function formatFurniture(optionItemIds: number[]): string {
  if (!optionItemIds?.length) return "";
  const furnitureGroups = CATEGORY_OPTIONS[2].items;
  const grouped: Record<string, string[]> = {};

  Object.entries(furnitureGroups).forEach(([key, items]) => {
    items.forEach(item => {
      if (optionItemIds.includes(item.optionId)) {
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(item.label);
      }
    });
  });

  return Object.entries(grouped)
    .map(([, labels]) => labels.join(" / "))
    .join(" / ");
}

export const formatInternalDetails = (
  details: ShareInternalDetails | RentInternalDetails | null | undefined,
  kind: "SHARE" | "RENT",
) => {
  if (!details) return <div>N/A</div>;

  const displayValue = (value: number | undefined | null) =>
    value === null || value === undefined ? "(-)" : value;

  return (
    <div className="flex flex-col divide-y divide-gray-100">
      {/* 면적 줄 */}
      <div className="flex items-center justify-end py-2">
        <div className="flex basis-1/2 items-center justify-end gap-2">
          <span>Internal area</span>
          <span className="text-mint">
            {displayValue(details.internalArea)}
          </span>
          <span>m²</span>
        </div>

        <div className="mx-6 h-3 w-px bg-gray-200" />

        <div className="flex basis-1/2 items-center justify-end gap-2">
          <span>Total area</span>
          <span className="text-mint">{displayValue(details.totalArea)}</span>
          <span>m²</span>
        </div>
      </div>
      {/* 방개수 / 욕실 개수 */}
      {kind === "RENT" ? (
        <>
          <div className="flex items-center justify-end py-2">
            <div className="flex basis-1/2 items-center justify-end gap-2">
              <span>방 개수</span>
              <span className="text-mint">
                {displayValue((details as RentInternalDetails).numberOfRoom)}
              </span>
              <span>개</span>
            </div>
            <div className="mx-6 h-3 w-px bg-gray-200" />
            <div className="flex basis-1/2 items-center justify-end gap-2">
              <span>욕실 개수</span>
              <span className="text-mint">
                {displayValue((details as RentInternalDetails).numberOfBath)}
              </span>
              <span>개</span>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* 총거주 / 욕실 줄 */}
          <div className="flex items-center justify-end py-2">
            <div className="flex basis-1/2 items-center justify-end gap-2">
              <span>총 거주</span>
              <span className="text-mint">
                {displayValue((details as ShareInternalDetails).totalResidents)}
              </span>
              <span>명</span>
            </div>
            <div className="mx-6 h-3 w-px bg-gray-200" />
            <div className="flex basis-1/2 items-center justify-end gap-2">
              <span>욕실 쉐어자수</span>
              <span className="text-mint">
                {displayValue((details as ShareInternalDetails).totalBathUser)}
              </span>
              <span>명</span>
            </div>
          </div>
        </>
      )}

      {/* 건물층 / 해당층 줄 */}
      <div className="flex items-center justify-end py-2">
        <div className="flex basis-1/2 items-center justify-end gap-2">
          <span>건물 전체 층</span>
          <span className="text-mint">{displayValue(details.totalFloors)}</span>
          <span>층</span>
        </div>
        <div className="mx-6 h-3 w-px bg-gray-200" />
        <div className="flex basis-1/2 items-center justify-end gap-2">
          <span>해당 층</span>
          <span className="text-mint">
            {displayValue(details.propertyFloor)}
          </span>
          <span>층</span>
        </div>
      </div>
    </div>
  );
};

export function formatIsBrokered(optionItemIds: number[]): string {
  if (!optionItemIds?.length) return "";
  const items = CATEGORY_OPTIONS[5].items;
  const label = items.find(opt => optionItemIds.includes(opt.optionId))?.label;
  return label || "";
}

export function formatHighlights(optionItemIds: number[]): string {
  if (!optionItemIds?.length) return "";
  const highlightOptions = CATEGORY_OPTIONS[1].items;
  const labels = optionItemIds
    .map(id => highlightOptions.find(opt => opt.optionId === id)?.label)
    .filter(Boolean);
  return labels.join(" / ");
}

export const formatGenderPreference = (
  genderPreference: GenderPreference | null | undefined,
  lgbtAvailable: boolean | null | undefined,
): string => {
  if (!genderPreference) return "N/A";

  const base = GENDER_PREFERENCE_MAP[genderPreference] ?? "무관";

  return lgbtAvailable ? `${base} (LGBTQ 가능)` : base;
};

export const formatLivingConditions = (
  livingConditions: LivingConditions | null | undefined,
) => {
  if (!livingConditions) return <div>N/A</div>;
  return (
    <div className="flex flex-col divide-y divide-gray-100">
      <div className="flex items-center justify-end py-2">
        <div className="flex basis-1/2 items-center justify-end gap-2">
          <span>노티스</span>
          <span className="text-mint">
            {livingConditions.noticePeriodWeeks}
          </span>
          <span>주</span>
        </div>
        <div className="mx-6 h-3 w-px bg-gray-200" />
        <div className="flex basis-1/2 items-center justify-end gap-2">
          <span>최소거주기간</span>
          <span className="text-mint">{livingConditions.minimumStayWeeks}</span>
          <span>주</span>
        </div>
      </div>
      <div className="flex items-center justify-end py-2">
        <div className="flex basis-1/2 items-center justify-end gap-2">
          {livingConditions.contractTerms}
        </div>
      </div>
    </div>
  );
};

export const formatCosts = (
  costs: CostDetails | null | undefined,
  includedItems: number[] | null,
) => {
  if (!costs || !includedItems) return "N/A";

  const includedLabels =
    CATEGORY_OPTIONS[4]?.items
      ?.filter(item => includedItems.includes(item.optionId))
      .map(item => item.label) ?? [];

  return (
    <div className="flex flex-col divide-y divide-gray-100">
      {/* 주차 비용 */}
      <div className="flex items-center justify-end gap-2 py-2">
        <span>{costs.billIncluded ? "빌 포함" : "빌 미포함"}</span>
        <span className="text-mint">{costs.weeklyCost}</span>
        <span>주/$</span>
      </div>
      {/* 포함 항목 */}
      {includedItems.length > 0 && (
        <div className="flex items-center justify-end py-2">
          {includedLabels.join(", ")}
        </div>
      )}
      {/* 디파짓 */}
      <div className="flex items-center justify-end gap-2 py-2">
        <span>디파짓</span> <span className="text-mint">{costs.deposit}</span>
        <span>주/$</span>
      </div>
    </div>
  );
};

export const formatMoveInDates = (
  moveInInfo: MoveInInfo | undefined | null,
) => {
  if (!moveInInfo) return <div>N/A</div>;
  const moveInText =
    moveInInfo.immediate && moveInInfo.negotiable
      ? "즉시 입주 가능, 협의 가능"
      : moveInInfo.immediate
        ? "즉시 입주 가능"
        : moveInInfo.negotiable
          ? "협의 가능"
          : "";

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-end py-2">
        <div className="flex items-center justify-end gap-2">
          <span>입주 가능일</span>
          <span className="text-mint">
            {formatDateToMonthDay(moveInInfo.availableFrom)} ~{" "}
            {formatDateToMonthDay(moveInInfo.availableTo)}
          </span>
        </div>
      </div>
      {(moveInInfo.immediate || moveInInfo.negotiable) && (
        <div className="flex items-center justify-end py-2">{moveInText}</div>
      )}
    </div>
  );
};

export function formatAdditionalInfo(optionItemIds: number[]): string {
  if (!optionItemIds?.length) return "";
  const additionalInfoGroups = CATEGORY_OPTIONS[3].items;
  const result: string[] = [];

  Object.entries(additionalInfoGroups).forEach(([key, items]) => {
    items.forEach(item => {
      if (optionItemIds.includes(item.optionId)) {
        result.push(`${key} ${item.label}`);
      }
    });
  });

  return result.join(" / ");
}
