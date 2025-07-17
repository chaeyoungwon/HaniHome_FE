"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { useViewingScheduleStore } from "@/stores/useViewingScheduleStore";
import { useQueryClient } from "@tanstack/react-query";

import { createViewing } from "@/apis/viewing";

import { usePropertyList } from "@/hooks/property/useProperty";

import { formatDateTime, getTimeLabel } from "@/utils/dateFormatter";

import BottomActionBar from "@/components/common/BottomActionBar";
import Dot from "@/components/common/Dot";
import BackHeader from "@/components/layout/header/BackHeader";

import NoteIcon from "@/public/svgs/reservation/note-icon.svg";

const ViewingConfirmPage = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: summaryList, isLoading } = usePropertyList({ view: "SUMMARY" });
  const { getSchedule, reset } = useViewingScheduleStore();
  const selectedSchedule = getSchedule(id);

  if (isLoading) return null;
  if (!selectedSchedule.date) return null;

  const summary = summaryList?.find(item => item.id === Number(id));
  if (!summary) return null;

  const {
    thumbnailUrl,
    weeklyCost,
    internalArea,
    totalFloors,
    suburb,
    kind,
    nearestStation,
    billIncluded,
  } = summary;

  const periodInfo = getTimeLabel(selectedSchedule.time);

  const submitViewingReservation = async ({
    propertyId,
    date,
    time,
  }: {
    propertyId: number;
    date: Date;
    time: string;
  }) => {
    const [hour, minute] = time.split(":");

    const bookingDate = new Date(date);
    bookingDate.setHours(Number(hour));
    bookingDate.setMinutes(Number(minute));
    bookingDate.setSeconds(0);
    bookingDate.setMilliseconds(0);

    return createViewing({
      propertyId,
      preferredTimes: [bookingDate.toISOString()],
    });
  };

  const displayType = kind === "SHARE" ? "쉐어" : "렌트";
  const distanceInKm = (nearestStation.distanceFromStation / 1000).toFixed(1);

  return (
    <div className="pb-31">
      <BackHeader title="뷰잉 예약" />

      {/* 선택된 일정 표시 */}
      <div className="my-[71px] flex flex-col gap-6">
        <div className="flex flex-col items-center">
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

        <p className="text-heading3 p-4 text-center text-gray-800">
          해당 일정으로 뷰잉을 예약할게요
        </p>
      </div>

      <div className="mt-12">
        <p className="text-lab1-sb px-4 py-2 text-gray-600">
          예약하려는 매물이 맞는지 다시 한번 확인해주세요
        </p>
      </div>

      <div className="flex cursor-pointer items-center justify-center gap-3 px-4 py-3">
        <Image
          src={thumbnailUrl ?? "/svgs/common/room-img.svg"}
          width={108}
          height={108}
          alt="매물 이미지"
          className="h-18 w-18 rounded-sm border border-gray-200 object-cover"
        />

        <div className="flex flex-1 flex-col justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex w-full items-center justify-between">
              <p className="text-body1-sb text-gray-900">주/ {weeklyCost}$</p>
              <span className="text-cap1-med text-gray-500">{suburb}</span>
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="text-cap1-med flex items-center gap-1 text-gray-600">
                {internalArea !== undefined && (
                  <>
                    {internalArea}㎡
                    {(totalFloors !== undefined || kind) && <Dot />}
                  </>
                )}

                {totalFloors !== undefined && (
                  <>
                    전체 {totalFloors}층{kind && <Dot />}
                  </>
                )}

                {displayType}
              </p>

              <p className="text-cap1-med flex items-center gap-1 text-gray-600">
                {billIncluded ? "빌 포함" : "빌 미포함"} <Dot /> 역까지{" "}
                {distanceInKm}km
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomActionBar
        label="뷰잉 예약 확정"
        onClick={async () => {
          await submitViewingReservation({
            propertyId: Number(id),
            date: selectedSchedule.date!,
            time: selectedSchedule.time,
          });
          reset(id);

          await queryClient.invalidateQueries({
            queryKey: ["myViewingList"],
          });
          router.push(`/viewing/reservation/${id}/complete`);
        }}
      />
    </div>
  );
};

export default ViewingConfirmPage;
