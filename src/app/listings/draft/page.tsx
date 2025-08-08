"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { getTemporaryPropertyId } from "@/apis/propertyApi";

import { formatMeetingDay } from "@/utils/formatter/dateFormatter";

import { FUNNEL_STEPS_MAP } from "@/constants/funnel-steps";

import { TemporaryPropertyId } from "@/types/temporaryProperty.type";

const BackHeader = dynamic(
  () => import("@/components/layout/header/BackHeader"),
  { ssr: false },
);

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
      } catch (error) {
        console.error("임시 저장 매물 조회 실패:", error);
      }
    };

    fetchTemporaryProperties();
  }, []);

  const handleClick = (property: TemporaryPropertyId) => {
    const lastStepItem = FUNNEL_STEPS_MAP.find(
      step => step.key === property.status,
    );
    const lastStep = lastStepItem?.label ?? "addressPhoto";
    router.push(
      `/listings/create?step=${lastStep}&draftId=${property.temporaryPropertyId}`,
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
