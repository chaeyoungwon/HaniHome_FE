import Divider from "@/components/common/Divider";
import Label from "@/components/listings/shared/Label";
import Section from "@/components/listings/shared/Section";

import Arrow from "@/public/svgs/common/left-arrow.svg";

const ListingDetailSkeleton = () => {
  return (
    <div className="bg-gray-0 flex flex-col py-3">
      <div className="flex items-center justify-between px-4 py-3">
        <Label>매물 유형</Label>
        <div className="h-[22px] w-[100px] animate-pulse rounded bg-gray-200" />
      </div>

      <Divider />

      <Section>
        <div className="flex w-full py-3">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex w-1/2 flex-col gap-3 px-4">
              <div className="flex w-full items-end">-</div>
              <div className="flex items-center gap-1.5">
                <div className="h-6 w-6 animate-pulse rounded bg-gray-200" />
                <div className="h-[22px] w-[100px] animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex w-full items-center justify-between px-4 py-3">
          <span>-</span>
          <div className="h-[22px] w-[50px] animate-pulse rounded bg-gray-200" />
        </div>
      </Section>

      <Section>
        <div className="flex flex-col justify-between gap-2 px-4 py-3">
          <Label>주차</Label>
          <div className="flex items-center gap-4">
            <div className="h-[22px] w-[100px] animate-pulse rounded bg-gray-200" />
            <span className="h-3 w-px bg-gray-200" />
            <div className="h-[22px] w-[120px] animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </Section>

      <Section>
        <div
          role="button"
          tabIndex={0}
          className="flex cursor-pointer justify-between px-4 py-3"
        >
          <Label>제공되는 가구</Label>
          <Arrow className="h-6 w-6 rotate-180 text-gray-700" />
        </div>
      </Section>

      {/* 호스트 소개 */}
      <Section withDivider={false}>
        <div className="flex flex-col gap-3 px-4 py-3">
          <Label>호스트 설명</Label>
          <div className="flex w-full max-w-[398px] flex-col gap-4">
            <div className="h-[79px] w-full max-w-[398px] rounded bg-gray-200" />
            <div className="flex gap-2">
              {[...Array(3)].map((_, idx) => (
                <div
                  key={idx}
                  className="h-[29px] w-[110px] animate-pulse rounded-[100px] bg-gray-200"
                />
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ListingDetailSkeleton;
