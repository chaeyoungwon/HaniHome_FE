import Image from "next/image";

import {
  getArea,
  getDisplayType,
  getDistanceInKm,
} from "@/utils/formatter/propertyFormatter";

import Dot from "@/components/common/Dot";

interface ViewingPostCardProps {
  thumbnailUrl: string | null;
  weeklyCost: number;
  suburb: string;
  internalArea?: number;
  totalFloors?: number;
  kind: "SHARE" | "RENT";
  billIncluded: boolean;
  distanceInKm: number;
  wrapperClassName?: string;
}

export const ViewingPostCard = ({
  thumbnailUrl,
  weeklyCost,
  suburb,
  internalArea,
  totalFloors,
  kind,
  billIncluded,
  distanceInKm,
  wrapperClassName = "",
}: ViewingPostCardProps) => {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${wrapperClassName}`}
    >
      <Image
        src={thumbnailUrl ?? "/svgs/common/room-img.svg"}
        width={108}
        height={108}
        alt="매물 이미지"
        unoptimized
        className="h-18 w-18 rounded-sm border border-gray-200 object-cover"
      />

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex w-full items-center justify-between">
            <p className="text-body1-sb text-gray-900">주/ {weeklyCost}$</p>
            <span className="text-cap1-med text-gray-500">
              {suburb.toLowerCase()}
            </span>
          </div>

          <div className="flex flex-col gap-[2px]">
            <p className="text-cap1-med flex items-center gap-1 text-gray-600">
              {internalArea !== undefined && (
                <>
                  {getArea(internalArea)}
                  {(totalFloors !== undefined || kind) && <Dot />}
                </>
              )}

              {totalFloors !== undefined && (
                <>
                  전체 {totalFloors}층{kind && <Dot />}
                </>
              )}

              {getDisplayType(kind)}
            </p>

            <p className="text-cap1-med flex items-center gap-1 text-gray-600">
              {billIncluded ? "빌 포함" : "빌 미포함"} <Dot /> 역까지{" "}
              {getDistanceInKm(distanceInKm)}km
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewingPostCard;
