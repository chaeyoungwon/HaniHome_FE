"use client";

import { useSearchParams } from "next/navigation";

import { useState } from "react";

import { useListingStore } from "@/stores/useListingStore";
import clsx from "clsx";

// import { usePropertyDetailEditList } from "@/hooks/property/useProperty";

import AlertMessage from "@/components/common/AlertMessage";
import BottomActionBar from "@/components/common/BottomActionBar";
import Divider from "@/components/common/Divider";
import BackHeader from "@/components/layout/header/BackHeader";
import FunnelStepMenu from "@/components/listings/create/common/FunnelStepMenu";

import { COMMON_MOVING_CONDITIONS } from "@/constants/question-map";

import DownArrow from "@/public/svgs/common/down-arrow.svg";

const MovingConditionsEdit = () => {
  const fixedKey = "movingConditions";
  const [showAlert, setShowAlert] = useState(false);
  // const params = useParams();
  // // const id = params.id as string;

  // const { data, isLoading, error } = usePropertyDetailEditList(id ?? "");

  const searchParams = useSearchParams();
  const open = searchParams.get("open");

  const { genderPreference, livingConditions, moveInInfo } = useListingStore();

  const handleItemClick = () => {
    setShowAlert(true);
  };

  const getConditionValue = (id: string) => {
    switch (id) {
      case "genderPreference":
        return genderPreference === "ANY"
          ? "무관"
          : genderPreference === "MALE_ONLY"
            ? "남자만"
            : genderPreference === "FEMALE_ONLY"
              ? "여자만"
              : "커플 가능";
      case "livingConditions":
        return `${livingConditions?.minimumStayWeeks || ""} / ${livingConditions?.noticePeriodWeeks || ""}`;
      case "moveInInfo":
        return moveInInfo?.immediate
          ? "즉시 입주 가능"
          : `${moveInInfo?.availableFrom} ~ ${moveInInfo?.availableTo}`;
      default:
        return "-";
    }
  };

  return (
    <div>
      <BackHeader />
      <FunnelStepMenu fixedKey={fixedKey} />
      {COMMON_MOVING_CONDITIONS.map((item, index, array) => {
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
    </div>
  );
};
export default MovingConditionsEdit;
