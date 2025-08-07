"use client";

import { useParams, useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import { useListingStore } from "@/stores/useListingStore";
import clsx from "clsx";

import {
  fetchPlaceDetailSuggestions,
  fetchPlaceDetails,
} from "@/apis/googlePlacesApi";

import {
  usePatchProperty,
  usePropertyDetailEditList,
} from "@/hooks/property/usePropertyApi";

import toPostPropertyDetail from "@/utils/listing/toPostPropertyDetail";

import BottomActionBar from "@/components/common/BottomActionBar";
import GoogleMap from "@/components/common/GoogleMap";

import { PropertyRegion } from "@/types/listingDetailPost.type";

import SearchIcon from "@/public/svgs/common/search-icon.svg";

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface AddressFieldProps {
  onNext?: () => void;
  edit?: boolean;
}

const AddressField = ({ onNext, edit }: AddressFieldProps) => {
  const {
    region: addressData,
    setRegion: setAddressData,
    searchKeyword,
    setSearchKeyword,
  } = useListingStore();

  const [isFocused, setIsFocused] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const [isUnitFocused, setIsUnitFocused] = useState(false);
  const [isBuildingFocused, setIsBuildingFocused] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<PropertyRegion | null>(
    null,
  );
  const [suggestions, setSuggestions] = useState<
    { placeId: string; text: string }[]
  >([]);

  const router = useRouter();
  const { id } = useParams();
  const { data } = usePropertyDetailEditList(id as string);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (edit && data) {
      const parsed = toPostPropertyDetail(data);
      if (parsed.region) {
        setAddressData(parsed.region);
        setSearchKeyword(
          [
            parsed.region.streetNumber,
            parsed.region.streetName,
            parsed.region.suburb,
            parsed.region.state,
          ]
            .filter(Boolean)
            .join(" "),
        );
        setIsSearchClicked(true);
        setSelectedAddress(parsed.region);
      }
    }
  }, [edit, data, setAddressData, setSearchKeyword]);

  useEffect(() => {
    if (!searchKeyword.trim()) {
      setSuggestions([]);
      return;
    }

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    fetchPlaceDetailSuggestions(searchKeyword, controller.signal).then(
      results => {
        setSuggestions(results);
      },
    );

    return () => {
      controller.abort();
    };
  }, [searchKeyword]);

  const handleSelectSuggestion = async (placeId: string, text: string) => {
    setSearchKeyword(text);
    setSuggestions([]);
    setIsFocused(false);

    const details = await fetchPlaceDetails(placeId);
    if (!details) return;

    const addressComponents = details.address_components as AddressComponent[];
    const getComponent = (type: string) =>
      addressComponents.find(c => c.types.includes(type))?.long_name || "";

    const region: PropertyRegion = {
      country: getComponent("country"),
      state: getComponent("administrative_area_level_1"),
      suburb: getComponent("locality") || getComponent("sublocality"),
      postCode: getComponent("postal_code"),
      streetName: getComponent("route"),
      streetNumber: getComponent("street_number"),
      unit: "",
      buildingName: "",
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    };

    setAddressData(region);
    setSelectedAddress(region);
    setIsSearchClicked(true);
  };

  const handleUnitChange = (value: string) => {
    setAddressData({ ...addressData, unit: value });
  };

  const handleBuildingChange = (value: string) => {
    setAddressData({ ...addressData, buildingName: value });
  };

  const shouldHighlightMain = isFocused && !addressData.streetName;
  const shouldHighlightUnit = isUnitFocused && addressData.unit.trim() === "";
  const shouldHighlightBuilding =
    isBuildingFocused && addressData.buildingName.trim() === "";

  const getTextColor = (value: string, highlight: boolean) =>
    value || highlight ? "text-gray-900" : "text-gray-500";

  const getBorderColor = (value: string, isFocused: boolean) => {
    return isFocused ? "border-gray-900" : "border-gray-600";
  };

  const { mutate: patchProperty } = usePatchProperty(Number(id));

  const handleSave = () => {
    if (!data) return null;
    const jsonDiscriminator = data.kind;
    const payload = { jsonDiscriminator, region: addressData };

    patchProperty(payload, {
      onSuccess: () => {
        router.push(`/listings/${id}/edit`);
      },
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-heading3 px-4 py-4 text-gray-900">
        주소를 입력해주세요
      </div>
      <div className="px-4">
        <div className="flex flex-col gap-2">
          <div
            className={clsx(
              "flex h-11 w-full max-w-[398px] items-center justify-between rounded-[4px] border px-4 py-3",
              getBorderColor(addressData.streetName, isFocused),
            )}
          >
            <input
              className={clsx(
                "text-body1-med min-w-0 grow text-gray-900 outline-none placeholder:text-gray-500",
                getTextColor(addressData.streetName, shouldHighlightMain),
              )}
              placeholder="도로명, 건물명, suburb 검색"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
            />
            <SearchIcon
              className={clsx(
                "ml-2 cursor-pointer",
                shouldHighlightMain || addressData.streetName
                  ? "text-gray-600"
                  : "text-gray-400",
              )}
              onClick={() => setIsSearchClicked(true)}
            />
          </div>
          {isFocused && suggestions.length > 0 && (
            <div className="relative z-10 mt-[-12px] w-full rounded-sm rounded-t-none border border-gray-500 bg-white">
              <ul className="flex flex-col">
                {suggestions.map(item => (
                  <li
                    key={item.placeId}
                    className="text-cap1-med w-full max-w-[398px] cursor-pointer truncate px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onMouseDown={e => {
                      e.preventDefault(); // prevent input blur
                      handleSelectSuggestion(item.placeId, item.text);
                    }}
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
              <div className="px-4 pb-2 text-right text-[6.625px] text-gray-700">
                powered by google
              </div>
            </div>
          )}

          {isFocused && !addressData.streetName && (
            <div className="text-cap1-med text-red">
              주소는 수정이 불가능하니 정확히 확인해주세요
            </div>
          )}
        </div>

        {isSearchClicked && selectedAddress && (
          <div className="aspect-square h-full max-h-[398px] min-h-[343px] w-full max-w-[398px] py-3">
            <GoogleMap
              lat={selectedAddress.latitude}
              lng={selectedAddress.longitude}
            />
          </div>
        )}
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
                      "flex h-11 w-full max-w-[398px] items-center rounded-[4px] border px-4 py-3",
                      getBorderColor(addressData.unit, isUnitFocused),
                    )}
                  >
                    <input
                      placeholder="입력해주세요"
                      className={clsx(
                        "text-body1-med min-w-0 grow outline-none placeholder:text-gray-500",
                        getTextColor(addressData.unit, shouldHighlightUnit),
                      )}
                      value={addressData.unit}
                      onChange={e => handleUnitChange(e.target.value)}
                      onFocus={() => setIsUnitFocused(true)}
                      onBlur={() => setIsUnitFocused(false)}
                    />
                  </div>
                </div>
                {/* Building name */}
                <div className="mb-15 flex flex-col gap-2">
                  <div className="text-body2-med text-gray-700">
                    건물 / 아파트 이름
                  </div>
                  <div
                    className={clsx(
                      "flex h-11 w-full max-w-[398px] items-center rounded-[4px] border px-4 py-3",
                      getBorderColor(
                        addressData.buildingName,
                        isBuildingFocused,
                      ),
                    )}
                  >
                    <input
                      placeholder="입력해주세요"
                      className={clsx(
                        "text-body1-med min-w-0 grow outline-none placeholder:text-gray-500",
                        getTextColor(
                          addressData.buildingName,
                          shouldHighlightBuilding,
                        ),
                      )}
                      value={addressData.buildingName}
                      onChange={e => handleBuildingChange(e.target.value)}
                      onFocus={() => setIsBuildingFocused(true)}
                      onBlur={() => setIsBuildingFocused(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!edit ? (
            <BottomActionBar label="다음" variant="outline" onClick={onNext} />
          ) : (
            <BottomActionBar label="저장" onClick={handleSave} />
          )}
        </>
      )}
    </div>
  );
};

export default AddressField;
