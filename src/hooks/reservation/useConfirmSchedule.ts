import { useMemo } from "react";

import { eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { useViewingAvailableDates } from "@/hooks/viewing/useViewing";

import { TIME_OPTIONS, TimeLabel } from "@/constants/time-options";

import { MyViewingDates } from "@/types/viewing";

dayjs.extend(utc);
dayjs.extend(timezone);

const userTimeZone = dayjs.tz.guess();

export const useViewingReservation = ({
  propertyId,
  shownDate,
  selectedTime,
  currentId,
  myViewingDatesData,
}: {
  propertyId: number;
  shownDate: Date;
  selectedTime: string;
  selectedDate: Date | null;
  currentId: string;
  myViewingDatesData: MyViewingDates | undefined;
}) => {
  const { data: availableDatesData } = useViewingAvailableDates(propertyId);

  const getTimeLabelByTime = (time: string): TimeLabel => {
    const found = (Object.keys(TIME_OPTIONS) as TimeLabel[]).find(label =>
      TIME_OPTIONS[label].includes(time),
    );
    if (!found) throw new Error(`Invalid time: ${time}`);
    return found;
  };

  const usedDateTimeSet = useMemo(() => {
    const set = new Set<string>();

    //  이미 예약된 slot (호스트가 지정한)
    if (availableDatesData) {
      Object.entries(availableDatesData).forEach(([date, slots]) => {
        slots.forEach(slot => {
          if (slot.reserved) {
            const utcDatetime = `${date}T${slot.time}Z`;
            const localTime = dayjs
              .utc(utcDatetime)
              .tz(userTimeZone)
              .format("HH:mm");

            set.add(`${date}-${localTime}`);
          }
        });
      });
    }

    //  내 뷰잉 데이터
    if (myViewingDatesData) {
      Object.entries<string[]>(myViewingDatesData).forEach(([date, times]) => {
        times.forEach(time => {
          const utcDatetime = `${date}T${time}Z`;
          const localTime = dayjs
            .utc(utcDatetime)
            .tz(userTimeZone)
            .format("HH:mm");

          set.add(`${date}-${localTime}`);
        });
      });
    }

    return set;
  }, [availableDatesData, myViewingDatesData, currentId]);

  const filteredAvailableDates = useMemo(() => {
    if (!availableDatesData || selectedTime === "NN : NN") return null;

    return Object.entries(availableDatesData)
      .filter(([date, slots]) =>
        slots.some(slot => {
          const utcDatetime = `${date}T${slot.time}Z`;

          const localTime = dayjs
            .utc(utcDatetime)
            .tz(userTimeZone)
            .format("HH:mm");

          const isMyReserved = myViewingDatesData?.[date]?.some(t => {
            const myLocalTime = dayjs
              .utc(`${date}T${t}Z`)
              .tz(userTimeZone)
              .format("HH:mm");
            return myLocalTime === localTime;
          });

          const isAlreadyReserved = usedDateTimeSet.has(`${date}-${localTime}`);

          return (
            localTime === selectedTime &&
            !slot.reserved &&
            !isAlreadyReserved &&
            !isMyReserved
          );
        }),
      )
      .map(([date]) => date);
  }, [availableDatesData, selectedTime, myViewingDatesData, usedDateTimeSet]);

  const disabledDates = useMemo(() => {
    if (!availableDatesData) return [];

    const allDatesInMonth = eachDayOfInterval({
      start: startOfMonth(shownDate),
      end: endOfMonth(shownDate),
    });

    return allDatesInMonth.filter(date => {
      const formatted = format(date, "yyyy-MM-dd");

      if (selectedTime !== "NN : NN" && filteredAvailableDates) {
        return !filteredAvailableDates.includes(formatted);
      }

      return !availableDatesData[formatted];
    });
  }, [availableDatesData, shownDate, selectedTime, filteredAvailableDates]);

  const isDisabledTime = (time: string, date: string) => {
    if (!availableDatesData) return true;

    const hasAvailableSlot = (availableDatesData[date] ?? []).some(slot => {
      const utcDatetime = `${date}T${slot.time}Z`;
      const localTime = dayjs.utc(utcDatetime).tz(userTimeZone).format("HH:mm");

      return localTime === time && !slot.reserved;
    });

    if (!hasAvailableSlot) return true; // 호스트 slot 중 사용가능한 게 없으면 비활성화

    // 내 뷰잉 일정과 겹치는지 체크
    const isMyViewingConflict = (myViewingDatesData?.[date] ?? []).some(t => {
      const utcDatetime = `${date}T${t}Z`;
      const localTime = dayjs.utc(utcDatetime).tz(userTimeZone).format("HH:mm");

      return localTime === time;
    });

    return isMyViewingConflict;
  };

  const isDisabledTimeWithoutDate = (time: string) => {
    if (!availableDatesData) return true;

    // 모든 날짜 중 해당 시간 슬롯이 하나라도 있으면 활성화
    const hasTimeSlot = Object.entries(availableDatesData).some(
      ([date, slots]) =>
        slots.some(slot => {
          const utcDatetime = `${date}T${slot.time}Z`;
          const localTime = dayjs
            .utc(utcDatetime)
            .tz(userTimeZone)
            .format("HH:mm");

          return localTime === time;
        }),
    );

    return !hasTimeSlot;
  };

  return {
    availableDatesData,
    getTimeLabelByTime,
    filteredAvailableDates,
    disabledDates,
    usedDateTimeSet,
    isDisabledTime,
    isDisabledTimeWithoutDate,
  };
};
