const AreaInfo = () => {
  return (
    <div className="flex w-[204px] flex-col gap-4 rounded-[4px] border border-black bg-gray-800 p-3">
      <div className="flex flex-col gap-1">
        <span className="text-lab1-b text-white">Internal Area</span>
        <span className="text-cap1-med text-gray-300">
          실내 공간만 포함한 면적을 말해요
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-lab1-b text-white">Total Area</span>
        <span className="text-cap1-med text-gray-300">
          실내와 발코니, 테라스까지 포함한 전체 면적을 말해요
        </span>
      </div>
    </div>
  );
};
export default AreaInfo;
