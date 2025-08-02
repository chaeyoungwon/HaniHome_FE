"use client";

import { useEffect, useRef, useState } from "react";

import { useListingStore } from "@/stores/useListingStore";

import {
  fromSquareMeter,
  toSquareMeter,
} from "@/utils/listing/create/areaConverter";

import CheckIcon from "@/components/common/CheckIcon";

import { LISTING_INFORMATION_LABEL } from "@/constants/listing-create-options";

import {
  RentInternalDetails,
  ShareInternalDetails,
} from "@/types/listingDetail";

import ChangeIcon from "@/public/svgs/listings/change-icon.svg";
import QuestionIcon from "@/public/svgs/listings/question-mark-icon.svg";

import AreaInfo from "./AreaInfo";

interface InternalDetailsContentProps<
  T extends RentInternalDetails | ShareInternalDetails,
> {
  value: T;
  listingType: "RENT" | "SHARE";
  onChange: <K extends keyof T>(field: K, value: T[K]) => void;
}

const InternalDetailsContent = <
  T extends RentInternalDetails | ShareInternalDetails,
>({
  value,
  listingType,
  onChange,
}: InternalDetailsContentProps<T>) => {
  const isSquareMeter = useListingStore(state => state.isSquareMeter);
  const setIsSquareMeter = useListingStore(state => state.setIsSquareMeter);

  const [localInputValues, setLocalInputValues] = useState<
    Partial<Record<keyof T, string>>
  >({});
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [withPropertyOwner, setWithPropertyOwner] = useState(false);
  const [yardIncluded, setYardIncluded] = useState(false);
  const [verandaIncluded, setVerandaIncluded] = useState(false);
  const [isOpenAreaInfo, setIsOpenAreaInfo] = useState(false);

  const areaInfoRef = useRef<HTMLDivElement>(null);

  const handleIsSquareMeterToggle = () => {
    setIsSquareMeter(!isSquareMeter);
  };

  const handleYardChecked = () => {
    if (listingType !== "RENT") return;
    const newChecked = !yardIncluded;
    setYardIncluded(newChecked);
    onChange("yardIncluded" as keyof T, newChecked as T[keyof T]);
  };

  const handleVerandaChecked = () => {
    if (listingType !== "RENT") return;
    const newChecked = !verandaIncluded;
    setVerandaIncluded(newChecked);
    onChange("verandaIncluded" as keyof T, newChecked as T[keyof T]);
  };

  const handleWithOwnerChecked = () => {
    if (listingType !== "SHARE") return;
    const newChecked = !withPropertyOwner;
    setWithPropertyOwner(newChecked);
    onChange("withPropertyOwner" as keyof T, newChecked as T[keyof T]);
  };
  const areaKeys = ["internalArea", "totalArea"] as const;

  const handleNumericInputChange = <K extends keyof T>(
    field: K,
    newValue: string,
  ) => {
    setIsUserTyping(true);
    setLocalInputValues(prev => ({ ...prev, [field]: newValue }));

    if (newValue === "") {
      onChange(field, null as T[K]);
      return;
    }

    const numeric = +newValue;
    if (isNaN(numeric)) return;

    let valueToSave: number;

    if (field === "internalArea" || field === "totalArea") {
      valueToSave = isSquareMeter ? numeric : toSquareMeter(numeric);
    } else {
      valueToSave = numeric;
    }

    onChange(field, valueToSave as T[K]);
  };

  const toggleAreaInfo = () => {
    setIsOpenAreaInfo(prev => !prev);
  };

  useEffect(() => {
    setWithPropertyOwner(
      (value as ShareInternalDetails).withPropertyOwner ?? false,
    );
    setYardIncluded((value as RentInternalDetails).yardIncluded ?? false);
    setVerandaIncluded((value as RentInternalDetails).verandaIncluded ?? false);
  }, [value]);

  useEffect(() => {
    if (isUserTyping) return;

    setLocalInputValues(prev => {
      const updated = { ...prev };

      for (const key of areaKeys) {
        const raw = value[key];
        if (typeof raw === "number") {
          const converted = isSquareMeter ? raw : fromSquareMeter(raw);
          updated[key] = converted.toString();
        }
      }

      return { ...prev, ...updated };
    });
  }, [isSquareMeter]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        areaInfoRef.current &&
        !areaInfoRef.current.contains(event.target as Node)
      ) {
        setIsOpenAreaInfo(false);
      }
    };

    if (isOpenAreaInfo) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenAreaInfo]);

  const inputUnitText = isSquareMeter ? "㎡" : "평";
  const buttonUnitText = isSquareMeter ? "평" : "㎡";
  const rentOtherKeys = ["numberOfRoom", "numberOfBath"] as const;
  const shareOtherKeys = ["totalResidents", "totalBathUser"] as const;
  const floorKeys = ["totalFloors", "propertyFloor"] as const;

  if (!listingType || !value) return null;

  const details =
    listingType === "RENT"
      ? (value as RentInternalDetails)
      : (value as ShareInternalDetails);

  return (
    <div className="max-w-[375px]">
      <div className="relative">
        {isOpenAreaInfo && (
          <div
            className="absolute top-[23px] left-[74px] z-50"
            ref={areaInfoRef}
          >
            <AreaInfo />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 px-4 py-3">
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <div className="text-body1-sb text-gray-800">방 면적</div>

            <QuestionIcon className="cursor-pointer" onClick={toggleAreaInfo} />
          </div>
          <button
            type="button"
            onClick={handleIsSquareMeterToggle}
            className="flex items-center gap-1"
          >
            <ChangeIcon className="text-mint" />
            <div className="text-lab1-sb text-mint">
              {buttonUnitText} 단위로 입력
            </div>
          </button>
        </div>

        {/* 면적 입력 */}
        <div className="flex justify-between">
          {areaKeys.map(key => {
            const rawValue = details[key];

            return (
              <div key={key} className="flex h-[73px] flex-col justify-between">
                <div className="text-body2-med text-gray-600">
                  {LISTING_INFORMATION_LABEL[key]}
                </div>
                <div className="relative w-[167px]">
                  <input
                    type="text"
                    className={`text-body1-med h-11 w-full rounded-[4px] border px-4 py-3 pr-12 focus:outline-none ${
                      rawValue
                        ? "border-gray-600 text-gray-900"
                        : "border-gray-400 text-gray-500"
                    }`}
                    placeholder="입력해주세요"
                    value={localInputValues[key] ?? ""}
                    onChange={e =>
                      handleNumericInputChange(key, e.target.value)
                    }
                    onBlur={() => setIsUserTyping(false)}
                  />
                  <span
                    className={`text-body1-med pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 ${
                      rawValue ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {inputUnitText}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 나머지 옵션 */}
      <div className="flex flex-col">
        {(listingType === "RENT"
          ? [...rentOtherKeys, ...floorKeys]
          : [...shareOtherKeys, ...floorKeys]
        )
          .reduce<string[][]>((acc, curr, idx) => {
            if (idx % 2 === 0) acc.push([curr]);
            else acc[acc.length - 1].push(curr);
            return acc;
          }, [])
          .map((pair, rowIdx) => (
            <div key={rowIdx} className="flex justify-between px-4 py-5">
              {pair.map(key => (
                <div key={key} className="flex flex-col">
                  <div className="text-body1-sb mb-3 text-gray-800">
                    {LISTING_INFORMATION_LABEL[key]}
                  </div>
                  <div className="relative w-[167px]">
                    {(() => {
                      const rawValue = details[key as keyof typeof details];
                      const valueForInput =
                        typeof rawValue === "boolean"
                          ? ""
                          : rawValue === 0
                            ? ""
                            : (rawValue ?? "");

                      return (
                        <input
                          type="text"
                          className={`text-body1-med h-11 w-full rounded-[4px] border px-4 py-3 pr-12 focus:outline-none ${
                            rawValue
                              ? "border-gray-600 text-gray-900"
                              : "border-gray-400 text-gray-500"
                          }`}
                          placeholder="입력해주세요"
                          value={valueForInput}
                          onChange={e =>
                            handleNumericInputChange(
                              key as keyof T,
                              e.target.value,
                            )
                          }
                        />
                      );
                    })()}
                    <span
                      className={`text-body1-med pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 ${
                        details[key as keyof typeof details]
                          ? "text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      {listingType === "RENT"
                        ? ["numberOfRoom", "numberOfBath"].includes(key)
                          ? "개"
                          : "층"
                        : ["totalResidents", "totalBathUser"].includes(key)
                          ? "명"
                          : "층"}
                    </span>
                  </div>

                  {listingType === "SHARE" && key === "totalResidents" && (
                    <div
                      className="mt-2 flex cursor-pointer items-center gap-1 select-none"
                      onClick={handleWithOwnerChecked}
                    >
                      <CheckIcon checked={withPropertyOwner} />
                      <div className="text-cap1-med text-gray-700">
                        집주인과 함께 거주
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
      </div>
      {listingType === "RENT" && (
        <div className="flex flex-col gap-3 px-4 py-3">
          <div
            className="flex cursor-pointer items-center gap-1 select-none"
            onClick={handleYardChecked}
          >
            <CheckIcon checked={yardIncluded} />
            <div className="text-cap1-med text-gray-700">마당 포함</div>
          </div>
          <div
            className="flex cursor-pointer items-center gap-1 select-none"
            onClick={handleVerandaChecked}
          >
            <CheckIcon checked={verandaIncluded} />
            <div className="text-cap1-med text-gray-700">베란다 포함</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternalDetailsContent;
