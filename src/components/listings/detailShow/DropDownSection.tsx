"use client";

import { useParams, useRouter } from "next/navigation";

import { useState } from "react";

import Divider from "@/components/common/Divider";

import {
  CategoryItem,
  commonDetailCategories,
  rentDetailCategories,
  shareDetailCategories,
} from "@/constants/listing-detail-categories";

import {
  PropertyDetail,
  RentPropertyDetail,
  SharePropertyDetail,
} from "@/types/listingDetailPost.type";

import DownArrow from "@/public/svgs/common/down-arrow.svg";

import CategoryContent from "./CategoryContent";

interface DropDownSectionProps {
  listingData: PropertyDetail;
  originalData?: PropertyDetail; //edit모드에서 사용되는 변경되는 값
  setListingData?: (next: PropertyDetail) => void;
  edit?: boolean;
}

const DropDownSection = ({
  listingData,
  edit = false,
}: DropDownSectionProps) => {
  const [openCategoryKeys, setOpenCategoryKeys] = useState<Set<string>>(
    new Set(),
  );
  const router = useRouter();
  const { id } = useParams();

  const handleItemClick = (key: string) => {
    switch (key) {
      case "region":
        return router.push(`/listings/${id}/edit/addressPhoto?subStep=address`);
      case "sharePropertySubType":
      case "rentPropertySubType":
        return router.push(
          `/listings/${id}/edit/listingDetails?open=propertyType`,
        );
      case "internalDetails":
      case "capacityPeople":
      case "furniture":
      case "highlights":
      case "isBrokered":
        return router.push(`/listings/${id}/edit/listingDetails?open=${key}`);
      case "genderPreference":
      case "livingConditions":
      case "moveInInfo":
      case "additionalInfo":
        return router.push(`/listings/${id}/edit/movingConditions?open=${key}`);
      case "costDetails":
        return router.push(`/listings/${id}/edit/contractTerms?open=${key}`);
      case "kind":
        alert("매물종류 수정 불가");
    }
  };

  const handleToggle = (key: string) => {
    setOpenCategoryKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key); // 다시 누르면 닫힘
      } else {
        newSet.add(key); // 누르면 열림
      }
      return newSet;
    });
  };

  //카테고리 드롭다운 메뉴 순서 정렬
  const filteredCategories: CategoryItem[] = [...commonDetailCategories];

  if (listingData.kind === "SHARE") {
    const regionIdx = filteredCategories.findIndex(cat => cat.key === "region");
    if (regionIdx !== -1) {
      filteredCategories.splice(regionIdx + 1, 0, shareDetailCategories[0]);
    }
  } else {
    const regionIdx = filteredCategories.findIndex(cat => cat.key === "region");
    if (regionIdx !== -1) {
      filteredCategories.splice(regionIdx + 1, 0, rentDetailCategories[0]);
    }

    const internalDetailsIdx = filteredCategories.findIndex(
      cat => cat.key === "internalDetails",
    );
    if (internalDetailsIdx !== -1) {
      filteredCategories.splice(
        internalDetailsIdx + 1,
        0,
        rentDetailCategories[1],
      );
    }
  }

  return (
    <div className="py-3">
      {filteredCategories.map((item, index) => {
        const itemKeyStr = String(item.key);
        let value;
        if (itemKeyStr === "highlights") {
          value = listingData.optionItemIds;
        } else if (itemKeyStr === "furniture") {
          value = listingData.optionItemIds;
        } else if (itemKeyStr === "isBrokered") {
          value = listingData.optionItemIds;
        } else if (itemKeyStr === "costDetails") {
          value = {
            costDetails: listingData.costDetails,
            includedItems: listingData.optionItemIds,
          };
        } else if (itemKeyStr === "additionalInfo") {
          value = listingData.optionItemIds;
        } else if (itemKeyStr === "capacityPeople") {
          if (listingData.kind === "RENT") {
            value = (listingData as RentPropertyDetail).capacityRent;
          } else {
            value = (listingData as SharePropertyDetail).capacityShare;
          }
        } else {
          value = Array.isArray(item.key)
            ? item.key.map(k => listingData[k as keyof PropertyDetail])
            : listingData[item.key as keyof PropertyDetail];
        }

        return (
          <div
            key={index}
            onClick={() => {
              handleToggle(itemKeyStr);
            }}
          >
            <div className="px-4">
              <div className="flex cursor-pointer justify-between px-1 py-2">
                <span className="text-body2-med text-gray-900">
                  {item.label}
                </span>
                <DownArrow
                  className={`h-[18px] w-[18px] text-gray-600 ${openCategoryKeys.has(itemKeyStr) ? "rotate-180" : ""}`}
                />
              </div>
              {openCategoryKeys.has(itemKeyStr) && (
                <div
                  className={`border-t px-3 py-2 text-gray-100 ${edit ? "cursor-pointer" : ""}`}
                  onClick={() => {
                    if (edit) handleItemClick(itemKeyStr);
                  }}
                >
                  <CategoryContent
                    keyName={itemKeyStr}
                    value={value}
                    listingData={listingData}
                  />
                </div>
              )}
            </div>
            {index !== filteredCategories.length - 1 && <Divider />}
          </div>
        );
      })}
    </div>
  );
};

export default DropDownSection;
