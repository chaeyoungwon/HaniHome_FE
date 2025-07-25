"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { useMyViewingList } from "@/hooks/viewing/useViewing";

import ViewingBox from "@/components/home/ViewingBox";

import { MyViewingDateProfile } from "@/types/viewing";

dayjs.extend(utc);
dayjs.extend(timezone);

const ViewingSection = () => {
  const { isLoggedIn, isAuthInitialized } = useAuthStore();
  const { data } = useMyViewingList<MyViewingDateProfile[]>({
    view: "DATE_PROFILE",
    enabled: isLoggedIn === true,
  });

  const today = dayjs().startOf("day");

  if (!isAuthInitialized) return null;

  const getDisplayDate = (date: dayjs.Dayjs) => {
    const today = dayjs().startOf("day");
    const target = date.startOf("day");

    const diff = target.diff(today, "day");

    if (diff === 0) return "오늘";
    if (diff === 1) return "내일";
    if (diff === 2) return "모레";

    return date.format("YYYY.MM.DD");
  };

  const filteredData = data?.filter(viewing => {
    const viewingDate = dayjs
      .utc(viewing.meetingDay)
      .tz(dayjs.tz.guess())
      .startOf("day");
    const diff = viewingDate.diff(today, "day");

    return diff >= 0 && diff <= 2;
  });

  return (
    <div className="flex flex-col gap-3 border-t border-gray-200 bg-white py-5">
      <span className="text-heading3 px-4 text-gray-900">
        다가오는 뷰잉 일정
      </span>

      {isLoggedIn ? (
        <div className="scrollbar-hide flex w-full max-w-[375px] gap-1 overflow-x-auto px-4">
          {filteredData && filteredData.length > 0 ? (
            filteredData.map(viewing => {
              const day = dayjs.utc(viewing.meetingDay).tz(dayjs.tz.guess());

              return (
                <div key={viewing.id} className="flex shrink-0">
                  <ViewingBox
                    date={getDisplayDate(day)}
                    time={day.format("A h:mm")}
                    profileImg={viewing.propertyThumbnailUrl || ""}
                    roomImg={"/svgs/common/room-img.svg"}
                  />
                </div>
              );
            })
          ) : (
            <div className="text-cap1-med flex h-[53px] w-full shrink-0 items-center justify-center text-center text-gray-500">
              3일 내 예약한 뷰잉이 없어요
            </div>
          )}
        </div>
      ) : (
        <div className="mx-4 mt-1 flex w-[343px]">
          <span className="bg-mint-light border-mint text-mint text-lab1-sb flex h-10 w-full items-center justify-center rounded border">
            로그인 후 이용할 수 있습니다
          </span>
        </div>
      )}
    </div>
  );
};

export default ViewingSection;
