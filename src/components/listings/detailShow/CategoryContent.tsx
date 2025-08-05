"use client";

import React from "react";

import {
  formatAdditionalInfo,
  formatAddress,
  formatCapcityPeople,
  formatCosts,
  formatFurniture,
  formatGenderPreference,
  formatHighlights,
  formatInternalDetails,
  formatIsBrokered,
  formatKind,
  formatLivingConditions,
  formatMoveInDates,
  formatPropertySubType,
} from "@/utils/formatter/detailFormatter";

import {
  CapacityRent,
  CapacityShare,
  MoveInInfo,
  PropertyDetail,
  PropertyRegion,
  PropertySuperType,
  RentInternalDetails,
  RentPropertySubType,
  ShareInternalDetails,
  SharePropertySubType,
} from "@/types/listingDetailPost";

interface CategoryContentProps {
  keyName: string;
  value: string | number | boolean | object | null | undefined;
  listingData: PropertyDetail;
}

const CategoryContent = ({
  keyName,
  value,
  listingData,
}: CategoryContentProps) => {
  const baseClass = "text-body2-med w-[319px] text-right text-gray-600";

  switch (keyName) {
    case "kind":
      return (
        <div className={baseClass}>
          {formatKind(value as PropertySuperType)}
        </div>
      );
    case "region":
      return (
        <div className={baseClass}>
          {formatAddress(value as PropertyRegion)}
        </div>
      );

    case "sharePropertySubType":
    case "rentPropertySubType":
      return (
        <div className={baseClass}>
          {formatPropertySubType(
            value as SharePropertySubType | RentPropertySubType,
            listingData.kind,
          )}
        </div>
      );

    case "capacityPeople":
      return (
        <div className={baseClass}>
          {formatCapcityPeople(
            value as CapacityRent | CapacityShare,
            listingData.kind,
          )}
        </div>
      );

    case "internalDetails":
      return (
        <div className={baseClass}>
          {formatInternalDetails(
            value as ShareInternalDetails | RentInternalDetails,
            listingData.kind,
          )}
        </div>
      );
    case "highlights":
      return (
        <div className={baseClass}>
          {formatHighlights(value as number[]) || "(-)"}
        </div>
      );
    case "furniture":
      return (
        <div className={baseClass}>
          {formatFurniture(value as number[]) || "(-)"}
        </div>
      );
    case "isBrokered":
      return (
        <div className={baseClass}>
          {formatIsBrokered(value as number[]) || "(-)"}
        </div>
      );
    case "genderPreference":
      return (
        <div className={baseClass}>
          {formatGenderPreference(
            value as PropertyDetail["genderPreference"],
            value as PropertyDetail["lgbtAvailable"],
          )}
        </div>
      );
    case "additionalInfo":
      return (
        <div className={baseClass}>
          {formatAdditionalInfo(value as number[])}
        </div>
      );
    case "moveInInfo":
      return (
        <div className={baseClass}>
          {formatMoveInDates(value as MoveInInfo)}
        </div>
      );

    case "costDetails": {
      const { costDetails, includedItems } = value as {
        costDetails: PropertyDetail["costDetails"];
        includedItems: number[];
      };

      return (
        <div className={baseClass}>
          {formatCosts(costDetails, includedItems)}
        </div>
      );
    }
    case "livingConditions":
      return (
        <div className={baseClass}>
          {formatLivingConditions(value as PropertyDetail["livingConditions"])}
        </div>
      );
    default:
      return typeof value === "string" ? (
        <div className={baseClass}>{value}</div>
      ) : (
        <div className={baseClass}>N/A</div>
      );
  }
};

export default CategoryContent;
