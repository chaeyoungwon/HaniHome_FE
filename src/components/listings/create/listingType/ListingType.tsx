import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { useListingStore } from "@/stores/useListingStore";

import { getTemporaryPropertyId } from "@/apis/propertyApi";

import { formatMeetingDay } from "@/utils/formatter/dateFormatter";

import BackHeader from "@/components/layout/header/BackHeader";

import { FUNNEL_STEPS_MAP } from "@/constants/funnel-steps";

import { TemporaryPropertyId } from "@/types/temporaryProperty.type";

import LeftArrow from "@/public/svgs/common/left-arrow.svg";
import RentIcon from "@/public/svgs/listings/rent-icon.svg";
import ShareIcon from "@/public/svgs/listings/share-icon.svg";

interface ListingTypeProps {
  onSelectType: (type: "SHARE" | "RENT") => void;
  variant?: "create" | "edit";
}
const ListingType = ({
  onSelectType,
  variant = "create",
}: ListingTypeProps) => {
  const router = useRouter();
  const { listingType, setListingType } = useListingStore();
  const [temporaryProperties, setTemporaryProperties] = useState<
    TemporaryPropertyId[]
  >([]);

  const handleClick = (type: "SHARE" | "RENT") => {
    setListingType(type);
    onSelectType(type);
  };

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

  return (
    <>
      <BackHeader />
      <div className="py-9">
        <div className="gray-900 text-heading2 px-4 py-3">
          {variant == "create" ? (
            <>
              반가워요!
              <br /> 어떤 매물을 내놓을까요?
            </>
          ) : (
            <>어떤 매물을 내놓을까요?</>
          )}
        </div>
        <div className="flex items-center justify-center gap-6 px-4 py-8">
          {/*쉐어 */}
          <div
            onClick={() => handleClick("SHARE")}
            className={`group hover:bg-mint-light hover:text-mint hover:border-mint flex h-[140px] w-[140px] cursor-pointer flex-col gap-4 rounded-[4px] border ${
              listingType === "SHARE"
                ? "bg-mint-light border-mint text-mint"
                : "border-gray-400 text-gray-800"
            } px-9 py-5`}
          >
            <ShareIcon />
            <div className="text-body1-sb group-hover:text-mint flex items-center justify-center">
              쉐어
            </div>
          </div>
          {/*렌트 */}
          <div
            onClick={() => handleClick("RENT")}
            className={`group hover:bg-mint-light hover:text-mint hover:border-mint flex h-[140px] w-[140px] cursor-pointer flex-col gap-4 rounded-[4px] border ${listingType === "RENT" ? "bg-mint-light border-mint text-mint" : "border-gray-400 text-gray-800"} px-9 py-5`}
          >
            <RentIcon />
            <div className="group-hover:text-mint text-body1-sb flex items-center justify-center">
              렌트
            </div>
          </div>
        </div>
      </div>

      {/* 임시저장 데이터 있는 경우 노출 */}
      {temporaryProperties.length > 0 && (
        <>
          <div
            className="flex cursor-pointer items-center justify-between p-4"
            onClick={() => router.push(`/listings/draft`)}
          >
            <div className="text-body1-sb">이전에 저장한 매물</div>
            <div className="h-[18px] w-[18px] rotate-180">
              <LeftArrow />
            </div>
          </div>
          {temporaryProperties.map(property => {
            const formatted = formatMeetingDay(property.createdAt);
            const lastStepItem = FUNNEL_STEPS_MAP.find(
              step => step.key === property.lastStep,
            );
            const lastStep = lastStepItem?.label ?? "addressPhoto";
            return (
              <div
                key={property.temporaryPropertyId}
                className="text-body2-med cursor-pointer px-4 py-2 text-gray-700"
                onClick={() =>
                  router.push(
                    `/listings/create?step=${lastStep}&draftId=${property.temporaryPropertyId}`,
                  )
                }
              >
                {formatted.fullDate} {formatted.weekday} {formatted.time}
              </div>
            );
          })}
        </>
      )}
    </>
  );
};
export default ListingType;
