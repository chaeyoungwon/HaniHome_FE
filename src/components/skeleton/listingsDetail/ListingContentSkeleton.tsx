const ListingContentSkeleton = () => {
  return (
    <div className="pointer-events-none">
      {/* 이미지 영역 */}
      <div className="h-[375px] w-[375px] animate-pulse bg-gray-200" />

      {/* 프로필 영역 */}
      <div className="flex items-center gap-[14px] border-b border-gray-200 px-4 py-3">
        <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />
        <div className="h-[22px] w-15 animate-pulse rounded bg-gray-200" />
      </div>

      {/* 상단 요약 */}
      <div className="flex justify-between px-4 py-7">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="h-7.5 w-25 animate-pulse rounded bg-gray-200" />
            <div className="h-7.5 w-[57px] animate-pulse rounded-[100px] bg-gray-200" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-[22px] w-[30px] animate-pulse rounded bg-gray-200" />
            <span className="h-3 w-px bg-gray-200" />
            <div className="h-[22px] w-[60px] animate-pulse rounded bg-gray-200" />
          </div>
        </div>
        <div className="flex h-[70px] flex-col items-end gap-4">
          <div className="flex items-center gap-1">
            <div className="h-4 w-[34px] animate-pulse rounded bg-gray-200" />
            <div className="h-[18px] w-[18px] animate-pulse rounded bg-gray-200" />
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="h-4 w-[104px] animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-[70px] animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingContentSkeleton;
