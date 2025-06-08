"use client";

import { useState } from "react";

import BottomActionBar from "@/components/common/BottomActionBar";
import Divider from "@/components/common/Divider";
import AvailableDatePicker from "@/components/home/filter/AvailableDatePicker";
import BudgetSlider from "@/components/home/filter/BudgetSlider";
import RoomTypeSelector from "@/components/home/filter/RoomTypeSelector";
import SubwayStationSelector from "@/components/home/filter/SubwayStationSelector";
import TypeSelector from "@/components/home/filter/TypeSelector";
import BackHeader from "@/components/layout/header/BackHeader";

import { SHARE_ONLY_ROOM_TYPES } from "@/constants/housing-options";

const Filter = () => {
  const [selectedType, setSelectedType] = useState<"쉐어" | "렌트">();
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);

  const isDisabled = (type: string) => {
    if (selectedType === "쉐어") return !SHARE_ONLY_ROOM_TYPES.includes(type);
    if (selectedType === "렌트") return SHARE_ONLY_ROOM_TYPES.includes(type);
    return false;
  };

  const selectType = (type: "쉐어" | "렌트") => {
    if (selectedType === type) return;

    setSelectedType(type);
    setSelectedRoomTypes([]);
  };

  const toggleRoomType = (type: string) => {
    if (!selectedType) {
      const inferred = SHARE_ONLY_ROOM_TYPES.includes(type) ? "쉐어" : "렌트";
      setSelectedType(inferred);
      setSelectedRoomTypes([type]);
      return;
    }

    if (isDisabled(type)) return;

    setSelectedRoomTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type],
    );
  };

  const handleReset = () => {
    setSelectedType(undefined);
    setSelectedRoomTypes([]); //필터 초기화 추후 추가
  };

  const handleApply = () => {
    console.log("적용된 필터:", { selectedType, selectedRoomTypes });
  };

  const count: number = 1; // TODO: 필터 로직과 연결해서 매물 수 계산

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden pt-12 pb-31">
      <BackHeader />

      {/* 매물 종류 */}
      <TypeSelector selectedType={selectedType} onSelect={selectType} />

      <Divider />

      {/* 매물 유형 */}
      <RoomTypeSelector
        selectedRoomTypes={selectedRoomTypes}
        toggleRoomType={toggleRoomType}
        isDisabled={isDisabled}
      />
      <Divider />

      {/* 예산 범위 */}
      <BudgetSlider />
      <Divider />

      {/* 입주 가능일 */}
      <AvailableDatePicker />
      <Divider />

      {/* 지하철 역 설정 */}
      <SubwayStationSelector />

      <BottomActionBar
        buttons={[
          { label: "초기화", onClick: handleReset },
          {
            label: `매물 ${count}개`,
            onClick: handleApply,
            disabled: count === 0,
          },
        ]}
      />
    </div>
  );
};

export default Filter;
