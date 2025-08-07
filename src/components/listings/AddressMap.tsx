"use client";

import { formatAddress } from "@/utils/formatter/addressFormatter";

import GoogleMap from "@/components/common/GoogleMap";

import { PropertyRegion } from "@/types/listingDetailPost.type";

interface AddressMapProps {
  region: PropertyRegion;
  isReservationConfirmed: boolean;
}

const AddressMap = ({ region, isReservationConfirmed }: AddressMapProps) => {
  return (
    <div className="flex flex-col gap-3">
      {/* 지도 */}
      <div className="relative aspect-square h-full max-h-[398px] w-full max-w-[398px] overflow-hidden">
        <GoogleMap lat={region.latitude} lng={region.longitude} />

        {!isReservationConfirmed && (
          <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur">
            <p className="text-heading3 text-center text-gray-900">
              상세 주소는 뷰잉 예약 후 확인 가능합니다.
            </p>
          </div>
        )}
      </div>

      {/* 주소 정보 */}
      {isReservationConfirmed && (
        <div className="bg-gray-0 text-body1-sb flex w-full max-w-[398px] flex-col gap-2 rounded p-2 text-gray-900">
          <p> {formatAddress(region)}</p>
          <p>unit. {region.unit}</p>
        </div>
      )}
    </div>
  );
};

export default AddressMap;
