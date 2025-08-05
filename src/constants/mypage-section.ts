import { useRouter } from "next/navigation";

import { SectionItem } from "@/types/mypageSection.type";

interface SectionHandlers {
  onLogout: () => void;
  onOpenWithdrawModal: () => void;
}

export const getSections = (
  router: ReturnType<typeof useRouter>,
  handlers: SectionHandlers,
): { label: string; items: SectionItem[] }[] => [
  {
    label: "나의 활동",
    items: [
      { label: "내놓은 매물", onClick: () => router.push("/mypage/listings") },
      { label: "구한 매물", onClick: () => router.push("/mypage/purchases") },
    ],
  },
  {
    label: "고객 지원",
    items: [
      { label: "약관 및 정책", onClick: () => router.push("/terms") },
      { label: "FAQ", onClick: () => router.push("/mypage/support/faq") },
      {
        label: "1:1 문의",
        onClick: () => router.push("/mypage/support/inquiry"),
      },
    ],
  },
  {
    label: "계정 관리",
    items: [
      {
        label: "로그아웃",
        onClick: handlers.onLogout,
      },
      {
        label: "탈퇴",
        color: "danger",
        onClick: handlers.onOpenWithdrawModal,
      },
    ],
  },
];
