"use client";

import { useEffect, useState } from "react";

import { getCoordsFromRegion } from "@/apis/googlePlaces";

import { formatAddress } from "@/utils/formatAddress";

import GoogleMap from "@/components/common/GoogleMap";

import { RegionType } from "@/types/listingDetail";

interface AddressMapProps {
  region: RegionType;
  isReservationConfirmed: boolean;
}

const AddressMap = ({ region, isReservationConfirmed }: AddressMapProps) => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  useEffect(() => {
    getCoordsFromRegion(region).then(res => {
      if (res) setCoords(res);
    });
  }, [region]);

  if (!coords) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      {/* 지도 */}
      <div className="relative h-[343px] w-[343px] overflow-hidden">
        <GoogleMap lat={coords.lat} lng={coords.lng} />

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
        <div className="bg-gray-0 text-body1-sb flex flex-col gap-2 rounded p-2 text-gray-900">
          <p> {formatAddress(region)}</p>
          <p>unit. no</p>
        </div>
      )}
    </div>
  );
};

export default AddressMap;
