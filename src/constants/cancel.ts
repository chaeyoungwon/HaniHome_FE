export const GUEST_REASONS = [
  "다른 매물로 결정했어요",
  "일정 변경을 원해요",
  "교통이 불편해요",
  "예산이 맞지 않아요",
  "입주 가능 날짜가 달라요",
  "기타",
] as const;

export const HOST_REASONS = [
  "계약 논의 중이에요",
  "이미 계약이 완료됐어요",
  "매물 상태 점검 / 정비 중이에요",
  "뷰잉 일정 변경을 원해요",
  "기타",
] as const;

export const PLACEHOLDER_TEXT: Record<"host" | "guest", string> = {
  host: "구체적인 사유가 있다면 알려주세요.\n게스트에게 도움이 될 수 있어요.",
  guest: "구체적인 사유가 있다면 알려주세요.\n호스트에게 도움을 줄 수 있어요.",
};
