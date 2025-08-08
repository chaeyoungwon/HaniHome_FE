"use client";

import dynamic from "next/dynamic";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useMemo, useState } from "react";

import { useListingStore } from "@/stores/useListingStore";
import clsx from "clsx";

import {
  usePatchProperty,
  usePropertyDetailEditList,
} from "@/hooks/property/usePropertyApi";

import {
  formatCapcityPeople,
  formatIsBrokered,
  formatPropertySubType,
} from "@/utils/formatter/detailFormatter";
import toPostPropertyDetail from "@/utils/listing/toPostPropertyDetail";

import AlertMessage from "@/components/common/AlertMessage";
import BottomActionBar from "@/components/common/BottomActionBar";
import Divider from "@/components/common/Divider";
import FunnelStepMenu from "@/components/listings/create/common/FunnelStepMenu";
import ListingDetailsDropdownContent from "@/components/listings/create/listingDetails/ListingDetailsDropdownContent";

import { CATEGORY_OPTIONS } from "@/constants/property-category";
import { QUESTION_MAP } from "@/constants/question-map";

import { ListingDetailsOption } from "@/types/createPropertyAnswer.type";
import {
  RentInternalDetails,
  RentPropertyDetail,
  ShareInternalDetails,
  SharePropertyDetail,
} from "@/types/listingDetailPost.type";
import { PatchPayload } from "@/types/patchPayload";

import DownArrow from "@/public/svgs/common/down-arrow.svg";

const BackHeader = dynamic(
  () => import("@/components/layout/header/BackHeader"),
  { ssr: false },
);

const ListingDetailsEdit = () => {
  const {
    listingType,
    rentPropertyType,
    sharePropertyType,
    rentCapacityPeople,
    shareCapacityPeople,
    rentInternalDetails,
    shareInternalDetails,
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

  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const searchParams = useSearchParams();
  const open = searchParams.get("open");

  const { data, isLoading, error } = usePropertyDetailEditList(id ?? "");
  const { mutate: patchProperty } = usePatchProperty(Number(id));

  const [showAlert, setShowAlert] = useState(false);

  const listing = useMemo(() => {
    if (!data) return null;
    return toPostPropertyDetail(data);
  }, [data]);

  useEffect(() => {
    if (!listing) return;

    setOptionItemIds(listing.optionItemIds);

    if (listingType === "SHARE") {
      const share = listing as SharePropertyDetail;
      setListingType("SHARE");
      setSharePropertyType(share.sharePropertySubType);
      setShareCapacityPeople(share.capacityShare);
      setShareInternalDetails(share.internalDetails);
    } else {
      const rent = listing as RentPropertyDetail;
      setListingType("RENT");
      setRentPropertyType(rent.rentPropertySubType);
      setRentCapacityPeople(rent.capacityRent);
      setRentInternalDetails(rent.internalDetails);
    }
  }, [listing]);

  const handleItemClick = () => {
    setShowAlert(true);
  };

  const handleSave = () => {
    if (!data || !open) return;

    const includedOptionIds = new Set<number>();
    Object.values(CATEGORY_OPTIONS).forEach(category => {
      switch (category.key) {
        case "highlights":
        case "isBrokered":
        case "furniture":
          Object.values(category.items).forEach(item => {
            includedOptionIds.add(item.optionId);
          });
          break;
      }
    });

    const filteredOptionItemIds = optionItemIds.filter(
      id => !includedOptionIds.has(id),
    );
    const selectedIncludedOptionIds = optionItemIds.filter(id =>
      includedOptionIds.has(id),
    );
    const finalOptionItemIds = [
      ...filteredOptionItemIds,
      ...selectedIncludedOptionIds,
    ];

    const basePayload = {
      optionItemIds: finalOptionItemIds,
    };

    let payload: PatchPayload | null = null;

    if (listingType === "RENT") {
      switch (open) {
        case "propertyType":
          payload = {
            ...basePayload,
            jsonDiscriminator: "RENT",
            rentPropertySubType: rentPropertyType ?? undefined,
          } satisfies PatchPayload;
          break;

        case "capacityPeople":
          payload = {
            ...basePayload,
            jsonDiscriminator: "RENT",
            capacityRent: rentCapacityPeople ?? undefined,
          } satisfies PatchPayload;
          break;

        case "internalDetails":
          payload = {
            ...basePayload,
            jsonDiscriminator: "RENT",
            internalDetails: rentInternalDetails ?? undefined,
          } satisfies PatchPayload;
          break;

        case "furniture":
        case "highlights":
        case "isBrokered":
          payload = {
            ...basePayload,
            jsonDiscriminator: "RENT",
          } satisfies PatchPayload;
          break;

        default:
          break;
      }
    } else if (listingType === "SHARE") {
      switch (open) {
        case "propertyType":
          payload = {
            ...basePayload,
            jsonDiscriminator: "SHARE",
            sharePropertySubType: sharePropertyType ?? undefined,
          } satisfies PatchPayload;
          break;

        case "capacityPeople":
          payload = {
            ...basePayload,
            jsonDiscriminator: "SHARE",
            capacityShare: shareCapacityPeople ?? undefined,
          } satisfies PatchPayload;
          break;

        case "internalDetails":
          payload = {
            ...basePayload,
            jsonDiscriminator: "SHARE",
            internalDetails: shareInternalDetails ?? undefined,
          } satisfies PatchPayload;
          break;

        case "furniture":
        case "highlights":
        case "isBrokered":
          payload = {
            ...basePayload,
            jsonDiscriminator: "SHARE",
          } satisfies PatchPayload;
          break;

        default:
          break;
      }
    }

    if (payload) {
      patchProperty(payload, {
        onSuccess: () => {
          router.push(`/listings/${id}/edit`);
        },
      });
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error || !data) return <div>데이터를 불러올 수 없습니다.</div>;
  if (!listingType || !listing) return null;

  return (
    <>
      <BackHeader />
      <FunnelStepMenu fixedKey="listingDetails" />
      {QUESTION_MAP[listingType].ListingDetails.map((item, index, array) => {
        let value: React.ReactNode = "N/A";

        switch (item.id) {
          case "propertyType":
            value =
              listingType === "RENT"
                ? rentPropertyType
                  ? formatPropertySubType(rentPropertyType, "RENT")
                  : "N/A"
                : sharePropertyType
                  ? formatPropertySubType(sharePropertyType, "SHARE")
                  : "N/A";
            break;

          case "capacityPeople":
            value =
              listingType === "RENT"
                ? rentCapacityPeople !== null
                  ? formatCapcityPeople(rentCapacityPeople, "RENT")
                  : "N/A"
                : shareCapacityPeople !== null
                  ? formatCapcityPeople(shareCapacityPeople, "SHARE")
                  : "N/A";
            break;

          case "furniture": {
            const options = CATEGORY_OPTIONS[2].items;
            const categories = Object.entries(options)
              .filter(([, items]) =>
                items.some(i => optionItemIds?.includes(i.optionId)),
              )
              .map(([category]) => category);
            value = categories.join(", ");
            break;
          }

          case "highlights": {
            const options = CATEGORY_OPTIONS[1].items;
            const matched = options.filter(i =>
              optionItemIds?.includes(i.optionId),
            );
            value = matched.length
              ? `${matched[0].label}${matched.length > 1 ? "···" : ""}`
              : "";
            break;
          }

          case "isBrokered":
            value = formatIsBrokered(optionItemIds);
            break;

          case "internalDetails": {
            const val =
              listingType === "SHARE"
                ? shareInternalDetails
                : rentInternalDetails;

            if (!val) {
              value = "답변내용";
              break;
            }

            const areaLabels = ["internalArea", "totalArea"];
            const areaTexts = areaLabels
              .filter(key => val[key as keyof typeof val])
              .map(() => "면적");

            const resident = "";
            const shareBathroom = "";
            let rooms = "";
            let bathrooms = "";
            let veranda = "";
            let yard = "";
            let withOwner = "";

            if (listingType === "SHARE") {
              const shareVal = val as ShareInternalDetails;
              bathrooms = shareVal.totalBathUser ? "욕실 쉐어" : "";
              rooms = shareVal.totalResidents ? "거주인" : "";
              withOwner = shareVal.withPropertyOwner ? "집주인 거주" : "";
            } else {
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

          default:
            value = "답변내용";
        }

        return (
          <div key={item.id}>
            <div
              className={clsx(
                "flex h-19 w-full max-w-[430px] cursor-pointer items-start justify-between p-4",
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
                  className={`h-6 w-6 cursor-pointer ${
                    open === item.id
                      ? "rotate-180 text-gray-900"
                      : "text-gray-500"
                  }`}
                />
              </div>
            </div>
            {open === item.id && (
              <ListingDetailsDropdownContent
                id={item.id as ListingDetailsOption["type"]}
                onSelect={() => {}}
              />
            )}
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
      <BottomActionBar label="저장" onClick={handleSave} />
    </>
  );
};

export default ListingDetailsEdit;
