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

import { formatMeetingDay } from "@/utils/formatter/dateFormatter";
import toPostPropertyDetail from "@/utils/listing/toPostPropertyDetail";

import AlertMessage from "@/components/common/AlertMessage";
import BottomActionBar from "@/components/common/BottomActionBar";
import Divider from "@/components/common/Divider";
import FunnelStepMenu from "@/components/listings/create/common/FunnelStepMenu";
import MovingConditionDropdownContent from "@/components/listings/create/movingConditions/MovingConditionDropdownContent";

import { CATEGORY_OPTIONS } from "@/constants/property-category";
import { COMMON_MOVING_CONDITIONS } from "@/constants/question-map";

import { MovingConditionsOption } from "@/types/createPropertyAnswer.type";
import { PatchPayload } from "@/types/patchPayload";

import DownArrow from "@/public/svgs/common/down-arrow.svg";

const BackHeader = dynamic(
  () => import("@/components/layout/header/BackHeader"),
  { ssr: false },
);

const MovingConditionsEdit = () => {
  const fixedKey = "movingConditions";

  const [showAlert, setShowAlert] = useState(false);

  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const searchParams = useSearchParams();
  const open = searchParams.get("open");
  const draftId = searchParams.get("draftId");

  const { data } = usePropertyDetailEditList(id ?? "");

  const {
    genderPreference,
    livingConditions,
    moveInInfo,
    optionItemIds,
    lgbtAvailable,
    setGenderPreference,
    setLivingConditions,
    setMoveInInfo,
    setOptionItemIds,
    setLgbtAvailable,
  } = useListingStore();

  const listing = useMemo(() => {
    if (!data) return null;
    return toPostPropertyDetail(data);
  }, [data]);

  useEffect(() => {
    if (!listing) return;
    setOptionItemIds(listing.optionItemIds);
    setMoveInInfo(listing.moveInInfo);
    setLivingConditions(listing.livingConditions);
    setGenderPreference(listing.genderPreference);
    setLgbtAvailable(listing.lgbtAvailable);
  }, [listing]);

  const handleItemClick = () => {
    setShowAlert(true);
  };

  const getConditionValue = (id: string) => {
    const AVAILABLE_KEY_LABEL_MAP: Record<string, string> = {
      흡연자: "흡연자",
      반려동물: "반려동물",
      "외부인 방문": "외부인",
      주차: "주차",
      "주방 사용": "주방",
    };

    switch (id) {
      case "genderPreference": {
        let base =
          genderPreference === "ANY"
            ? "무관"
            : genderPreference === "MALE_ONLY"
              ? "남자만"
              : genderPreference === "FEMALE_ONLY"
                ? "여자만"
                : "커플 가능";

        if (lgbtAvailable) {
          base += " (LGBTQ 가능)";
        }

        return base;
      }

      case "livingConditions": {
        const parts = [];
        if (livingConditions?.noticePeriodWeeks)
          parts.push(`노티스 ${livingConditions?.noticePeriodWeeks}주`);
        if (livingConditions?.minimumStayWeeks)
          parts.push(`최소 ${livingConditions?.minimumStayWeeks}주`);
        if (livingConditions?.contractTerms) parts.push("계약 형태");
        return parts.join(", ");
      }
      case "moveInInfo": {
        const { availableFrom, availableTo, immediate, negotiable } =
          moveInInfo ?? {
            availableFrom: null,
            availableTo: null,
            immediate: false,
            negotiable: false,
          };

        const moveInParts = [];

        const from = availableFrom
          ? formatMeetingDay(availableFrom).date
          : null;
        const to = availableTo ? formatMeetingDay(availableTo).date : null;

        if (from && to) moveInParts.push(`${from} ~ ${to}`);
        else moveInParts.push("날짜 미정");

        if (immediate) moveInParts.push("즉시 입주");
        if (negotiable) moveInParts.push("협의 가능");

        return moveInParts.join(", ");
      }
      case "additionalInfo": {
        const selectedIds = optionItemIds;
        const additionalInfoItems = CATEGORY_OPTIONS[3].items;

        const selectedCategories = Object.entries(additionalInfoItems)
          .filter(([, options]) =>
            options.some(option => selectedIds.includes(option.optionId)),
          )
          .map(([category]) => AVAILABLE_KEY_LABEL_MAP[category] ?? category);

        return selectedCategories.join(", ");
      }
      default:
        return "-";
    }
  };

  const getConditionValueForDropdown = (
    id: string,
  ): MovingConditionsOption | undefined => {
    switch (id) {
      case "genderPreference":
        return { type: "genderPreference", value: genderPreference };
      case "livingConditions":
        return { type: "livingConditions", value: livingConditions };
      case "moveInInfo":
        return { type: "moveInInfo", value: moveInInfo };
      case "additionalInfo":
        return { type: "optionItemIds", value: optionItemIds };
      default:
        return undefined;
    }
  };

  const handleSelect = (id: string, selected: MovingConditionsOption) => {
    switch (id) {
      case "genderPreference":
        if (selected.type === "genderPreference") {
          setGenderPreference(selected.value);
        }
        break;
      case "livingConditions":
        if (selected.type === "livingConditions") {
          setLivingConditions(selected.value);
        }
        break;
      case "moveInInfo":
        if (selected.type === "moveInInfo" && selected.value != null) {
          setMoveInInfo(selected.value);
        }
        break;
      case "additionalInfo":
        if (selected.type === "optionItemIds") {
          setOptionItemIds(selected.value);
        }
        break;
    }
  };

  const { mutate: patchProperty } = usePatchProperty(Number(id));

  const handleSave = () => {
    if (!data || !open) return;

    const jsonDiscriminator = data.kind as "SHARE" | "RENT";

    let payload: PatchPayload | null = null;

    if (open === "genderPreference" && genderPreference) {
      payload =
        jsonDiscriminator === "SHARE"
          ? { jsonDiscriminator: "SHARE", genderPreference, lgbtAvailable }
          : { jsonDiscriminator: "RENT", genderPreference, lgbtAvailable };
    } else if (open === "livingConditions" && livingConditions) {
      payload =
        jsonDiscriminator === "SHARE"
          ? { jsonDiscriminator: "SHARE", livingConditions }
          : { jsonDiscriminator: "RENT", livingConditions };
    } else if (open === "moveInInfo") {
      if (moveInInfo) {
        payload =
          jsonDiscriminator === "SHARE"
            ? { jsonDiscriminator: "SHARE", moveInInfo }
            : { jsonDiscriminator: "RENT", moveInInfo };
      }
    } else if (open === "additionalInfo") {
      payload =
        jsonDiscriminator === "SHARE"
          ? { jsonDiscriminator: "SHARE", optionItemIds }
          : { jsonDiscriminator: "RENT", optionItemIds };
    }

    if (payload) {
      patchProperty(payload, {
        onSuccess: () => {
          router.push(`/listings/${id}/edit`);
        },
      });
    }
  };

  return (
    <div className="pb-[70px]">
      <BackHeader isDraft={Boolean(draftId)} />
      <FunnelStepMenu fixedKey={fixedKey} />
      {COMMON_MOVING_CONDITIONS.map((item, index, array) => {
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
                <div className="text-cap1-med text-gray-500">
                  {getConditionValue(item.id)}
                </div>
              </div>
              <div>
                <DownArrow
                  className={`h-6 w-6 cursor-pointer ${open === item.id ? "rotate-180 text-gray-900" : "text-gray-500"}`}
                />
              </div>
            </div>

            {open === item.id && (
              <div>
                <MovingConditionDropdownContent
                  id={item.id}
                  value={getConditionValueForDropdown(item.id)}
                  onSelect={value => handleSelect(item.id, value)}
                />
              </div>
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
    </div>
  );
};
export default MovingConditionsEdit;
