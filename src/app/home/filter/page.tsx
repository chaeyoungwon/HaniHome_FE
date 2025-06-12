"use client";

import { useState } from "react";

import AlertMessage from "@/components/common/AlertMessage";
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
  const [selectedTypes, setSelectedTypes] = useState<("쉐어" | "렌트")[]>([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const isDisabled = (type: string) => {
    if (selectedTypes.includes("쉐어") && selectedTypes.includes("렌트")) {
      return false;
    }
    if (selectedTypes.includes("쉐어")) {
      return !SHARE_ONLY_ROOM_TYPES.includes(type);
    }
    if (selectedTypes.includes("렌트")) {
      return SHARE_ONLY_ROOM_TYPES.includes(type);
    }
    return false;
  };

  const toggleType = (type: "쉐어" | "렌트") => {
    setSelectedTypes(prev => {
      const next = prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type];

      if (next.length === 0) {
        setSelectedRoomTypes([]);
      }
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
    setSelectedTypes([]);
    setSelectedRoomTypes([]);
  };

  const handleApply = () => {
    console.log("적용된 필터:", { selectedTypes, selectedRoomTypes });
  };

  const count: number = 1; // TODO: 필터 로직과 연결해서 매물 수 계산

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden pb-39.5">
      <BackHeader />
      {/* 매물 종류 */}
      <TypeSelector selectedTypes={selectedTypes} onSelect={toggleType} />
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
