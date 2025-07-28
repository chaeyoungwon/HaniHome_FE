import Label from "@/components/listings/shared/Label";
import Section from "@/components/listings/shared/Section";

const ContractInfoSkeleton = () => {
  return (
    <div className="bg-gray-0 flex flex-col py-3">
      {/* 빌 포함 항목 */}
      <Section>
        <div className="flex flex-col gap-4 px-4 py-3">
          <Label>빌 포함 항목</Label>
          <div className="flex flex-wrap items-center gap-2">
            {[...Array(6)].flatMap((_, idx) => {
              const item = (
                <div
                  key={`item-${idx}`}
                  className="h-[21px] w-[37px] animate-pulse rounded bg-gray-200"
                />
              );
              const divider =
                idx < 5 ? (
                  <span
                    key={`divider-${idx}`}
                    className="h-3 w-px bg-gray-300"
                  />
                ) : null;

              return [item, divider];
            })}
          </div>
          <div className="text-body2-med bg-gray-0 h-[33px] rounded border border-gray-400 px-3 py-1.5 text-gray-600">
            주차비는 주/20$ 입니다
          </div>
        </div>
      </Section>

      {/* 디파짓 */}
      <Section>
        <div className="flex flex-col gap-3 px-4 py-3">
          <div className="flex items-center justify-between">
            <Label>디파짓</Label>
            <div className="text-body1-med text-gray-700">$/주</div>
          </div>
          <div className="h-4 w-[218px] animate-pulse rounded bg-gray-200" />
        </div>
      </Section>

      {/* 계약 형태 설명 */}
      <Section withDivider={false}>
        <div className="flex flex-col gap-3 px-4 py-3">
          <Label>계약 형태 설명</Label>
          <div className="flex flex-col gap-2">
            <div className="text-body2-med bg-gray-0 h-[33px] rounded border border-gray-400 px-3 py-1.5 text-gray-600">
              월 단위로 계약합니다
            </div>
            <div className="h-4 w-[135px] animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ContractInfoSkeleton;
