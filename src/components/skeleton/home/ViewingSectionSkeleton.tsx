const ViewingBoxSkeleton = () => {
  return (
    <div className="flex w-fit shrink-0 animate-pulse gap-4 rounded-sm border border-gray-200 px-3 py-2">
      <div className="relative shrink-0" style={{ width: 36, height: 36 }}>
        <div className="absolute top-0 left-0 z-1 h-6 w-6 rounded-full border-[0.67px] border-gray-300 bg-gray-200" />
        <div className="absolute top-3 left-3 h-6 w-6 rounded-[2.67px] border-[0.67px] border-gray-300 bg-gray-200" />
      </div>

      {/* 시간 정보 자리 */}
      <div className="flex flex-col justify-center gap-[2px]">
        <div className="h-[15px] w-[64px] rounded bg-gray-200" />
        <div className="h-[20px] w-[64px] rounded bg-gray-200" />
      </div>
    </div>
  );
};

const ViewingSectionSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 border-t border-gray-200 bg-white py-5">
      <span className="text-heading3 px-4 text-gray-900">
        다가오는 뷰잉 일정
      </span>

      <div className="scrollbar-hide flex w-full max-w-[430px] gap-1 overflow-x-auto px-4">
        {[...Array(3)].map((_, idx) => (
          <ViewingBoxSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
};

export default ViewingSectionSkeleton;
