"use client";

import { useParams, useSearchParams } from "next/navigation";

import { useEffect, useMemo, useState } from "react";

import { useListingStore } from "@/stores/useListingStore";
import clsx from "clsx";

import { usePropertyDetailEditList } from "@/hooks/property/useProperty";

import {
  formatCapcityPeople,
  formatFurniture,
  formatHighlights,
  formatIsBrokered,
  formatPropertySubType,
} from "@/utils/formatter/detailFormatter";

import toPostPropertyDetail from "@/utils/toPostPropertyDetail";

import AlertMessage from "@/components/common/AlertMessage";
import BottomActionBar from "@/components/common/BottomActionBar";
import Divider from "@/components/common/Divider";
import BackHeader from "@/components/layout/header/BackHeader";
import FunnelStepMenu from "@/components/listings/create/common/FunnelStepMenu";

import { QUESTION_MAP } from "@/constants/question-map";

import {
  RentInternalDetails,
  RentPropertyDetail,
  ShareInternalDetails,
  SharePropertyDetail,
} from "@/types/listingDetailPost";

import DownArrow from "@/public/svgs/common/down-arrow.svg";

const ListingDetailsEdit = () => {
  const {
    listingType,
    optionItemIds,
    setListingType,
    setRentPropertyType,
    setSharePropertyType,
    setRentCapacityPeople,
    setShareCapacityPeople,
    setRentInternalDetails,
    setShareInternalDetails,
    setOptionItemIds,
  } = useListingStore();

  const params = useParams();
  const id = params.id as string;
  const { data, isLoading, error } = usePropertyDetailEditList(id ?? "");
  const searchParams = useSearchParams();
  const open = searchParams.get("open");

  const listing = useMemo(() => {
    if (!data) return null;
    return toPostPropertyDetail(data);
  }, [data]);

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!listing) return;
    setOptionItemIds(listing.optionItemIds);
    if (listing.jsonDiscriminator === "SHARE") {
      setListingType("SHARE");
      setSharePropertyType(listing.sharePropertySubType);
      setShareCapacityPeople(listing.capacityShare);
      setShareInternalDetails(listing.internalDetails);
    } else if (listing.jsonDiscriminator === "RENT") {
      setListingType("RENT");
      setRentPropertyType(listing.rentPropertySubType);
      setRentCapacityPeople(listing.capacityRent);
      setRentInternalDetails(listing.internalDetails);
    }
  }, [
    listing,
    setListingType,
    setSharePropertyType,
    setShareCapacityPeople,
    setShareInternalDetails,
    setRentPropertyType,
    setRentCapacityPeople,
    setRentInternalDetails,
    setOptionItemIds,
  ]);
  if (isLoading) return <div>로딩 중...</div>;
  if (error || !data) return <div>데이터를 불러올 수 없습니다.</div>;
  if (!listingType) return null;
  if (!listing) return null;

  console.log("listing 전체:", listing);

  const handleItemClick = () => {
    setShowAlert(true);
  };

  return (
    <>
      <BackHeader />
      <FunnelStepMenu fixedKey="listingDetails" />
      {QUESTION_MAP[listingType].ListingDetails.map((item, index, array) => {
        let value: React.ReactNode = "N/A";

        switch (item.id) {
          case "propertyType": {
            if (listing.jsonDiscriminator === "SHARE") {
              value = formatPropertySubType(
                (listing as SharePropertyDetail).sharePropertySubType,
                "SHARE",
              );
            } else if (listing.jsonDiscriminator === "RENT") {
              value = formatPropertySubType(
                (listing as RentPropertyDetail).rentPropertySubType,
                "RENT",
              );
            }
            break;
          }

          case "capacityPeople": {
            if (listing.jsonDiscriminator === "SHARE") {
              value = formatCapcityPeople(
                (listing as SharePropertyDetail).capacityShare,
                "SHARE",
              );
            } else if (listing.jsonDiscriminator === "RENT") {
              value = formatCapcityPeople(
                (listing as RentPropertyDetail).capacityRent,
                "RENT",
              );
            }
            break;
          }

          case "furniture": {
            value = formatFurniture(optionItemIds);
            break;
          }

          case "highlights": {
            value = formatHighlights(optionItemIds);
            break;
          }

          case "isbrokered": {
            value = formatIsBrokered(optionItemIds);
            break;
          }

          case "internalDetails": {
            const val = listing.internalDetails;

            const areaLabels = ["internalArea", "totalArea"];
            const areaTexts = areaLabels
              .filter(key => val[key as keyof typeof val])
              .map(() => "면적");

            const resident =
              "totalResidents" in val && val.totalResidents ? "거주인" : "";
            const shareBathroom =
              "totalBathUser" in val && val.totalBathUser ? "욕실 쉐어" : "";

            let rooms = "";
            let bathrooms = "";
            let veranda = "";
            let yard = "";
            let withOwner = "";

            if (listing.jsonDiscriminator === "SHARE") {
              const shareVal = val as ShareInternalDetails;
              bathrooms = shareVal.totalBathUser ? "욕실 쉐어" : "";
              rooms = shareVal.totalResidents ? "거주인" : "";
              withOwner = shareVal.withPropertyOwner ? "집주인 거주" : "";
            } else if (listing.jsonDiscriminator === "RENT") {
              const rentVal = val as RentInternalDetails;
              rooms = rentVal.numberOfRoom ? "방 개수" : "";
              bathrooms = rentVal.numberOfBath ? "욕실 개수" : "";
              veranda = rentVal.verandaIncluded ? "베란다 있음" : "";
              yard = rentVal.yardIncluded ? "마당 있음" : "";
            }

            const floorLabels = ["totalFloors", "propertyFloors"];
            const floorTexts = floorLabels
              .filter(key => val[key as keyof typeof val])
              .map(() => "층수");

            const parts = [
              areaTexts.length > 0 ? "면적" : null,
              resident || null,
              shareBathroom || null,
              rooms || null,
              bathrooms || null,
              floorTexts.length > 0 ? "층수" : null,
              veranda || null,
              yard || null,
              withOwner || null,
            ].filter(Boolean);

            const uniqueParts = Array.from(new Set(parts));

            value = uniqueParts.join(", ") || "답변내용";
            break;
          }

          default: {
            value = "답변내용";
            break;
          }
        }

        return (
          <div key={item.id}>
            <div
              className={clsx(
                "flex h-19 w-[375px] cursor-pointer items-start justify-between p-4",
              )}
              onClick={() => {
                if (open != item.id) handleItemClick();
              }}
            >
              <div className="flex flex-col gap-1">
                <div
                  className={`text-heading3 ${
                    open === item.id ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {item.label}
                </div>
                <div className="text-cap1-med text-gray-500">{value}</div>
              </div>
              <div>
                <DownArrow
                  className={`h-6 w-6 cursor-pointer ${open === item.id ? "rotate-180 text-gray-900" : "text-gray-500"}`}
                />
              </div>
            </div>

            {index < array.length - 1 && <Divider className="my-1" />}
          </div>
        );
      })}
      {showAlert && (
        <AlertMessage
          message="이전 페이지로 돌아가 수정해주세요"
          onDone={() => setShowAlert(false)}
          className="bottom-[70px]"
        />
      )}
      <BottomActionBar label="저장" />
    </>
  );
};

export default ListingDetailsEdit;
