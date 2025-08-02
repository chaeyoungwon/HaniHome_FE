/**
 * 해당 월에 존재하지 않는 날짜(예: 2월 30일)를 방지하기 위해,
 * 주어진 day 값이 해당 월의 마지막 날보다 클 경우
 * 마지막 날로 보정한 안전한 Date 객체를 반환한다.
 */
export const getSafeDate = (year: number, month: number, day: number) => {
  const lastDay = new Date(year, month + 1, 0).getDate();
  return new Date(year, month, Math.min(day, lastDay));
};
