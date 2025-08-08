"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { useFilterStore } from "@/stores/useFilterStore";
import { useMetroStore } from "@/stores/useMetroStore";

import { useCountUp } from "@/hooks/filter/useCountup";
import { useDebouncedValue } from "@/hooks/filter/useDebouncedValue";
import { usePropertySearch } from "@/hooks/filter/useFilterApi";
import { useMetroStops } from "@/hooks/filter/useMetroApi";

import { buildQueryParams } from "@/utils/filter/buildQueryParams";

import AlertMessage from "@/components/common/AlertMessage";
import BottomActionBar from "@/components/common/BottomActionBar";
import Divider from "@/components/common/Divider";
import AvailableDatePicker from "@/components/home/filter/AvailableDatePicker";
import BudgetSlider from "@/components/home/filter/BudgetSlider";
import RoomTypeSelector from "@/components/home/filter/RoomTypeSelector";
import SubwayStationSelector from "@/components/home/filter/SubwayStationSelector";
import TypeSelector from "@/components/home/filter/TypeSelector";

import { SHARE_ONLY_ROOM_TYPES } from "@/constants/housing-options";

const BackHeader = dynamic(
  () => import("@/components/layout/header/BackHeader"),
  { ssr: false },
);

const Filter = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    selectedTypes,
    selectedRoomTypes,
    billIncluded,
    availableFrom,
    availableTo,
    immediate,
    negotiable,
    minWeeklyCost,
    maxWeeklyCost,
    suburb,
    radiusKm,
    setFilters,
    isHydrated,
    resetFilters,
  } = useFilterStore();

  const { data: metroStops } = useMetroStops();

  useEffect(() => {
    if (metroStops) {
      useMetroStore.getState().setStops(metroStops);
    }
  }, [metroStops]);

  const [tempFilters, setTempFilters] = useState({
    selectedTypes,
    selectedRoomTypes,
    billIncluded: null as boolean | null,
    availableFrom,
    availableTo,
    immediate: null as boolean | null,
    negotiable: null as boolean | null,
    minWeeklyCost,
    maxWeeklyCost,
    radiusKm,
    selectedMetroStop: null as {
      id: number | null;
      name: string;
      latitude: number | null;
      longitude: number | null;
    } | null,
  });

  const debouncedMinCost = useDebouncedValue(tempFilters.minWeeklyCost, 500);
  const debouncedMaxCost = useDebouncedValue(tempFilters.maxWeeklyCost, 500);
  const debouncedRadiusKm = useDebouncedValue(tempFilters.radiusKm, 500);

  const params = buildQueryParams({
    ...tempFilters,
    minWeeklyCost: debouncedMinCost,
    maxWeeklyCost: debouncedMaxCost,
    radiusKm: debouncedRadiusKm,
    metroStopLatitude: tempFilters.selectedMetroStop?.latitude ?? null,
    metroStopLongitude: tempFilters.selectedMetroStop?.longitude ?? null,
    suburb,
  });

  const { data } = usePropertySearch(params);
  const count = data?.count ?? 0;

  const isDisabled = (type: string) => {
    if (
      tempFilters.selectedTypes.includes("쉐어") &&
      tempFilters.selectedTypes.includes("렌트")
    ) {
      return false;
    }

    if (tempFilters.selectedTypes.includes("쉐어")) {
      return !SHARE_ONLY_ROOM_TYPES.includes(type);
    }

    if (tempFilters.selectedTypes.includes("렌트")) {
      return SHARE_ONLY_ROOM_TYPES.includes(type);
    }

    return false;
  };

  const handleChange = <K extends keyof typeof tempFilters>(
    key: K,
    value:
      | (typeof tempFilters)[K]
      | ((prev: (typeof tempFilters)[K]) => (typeof tempFilters)[K]),
  ) => {
    setTempFilters(prev => ({
      ...prev,
      [key]:
        typeof value === "function"
          ? (
              value as (
                prev: (typeof tempFilters)[K],
              ) => (typeof tempFilters)[K]
            )(prev[key])
          : value,
    }));
  };

  const toggleType = (type: "쉐어" | "렌트") => {
    handleChange("selectedTypes", prev => {
      const next = prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type];

      if (next.length === 0) {
        handleChange("selectedRoomTypes", []);
      }

      return next;
    });
  };

  const toggleRoomType = (type: string) => {
    if (tempFilters.selectedTypes.length === 0) {
      setAlertMessage("매물종류를 선택해주세요");
      return;
    }
    if (isDisabled(type)) return;
    handleChange("selectedRoomTypes", prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type],
    );
  };

  const handleReset = () => {
    setTempFilters({
      selectedTypes: [],
      selectedRoomTypes: [],
      billIncluded: null,
      availableFrom: null,
      availableTo: null,
      immediate: null,
      negotiable: null,
      minWeeklyCost: null,
      maxWeeklyCost: null,
      radiusKm: null,
      selectedMetroStop: null,
    });
    resetFilters();
  };

  const handleApply = () => {
    setFilters({
      selectedTypes: tempFilters.selectedTypes,
      selectedRoomTypes: tempFilters.selectedRoomTypes,
      billIncluded: tempFilters.billIncluded ?? false,
      availableFrom: tempFilters.availableFrom,
      availableTo: tempFilters.availableTo,
      immediate: tempFilters.immediate ?? false,
      negotiable: tempFilters.negotiable ?? false,
      minWeeklyCost: debouncedMinCost,
      maxWeeklyCost: debouncedMaxCost,
      radiusKm: debouncedRadiusKm,
      selectedMetroStop: tempFilters.selectedMetroStop,
    });

    router.push("/home");
  };

  const animatedCount = useCountUp(count, 800);

  useEffect(() => {
    if (isHydrated) {
      setTempFilters(prev => ({
        ...prev,
        selectedTypes,
        selectedRoomTypes,
        billIncluded,
        availableFrom,
        availableTo,
        immediate,
        negotiable,
        minWeeklyCost,
        maxWeeklyCost,
        radiusKm,
        selectedMetroStop: useFilterStore.getState().selectedMetroStop ?? null,
      }));
    }
  }, [isHydrated]);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden pb-39.5">
      <BackHeader />

      <TypeSelector
        selectedTypes={tempFilters.selectedTypes}
        onSelect={toggleType}
      />
      <Divider />

      <RoomTypeSelector
        selectedRoomTypes={tempFilters.selectedRoomTypes}
        toggleRoomType={toggleRoomType}
        isDisabled={isDisabled}
      />
      <Divider />

      <BudgetSlider
        minWeeklyCost={tempFilters.minWeeklyCost}
        maxWeeklyCost={tempFilters.maxWeeklyCost}
        billIncluded={tempFilters.billIncluded}
        onBudgetChange={(min, max) => {
          handleChange("minWeeklyCost", min);
          handleChange("maxWeeklyCost", max);
        }}
        onBillToggle={() => {
          handleChange("billIncluded", !tempFilters.billIncluded);
        }}
      />
      <Divider />

      <div className="flex flex-col py-4">
        <span className="text-heading3 p-4 text-gray-900">입주 가능일</span>
        <AvailableDatePicker
          availableFrom={tempFilters.availableFrom}
          availableTo={tempFilters.availableTo}
          immediate={tempFilters.immediate}
          negotiable={tempFilters.negotiable}
          onDateChange={(from, to) => {
            handleChange("availableFrom", from);
            handleChange("availableTo", to);
          }}
          onImmediateToggle={() =>
            handleChange("immediate", !tempFilters.immediate)
          }
          onNegotiableToggle={() =>
            handleChange("negotiable", !tempFilters.negotiable)
          }
        />
      </div>

      <Divider />

      <SubwayStationSelector
        radiusKm={tempFilters.radiusKm}
        onChangeRadiusKm={value => handleChange("radiusKm", value)}
        onSelectStop={id => {
          const stop = useMetroStore.getState().stops.find(s => s.id === id);
          if (stop) {
            handleChange("selectedMetroStop", {
              id: stop.id,
              name: stop.stopName,
              latitude: stop.stopLatitude,
              longitude: stop.stopLongitude,
            });
          } else {
            handleChange("selectedMetroStop", null);
          }
        }}
      />

      <BottomActionBar
        buttons={[
          { label: "초기화", onClick: handleReset, variant: "outline" },
          {
            label: `매물 ${animatedCount}개`,
            onClick: handleApply,
            disabled:
              tempFilters.selectedTypes.length === 0 ||
              tempFilters.selectedRoomTypes.length === 0 ||
              count === 0,
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
