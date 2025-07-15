import { useEffect, useState } from "react";

import { useFilterStore } from "@/stores/useFilterStore";
import Slider from "rc-slider";

import SearchField from "@/components/common/SearchField";

const MIN_DISTANCE = 0.5;
const MAX_DISTANCE = 10;

interface SubwayStationSelectorProps {
  radiusKm: number | null;
  onChangeRadiusKm: (value: number) => void;
  onSelectStop: (stopId: number | null, stopName: string) => void;
}

const SubwayStationSelector = ({
  radiusKm,
  onChangeRadiusKm,
  onSelectStop,
}: SubwayStationSelectorProps) => {
  const { selectedMetroStop } = useFilterStore();

  const [inputValue, setInputValue] = useState(selectedMetroStop?.name || "");
  const [localRadiusKm, setLocalRadiusKm] = useState(radiusKm ?? MAX_DISTANCE);

  useEffect(() => {
    setLocalRadiusKm(radiusKm ?? MAX_DISTANCE);
  }, [radiusKm]);

  const handleChange = (value: number | number[]) => {
    setLocalRadiusKm(value as number);
  };

  const handleAfterChange = (value: number | number[]) => {
    const v = value as number;
    const newDistance = v === 0 ? MIN_DISTANCE : v;

    setLocalRadiusKm(newDistance);
    onChangeRadiusKm(newDistance);
  };

  useEffect(() => {
    setInputValue(selectedMetroStop?.name || "");
  }, [selectedMetroStop]);

  return (
    <div className="flex flex-col gap-3 px-4 py-4">
      <div className="flex flex-col">
        <span className="text-heading3 py-4 text-gray-900">지하철 역 설정</span>
        <SearchField
          label="기준 지하철 역 검색"
          value={inputValue}
          onChange={val => {
            setInputValue(val);

            if (val.trim() === "") {
              onSelectStop(null, "");
            }
          }}
          placeholder="검색어를 입력해주세요"
          type="subway"
          onSearchClick={(id, name) => {
            setInputValue(name);
            if (!id || id === "") {
              onSelectStop(null, "");
            } else {
              onSelectStop(Number(id), name);
            }
          }}
        />
      </div>

      <div className="flex flex-col gap-1 py-3">
        <span className="text-body1-sb text-gray-800">거리 설정</span>
        <div className="relative mt-[6px] flex w-full justify-center">
          <div className="absolute top-2 left-0 z-0 h-1 w-full -translate-y-1/2 rounded-full bg-gray-100" />
          <div className="bg-mint absolute top-2 left-0 z-10 h-1 w-[5%] -translate-y-1/2 rounded-full transition-all duration-200" />

          <div className="w-[327px] pb-[30px]">
            <Slider
              className="custom-slider my-[1px]"
              value={localRadiusKm}
              min={0}
              max={MAX_DISTANCE}
              step={0.5}
              onChange={handleChange}
              onChangeComplete={handleAfterChange}
              marks={{
                0: {
                  label: (
                    <span className="text-cap1-med ml-2 text-gray-400">
                      0km
                    </span>
                  ),
                },
                [MAX_DISTANCE]: {
                  label: (
                    <span className="text-cap1-med mr-4 text-gray-400">
                      {MAX_DISTANCE}km
                    </span>
                  ),
                },
              }}
            />
          </div>
        </div>

        <div className="text-lab1-sb flex gap-2 py-1">
          <span className="text-gray-600">지하철 역으로부터</span>
          <span className="text-mint">{localRadiusKm} km</span>
          <span className="text-gray-600">내 매물까지 포함해요</span>
        </div>
      </div>
    </div>
  );
};

export default SubwayStationSelector;
