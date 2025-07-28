import Section from "@/components/listings/shared/Section";

const ListingDetailSkeleton = () => {
  return (
    <div className="bg-gray-0 flex flex-col py-3">
      {/* 매물 유형 */}
      <div className="px-4 py-3">
        <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
      </div>

      {/* 쉐어 인원 & 층수 카드 */}
      <Section>
        <div className="flex w-full py-3">
          {/* 쉐어 인원 */}
          <div className="flex w-1/2 flex-col gap-2 px-4">
            <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-5 w-5 animate-pulse rounded-full bg-gray-300" />
                <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>

          {/* 층수 */}
          <div className="flex w-1/2 flex-col gap-2 px-4">
            <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-5 w-5 animate-pulse rounded-full bg-gray-300" />
                <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 주차 */}
      <Section>
        <div className="flex flex-col gap-2 px-4 py-3">
          <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-40 animate-pulse rounded bg-gray-100" />
        </div>
      </Section>

      {/* 가구 포함 */}
      <Section>
        <div className="flex flex-col gap-2 px-4 py-3">
          <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
          <div className="flex flex-wrap gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-4 w-20 animate-pulse rounded bg-gray-100"
              />
            ))}
          </div>
        </div>
      </Section>

      {/* 호스트 소개 */}
      <Section withDivider={false}>
        <div className="flex flex-col gap-2 px-4 py-3">
          <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-64 animate-pulse rounded bg-gray-100" />
          <div className="h-4 w-[70%] animate-pulse rounded bg-gray-100" />
        </div>
      </Section>
    </div>
  );
};

export default ListingDetailSkeleton;
