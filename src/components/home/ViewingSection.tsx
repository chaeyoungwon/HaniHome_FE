"use client";

import { useAuthStore } from "@/stores/useAuthStore";

import ViewingBox from "@/components/home/ViewingBox";

import { viewingLists } from "@/constants/mock/viewing-lists";

const ViewingSection = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  return (
    <div className="flex flex-col gap-3 border-t border-gray-200 bg-white py-5">
      <span className="text-heading3 px-4 text-gray-900">
        다가오는 뷰잉 일정
      </span>

      {isLoggedIn ? (
        <div className="scrollbar-hide flex w-full max-w-[375px] gap-1 overflow-x-auto px-4">
          {viewingLists.map(viewing => (
            <div key={viewing.id} className="flex shrink-0">
              <ViewingBox
                date={viewing.date}
                time={viewing.time}
                profileImg={viewing.profileImg}
                roomImg={viewing.roomImg}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-4 mt-1 flex w-[343px]">
          <span className="bg-mint-light border-mint text-mint text-lab1-sb flex h-10 w-full items-center justify-center rounded border">
            {" "}
            로그인 후 이용할 수 있습니다
          </span>
        </div>
      )}
    </div>
  );
};

export default ViewingSection;
