import { useEffect, useState } from "react";

import { useListingStore } from "@/stores/useListingStore";
import clsx from "clsx";

import BottomActionBar from "@/components/common/BottomActionBar";

import { PropertyRegion } from "@/types/listingDetail";

import SearchIcon from "@/public/svgs/common/search-icon.svg";

interface AddressFieldProps {
  onNext: () => void;
}

const AddressField = ({ onNext }: AddressFieldProps) => {
  const { addressData, setAddressData } = useListingStore();
  const [isFocused, setIsFocused] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [unit, setUnit] = useState(addressData.unit);
  const [buildingName, setBuildingName] = useState(addressData.buildingName);
  const [isUnitFocused, setIsUnitFocused] = useState(false);
  const [isBuildingFocused, setIsBuildingFocused] = useState(false);

  const handleSearchClick = () => {
    setIsSearchClicked(true);
  };

  const handleInputClick = () => {
    const fakeAddress: PropertyRegion = {
      country: "Australia",
      postCode: "2000",
      state: "NSW",
      suburb: "Sydney",
      streetName: "George St",
      streetNumber: "123",
      unit: "",
      buildingName: "",
      longitude: 151.2093,
      latitude: -33.8688,
    };
    setIsSearchClicked(true);
    setAddressData(fakeAddress);
  };

  useEffect(() => {
    setAddressData({
      ...addressData,
      unit,
      buildingName,
    });
  }, [unit, buildingName, setAddressData]);

  const shouldHighlightMain = isFocused && !addressData.streetName;
  const shouldHighlightUnit = isUnitFocused && unit.trim() === "";
  const shouldHighlightBuilding =
    isBuildingFocused && buildingName.trim() === "";

  const getTextColor = (value: string, highlight: boolean) =>
    value || highlight ? "text-gray-900" : "text-gray-500";

  const getBorderColor = (value: string) =>
    value.trim() ? "border-gray-600" : "border-gray-400";

  return (
    <div className="flex flex-col gap-2">
      <div className="text-heading3 px-4 py-4 text-gray-900">
        주소를 입력해주세요
      </div>
      <div className="px-4">
        <div className="flex flex-col gap-2">
          <div
            className={clsx(
              "flex h-11 w-[343px] items-center justify-between rounded-[4px] border px-4 py-3",
              getBorderColor(addressData.streetName),
            )}
            onClick={handleInputClick}
          >
            <input
              className={clsx(
                "text-body1-med min-w-0 grow outline-none placeholder:text-gray-500",
                getTextColor(addressData.streetName, shouldHighlightMain),
              )}
              placeholder="도로명, 건물명, suburb 검색"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <SearchIcon
              className={clsx(
                "ml-2 cursor-pointer",
                shouldHighlightMain || addressData.streetName
                  ? "text-gray-600"
                  : "text-gray-400",
              )}
              onClick={handleSearchClick}
            />
          </div>
          {isFocused && (
            <div className="text-cap1-med text-red">
              주소는 수정이 불가능하니 정확히 확인해주세요
            </div>
          )}
        </div>
      </div>

      {!isSearchClicked && (
        <>
          <div className="flex items-center gap-2 px-4 py-3">
            <div className="text-body2-med text-gray-700">
              이렇게 검색해보세요!
            </div>
            <div className="text-cap1-med text-gray-500">
              영문 입력을 권장드립니다
            </div>
          </div>
          {[
            ["번지수 + 도로명", "25 Smith St"],
            ["도로명 + Suburb", "25 George St, Parramatta"],
            ["건물명", "World Tower"],
          ].map(([label, example]) => (
            <div key={label} className="flex flex-col gap-[2px] px-4 py-2">
              <div className="text-cap1-med text-gray-600">{label}</div>
              <div className="text-cap1-med text-gray-300">ex) {example}</div>
            </div>
          ))}
        </>
      )}

      {isSearchClicked && (
        <>
          <div className="pb-[70px]">
            <div className="flex flex-col gap-2">
              <div className="text-heading3 p-4 text-gray-700">
                상세주소를 입력해주세요 (선택)
              </div>
              <div className="flex flex-col gap-6 px-4">
                {/* Unit No. */}
                <div className="flex flex-col gap-2">
                  <div className="text-body2-med text-gray-700">Unit No.</div>
                  <div
                    className={clsx(
                      "flex h-11 w-[343px] items-center rounded-[4px] border px-4 py-3",
                      getBorderColor(unit),
                    )}
                  >
                    <input
                      placeholder="입력해주세요"
                      className={clsx(
                        "text-body1-med min-w-0 grow outline-none placeholder:text-gray-500",
                        getTextColor(unit, shouldHighlightUnit),
                      )}
                      value={unit}
                      onChange={e => setUnit(e.target.value)}
                      onFocus={() => setIsUnitFocused(true)}
                      onBlur={() => setIsUnitFocused(false)}
                    />
                  </div>
                </div>
                {/* Building name */}
                <div className="flex flex-col gap-2">
                  <div className="text-body2-med text-gray-700">
                    건물 / 아파트 이름
                  </div>
                  <div
                    className={clsx(
                      "flex h-11 w-[343px] items-center rounded-[4px] border px-4 py-3",
                      getBorderColor(buildingName),
                    )}
                  >
                    <input
                      placeholder="입력해주세요"
                      className={clsx(
                        "text-body1-med min-w-0 grow outline-none placeholder:text-gray-500",
                        getTextColor(buildingName, shouldHighlightBuilding),
                      )}
                      value={buildingName}
                      onChange={e => setBuildingName(e.target.value)}
                      onFocus={() => setIsBuildingFocused(true)}
                      onBlur={() => setIsBuildingFocused(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BottomActionBar label="다음" variant="outline" onClick={onNext} />
        </>
      )}
    </div>
  );
};

export default AddressField;
