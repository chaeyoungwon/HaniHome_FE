"use client";

import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";

import { useViewingScheduleStore } from "@/stores/useViewingScheduleStore";
import { useQueryClient } from "@tanstack/react-query";

import { createViewing } from "@/apis/viewingApi";

import { usePropertyList } from "@/hooks/property/usePropertyApi";

import { formatDateTime, getTimeLabel } from "@/utils/formatter/dateFormatter";

import BottomActionBar from "@/components/common/BottomActionBar";
import ViewingPostCard from "@/components/common/ViewingPostCard";

import NoteIcon from "@/public/svgs/reservation/note-icon.svg";

const BackHeader = dynamic(
  () => import("@/components/layout/header/BackHeader"),
  { ssr: false },
);

const ViewingConfirmPage = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      <ViewingPostCard
        thumbnailUrl={thumbnailUrl}
        weeklyCost={weeklyCost}
        suburb={suburb}
        internalArea={internalArea}
        totalFloors={totalFloors}
        kind={kind}
        billIncluded={billIncluded}
        distanceInKm={nearestStation.distanceFromStation}
        wrapperClassName="px-4 py-3"
      />

      <BottomActionBar
        label="뷰잉 예약 확정"
        disabled={isSubmitting}
        onClick={async () => {
          if (isSubmitting) return;
          setIsSubmitting(true);

          try {
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
          } catch (err) {
            console.error(err);
          } finally {
            setIsSubmitting(false);
          }
        }}
      />
    </div>
  );
};

export default ViewingConfirmPage;
