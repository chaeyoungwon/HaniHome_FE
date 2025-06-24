"use client";

import { useParams, useRouter } from "next/navigation";

import { useConfirmSchedules } from "@/hooks/reservation/useConfirmSchedule";

import { formatDateTime, getTimeLabel } from "@/utils/time";

import BottomActionBar from "@/components/common/BottomActionBar";
import UserRoomPreview from "@/components/common/UserRoomPreview";
import BackHeader from "@/components/layout/header/BackHeader";
import ViewingScheduleSection from "@/components/reservation/ViewingScheduleSection";

import NoteIcon from "@/public/svgs/reservation/note-icon.svg";

const ViewingConfirmPage = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const {
    selectedSchedule,
    changeableSchedules,
    overlappingSchedules,
    handleSelectSchedule,
  } = useConfirmSchedules(id);
  if (!selectedSchedule) return null;

  const periodInfo = getTimeLabel(selectedSchedule.time);

  return (
    <div className="pb-31">
      <BackHeader title="뷰잉 예약" />
      <span className="text-lab1-sb flex w-full items-center justify-center text-gray-600">
        확정될 예약 일정
      </span>

      {/* 상단: 선택된 일정 표시 */}
      <div className="my-13 p-4">
        <div className="flex flex-col items-center gap-15">
          <UserRoomPreview
            userImg="/svgs/common/profile-img.svg"
            roomImg="/svgs/common/room-img.svg"
            variant="lg"
          />
          <div className="flex flex-col items-center gap-4">
            <NoteIcon />
            <div className="text-heading4 text-mint flex flex-col gap-1">
              <p>
                {
                  formatDateTime(selectedSchedule.date, selectedSchedule.time)
                    .formattedDate
                }
              </p>
              <div className="flex justify-center gap-2">
                <span>{periodInfo.period}</span>
                <div>
                  <span>{periodInfo.hour}</span>
                  <span>&nbsp;:&nbsp;</span>
                  <span>{periodInfo.minute}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-heading3 p-4 text-center text-gray-800">
        가장 빠른 일정으로 뷰잉을 예약할게요
      </div>

      {/* 변경 가능한 일정 */}
      {changeableSchedules.length > 0 && (
        <ViewingScheduleSection
          title="다른 일정으로 변경할 수 있어요"
          schedules={changeableSchedules}
          onSelect={s => {
            if (s.date === null) return;
            handleSelectSchedule({ date: s.date, time: s.time });
          }}
        />
      )}

      {/* 중복 일정 */}
      {overlappingSchedules.length > 0 && (
        <ViewingScheduleSection
          title="기존에 예약한 일정과 중복되어 예약할 수 없어요"
          schedules={overlappingSchedules}
          disabled
        />
      )}

      <BottomActionBar
        label="뷰잉 예약 확정"
        onClick={() => router.push(`/viewing/reservation/${id}/complete`)}
      />
    </div>
  );
};

export default ViewingConfirmPage;
