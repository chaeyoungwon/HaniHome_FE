import Section from "@/components/listings/shared/Section";

const MoveInConditionSkeleton = () => {
  const conditions = [
    "주방 사용 가능",
    "외부인 방문 협의",
    "흡연자 불가능",
    "반려동물 가능",
  ];

  return (
    <div className="bg-gray-0 flex flex-col py-3">
      {/* 거주 가능 조건 */}
      <Section>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-body1-sb text-gray-900">거주 가능 조건</span>
          <div className="flex flex-col items-end gap-1">
            <div className="h-[21px] w-[105px] animate-pulse rounded bg-gray-200" />
            <div className="h-[21px] w-[66px] animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </Section>

      {/* 노티스 / 최소 거주 기간 */}
      <Section>
        <div className="flex w-full py-3">
          <div className="flex w-1/2 flex-col gap-2 px-4">
            <span className="text-body1-sb text-gray-900">노티스</span>
            <div className="h-[21px] w-[105px] animate-pulse rounded bg-gray-200" />
          </div>
          <div className="flex w-1/2 flex-col gap-2 px-4">
            <span className="text-body1-sb text-gray-900">최소 거주 기간</span>
            <div className="h-[21px] w-[105px] animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </Section>

      {/* 입주 가능일 */}
      <Section>
        <div className="flex flex-col gap-2 px-4 py-3">
          <span className="text-body1-sb text-gray-900">입주 가능일</span>
          <div className="h-[21px] w-[298px] animate-pulse rounded bg-gray-200" />
        </div>
      </Section>

      {/* 추가 고려사항 */}
      <Section>
        <div className="flex flex-col gap-3 px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-body1-sb text-gray-900">추가 고려사항</span>
            <span className="text-cap1-med text-gray-600">조건 협의 가능</span>
          </div>
          <div className="grid w-full grid-cols-2 gap-2">
            {conditions.map((item, idx) => (
              <div
                key={idx}
                className="text-body2-med flex items-center justify-center rounded bg-gray-200 px-3 py-[7.5px] text-gray-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default MoveInConditionSkeleton;
