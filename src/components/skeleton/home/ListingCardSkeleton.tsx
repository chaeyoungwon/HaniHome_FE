const ListingCardSkeleton = () => {
  return (
    <div className="flex animate-pulse items-center justify-center gap-4 px-4 py-3">
      <div className="h-27 w-27 rounded-sm bg-gray-200" />

      <div className="flex h-24 flex-1 flex-col justify-between py-1">
        <div className="flex flex-col gap-2">
          <div className="flex gap-1.5">
            <div className="h-5 w-[74px] rounded bg-gray-200" />
            <div className="h-5 w-[50px] rounded-[100px] bg-gray-200" />
          </div>
          <div className="flex flex-col gap-[2px]">
            <div className="h-4 w-[125px] rounded bg-gray-200" />
            <div className="h-4 w-25 rounded bg-gray-200" />
          </div>
        </div>
        <div className="h-4 w-[58px] rounded bg-gray-200" />
      </div>

      <div className="flex h-24 flex-col items-end justify-between">
        <div className="flex items-center gap-1">
          <div className="h-[18px] w-[18px] rounded bg-gray-200" />
          <div className="h-[16px] w-[21px] rounded bg-gray-200" />
        </div>
        <div className="h-4 w-[58px] rounded bg-gray-200" />
      </div>
    </div>
  );
};

export default ListingCardSkeleton;
