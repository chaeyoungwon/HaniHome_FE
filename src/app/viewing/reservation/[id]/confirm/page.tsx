"use client";

import { useParams, useRouter } from "next/navigation";

import { useEffect } from "react";

import { useViewingScheduleStore } from "@/stores/useViewingScheduleStore";

import BottomActionBar from "@/components/common/BottomActionBar";
import Divider from "@/components/common/Divider";
import BackHeader from "@/components/layout/header/BackHeader";
import ViewingScheduleCard from "@/components/reservation/ViewingScheduleCard";

const ViewingConfirmPage = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { setActiveId, getSchedules } = useViewingScheduleStore();

  useEffect(() => {
    setActiveId(id);
  }, [id, setActiveId]);

  const schedules = getSchedules();

  return (
    <>
      <BackHeader title="뷰잉 예약" />
      <h1 className="text-heading3 p-4 text-gray-900">
        최종 뷰잉 일정을 확인해주세요
      </h1>

      {schedules.map((s, i) => {
        if (!s.date || s.time === "NN : NN") return null;

        return (
          <div key={i}>
            <ViewingScheduleCard date={s.date} time={s.time} />
            {schedules
              .slice(i + 1)
              .some(s => s.date && s.time !== "NN : NN") && <Divider my="1" />}
          </div>
        );
      })}
      <BottomActionBar
        label="뷰잉 예약 확정"
        onClick={() => router.push(`/viewing/reservation/${id}/complete`)}
      />
    </>
  );
};

export default ViewingConfirmPage;
