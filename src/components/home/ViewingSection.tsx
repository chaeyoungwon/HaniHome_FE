import ViewingBox from "@/components/home/ViewingBox";

import { viewingLists } from "@/constants/viewing-lists";

const ViewingSection = () => {
  return (
    <div className="flex flex-col gap-3 border-t border-gray-200 bg-white py-5">
      <span className="text-heading3 px-4 text-gray-900">
        다가오는 뷰잉 일정
      </span>
      <div className="scrollbar-hide flex w-full max-w-[375px] gap-1 overflow-x-auto px-4">
        {viewingLists.map(viewing => (
          <div key={viewing.id} className="flex shrink-0">
            <ViewingBox
              key={viewing.id}
              date={viewing.date}
              time={viewing.time}
              profileImg={viewing.profileImg}
              roomImg={viewing.roomImg}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewingSection;
