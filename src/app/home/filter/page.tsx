"use client";

import { useEffect, useState } from "react";

import { useFilterStore } from "@/stores/useFilterStore";

import { getFilteredPropertyCount } from "@/apis/property";

import { useDebouncedValue } from "@/hooks/filter/useDebouncedValue";

import AlertMessage from "@/components/common/AlertMessage";
import BottomActionBar from "@/components/common/BottomActionBar";
import Divider from "@/components/common/Divider";
import AvailableDatePicker from "@/components/home/filter/AvailableDatePicker";
import BudgetSlider from "@/components/home/filter/BudgetSlider";
import RoomTypeSelector from "@/components/home/filter/RoomTypeSelector";
import SubwayStationSelector from "@/components/home/filter/SubwayStationSelector";
import TypeSelector from "@/components/home/filter/TypeSelector";
import BackHeader from "@/components/layout/header/BackHeader";

import {
  RENT_TYPE_MAP,
  SHARE_ONLY_ROOM_TYPES,
  SHARE_TYPE_MAP,
} from "@/constants/housing-options";

import { FilteredPropertyParams } from "@/types/property";

export type RoomKind = "SHARE" | "RENT";

const Filter = () => {
  const [selectedTypes, setSelectedTypes] = useState<("쉐어" | "렌트")[]>([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);

  const {
    setFilters,
    resetFilters,
    billIncluded,
    minWeeklyCost,
    maxWeeklyCost,
  } = useFilterStore();

  const debouncedMinCost = useDebouncedValue(minWeeklyCost, 500);
  const debouncedMaxCost = useDebouncedValue(maxWeeklyCost, 500);

  const isDisabled = (type: string) => {
    if (selectedTypes.includes("쉐어") && selectedTypes.includes("렌트"))
      return false;
    if (selectedTypes.includes("쉐어"))
      return !SHARE_ONLY_ROOM_TYPES.includes(type);
    if (selectedTypes.includes("렌트"))
      return SHARE_ONLY_ROOM_TYPES.includes(type);
    return false;
  };

  const toggleType = (type: "쉐어" | "렌트") => {
    setSelectedTypes(prev => {
      const next = prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type];

      if (next.length === 0) setSelectedRoomTypes([]);
      return next;
    });
  };

  const toggleRoomType = (type: string) => {
    if (selectedTypes.length === 0) {
      setAlertMessage("매물종류를 선택해주세요");
      return;
    }
    if (isDisabled(type)) return;
    setSelectedRoomTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type],
    );
  };

  const handleReset = () => {
    resetFilters();
    setSelectedTypes([]);
    setSelectedRoomTypes([]);
  };

  const mapRoomTypesToApi = (
    selectedTypes: ("쉐어" | "렌트")[],
    selectedRoomTypes: string[],
  ) => {
    const sharePropertySubTypes: string[] = [];
    const rentPropertySubTypes: string[] = [];

    for (const room of selectedRoomTypes) {
      if (selectedTypes.includes("쉐어") && SHARE_TYPE_MAP[room]) {
        sharePropertySubTypes.push(SHARE_TYPE_MAP[room]);
      }
      if (selectedTypes.includes("렌트") && RENT_TYPE_MAP[room]) {
        rentPropertySubTypes.push(RENT_TYPE_MAP[room]);
      }
    }

    return { sharePropertySubTypes, rentPropertySubTypes };
  };

  const handleApply = () => {
    const kinds = selectedTypes.map(type =>
      type === "쉐어" ? "SHARE" : "RENT",
    ) as RoomKind[];

    const { sharePropertySubTypes, rentPropertySubTypes } = mapRoomTypesToApi(
      selectedTypes,
      selectedRoomTypes,
    );

    setFilters({
      kinds,
      sharePropertySubTypes,
      rentPropertySubTypes,
    });
  };

  const buildQueryParams = (): FilteredPropertyParams => {
    const kinds = selectedTypes
      .map(type =>
        type === "쉐어" ? "SHARE" : type === "렌트" ? "RENT" : null,
      )
      .filter((k): k is "SHARE" | "RENT" => k !== null);

    const { sharePropertySubTypes, rentPropertySubTypes } = mapRoomTypesToApi(
      selectedTypes,
      selectedRoomTypes,
    );

    const { minWeeklyCost, maxWeeklyCost, billIncluded } =
      useFilterStore.getState();

    const params: FilteredPropertyParams = {
      kinds,
      sharePropertySubTypes,
      rentPropertySubTypes,
      minWeeklyCost: minWeeklyCost ?? undefined,
      maxWeeklyCost: maxWeeklyCost ?? undefined,
    };

    if (typeof billIncluded === "boolean") {
      params.billIncluded = billIncluded;
    }

    return params;
  };

  useEffect(() => {
    const fetchCount = async () => {
      const params = buildQueryParams();
      try {
        const res = await getFilteredPropertyCount(params);
        setCount(res.totalElements ?? 0);
      } catch (err) {
        console.error("매물 수 조회 실패", err);
        setCount(0);
      }
    };

    fetchCount();
  }, [
    selectedTypes,
    selectedRoomTypes,
    debouncedMinCost,
    debouncedMaxCost,
    billIncluded,
  ]);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden pb-39.5">
      <BackHeader />

      <TypeSelector selectedTypes={selectedTypes} onSelect={toggleType} />
      <Divider />

      <RoomTypeSelector
        selectedRoomTypes={selectedRoomTypes}
        toggleRoomType={toggleRoomType}
        isDisabled={isDisabled}
      />
      <Divider />

      <BudgetSlider />
      <Divider />

      <AvailableDatePicker />
      <Divider />

      <SubwayStationSelector />

      <BottomActionBar
        buttons={[
          { label: "초기화", onClick: handleReset, variant: "outline" },
          {
            label: `매물 ${count}개`,
            onClick: handleApply,
            disabled:
              selectedTypes.length === 0 || selectedRoomTypes.length === 0,
          },
        ]}
      />

      {alertMessage && (
        <AlertMessage
          message={alertMessage}
          className="bottom-19"
          onDone={() => setAlertMessage(null)}
        />
      )}
    </div>
  );
};

export default Filter;
