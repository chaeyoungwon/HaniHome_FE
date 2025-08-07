"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { getTemporaryPropertyId } from "@/apis/propertyApi";

import { formatMeetingDay } from "@/utils/formatter/dateFormatter";

import BackHeader from "@/components/layout/header/BackHeader";

import { TemporaryPropertyId } from "@/types/temporaryProperty.type";

const ListingDraft = () => {
  const router = useRouter();

  const [temporaryProperties, setTemporaryProperties] = useState<
    TemporaryPropertyId[]
  >([]);
  useEffect(() => {
    const fetchTemporaryProperties = async () => {
      try {
        const data = await getTemporaryPropertyId();
        setTemporaryProperties(data); // 성공 시 상태 저장
        console.log(data);
      } catch (error) {
        console.error("임시 저장 매물 조회 실패:", error);
      }
    };

    fetchTemporaryProperties();
  }, []);

  const handleClick = (property: TemporaryPropertyId) => {
    router.push(
      `/listings/create?step=listingType&draftId=${property.temporaryPropertyId}`,
    );
  };

  return (
    <>
      <BackHeader />
      <div>
        {temporaryProperties.length === 0 ? (
          <div className="text-body2 px-4 py-4 text-gray-400">
            임시 저장된 매물이 없습니다.
          </div>
        ) : (
          temporaryProperties.map(property => {
            const formatted = formatMeetingDay(property.createdAt);
            return (
              <div
                key={property.temporaryPropertyId}
                className="text-body1-sb cursor-pointer px-4 py-3 text-gray-800"
                onClick={() => handleClick(property)}
              >
                {formatted.fullDate} {formatted.weekday} {formatted.time}
              </div>
            );
          })
        )}
      </div>
    </>
  );
};
export default ListingDraft;
