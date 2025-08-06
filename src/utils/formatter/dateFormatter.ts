import dayjs from "dayjs";
import "dayjs/locale/ko";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(localizedFormat);

// 오전/오후, 시/분 분리
export const getTimeLabel = (timeStr: string) => {
  const [hourStr, minute] = timeStr.split(":");
  const hour = Number(hourStr);

  const period = hour < 12 ? "오전" : "오후";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;

  return {
    period,
    hour: String(hour12).padStart(2, "0"),
    minute,
  };
};

// "오전 06 : 30" -> "06:30"
export const normalizeTime = (time: string): string => {
  if (/^\d{2}:\d{2}$/.test(time)) return time;

  const matched = time.match(/(오전|오후)?\s*(\d{1,2})\s*:\s*(\d{2})/);
  if (!matched) return time;

  const [, period, hStr, mStr] = matched;
  let hour = Number(hStr);
  const minute = mStr;

  if (period === "오후" && hour < 12) hour += 12;
  if (period === "오전" && hour === 12) hour = 0;

  return `${String(hour).padStart(2, "0")}:${minute}`;
};

// 25.06.19 (목) 형식으로 반환
export const formatDateTime = (date: Date, time: string) => {
  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const weekdayStr = date
    .toLocaleDateString("ko-KR", { weekday: "short" })
    .replace(/\s/g, "");

  const formattedDate = `${year}.${month}.${day} (${weekdayStr})`;

  const { period, hour, minute } = getTimeLabel(time);

  return {
    formattedDate,
    period,
    hour,
    minute,
  };
};

// "2025-06-30T14:00:00.000Z" → { date: "25.06.30", time: "14 : 00" }
export const formatMeetingDay = (isoString: string) => {
  const date = new Date(isoString);

  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return {
    date: `${year}.${month}.${day}`, // "25.06.30"
    time: `${hours} : ${minutes}`, // "14 : 00"
  };
};

// 디데이 계산
export const calculateDday = (meetingDay: string) => {
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const meeting = new Date(meetingDay);
  const meetingDate = new Date(
    meeting.getFullYear(),
    meeting.getMonth(),
    meeting.getDate(),
  );

  const diff = meetingDate.getTime() - today.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

//6월 1일 형식
export const formatDateToMonthDay = (dateStr?: string) => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export const formatRelativeTime = (date: string) => {
  const now = dayjs();
  const target = dayjs(date);

  const diffMinutes = now.diff(target, "minute");
  const diffHours = now.diff(target, "hour");
  const diffDays = now.diff(target, "day");
  const diffMonths = now.diff(target, "month");
  const diffYears = now.diff(target, "year");

  if (diffMinutes < 1) return "방금 전";
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays < 30) return `${diffDays}일 전`;
  if (diffMonths < 12) return `${diffMonths}달 전`;
  return `${diffYears}년 전`;
};

// 6월 28일 오전 09:00
export const formatViewingCardTime = (isoString: string) => {
  const dateObj = dayjs(isoString).local().locale("ko");

  const date = dateObj.format("M월 D일");
  const time = dateObj.format("A H:mm");

  return { date, time };
};

export const formatToDateRange = (from: string, to: string): string => {
  const format = (dateStr: string) =>
    dayjs(dateStr).local().format("YY년 M월 D일");

  return `${format(from)} - ${format(to)}`;
};

//UTC 시간으로 전환
export const convertLocalTimeToUtcString = (localTime: string): string => {
  const [hour, minute] = localTime.split(":").map(Number);

  const localDate = new Date();
  localDate.setHours(hour, minute, 0, 0);

  const iso = localDate.toISOString(); // 예: "2025-08-05T21:00:00.000Z"

  // UTC 시간 추출
  const utcHour = iso.substring(11, 13);
  const utcMinute = iso.substring(14, 16);

  return `${utcHour}:${utcMinute}`; // 예: "21:00"
};

export const convertUtcStringToLocalTime = (utcTime: string): string => {
  const [hour, minute] = utcTime.split(":").map(Number);

  // 현재 날짜를 기준으로 UTC 시간 설정
  const utcDate = new Date();
  utcDate.setUTCHours(hour, minute, 0, 0);

  // 로컬 시간 추출
  const localHour = utcDate.getHours();
  const localMinute = utcDate.getMinutes();

  // HH:mm 포맷으로 반환
  return `${String(localHour).padStart(2, "0")}:${String(localMinute).padStart(2, "0")}`;
};