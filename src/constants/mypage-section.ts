import { useRouter } from "next/navigation";

import { SectionItem } from "@/types/mypageSection";

export const getSections = (
  router: ReturnType<typeof useRouter>,
): { label: string; items: SectionItem[] }[] => [
  {
    label: "나의 활동",
    items: [
      { label: "내놓은 매물", onClick: () => router.push("") },
      { label: "구한 매물", onClick: () => router.push("") },
    ],
  },
  {
    label: "고객 지원",
    items: [
      { label: "약관 및 정책", onClick: () => router.push("") },
      { label: "FAQ", onClick: () => router.push("") },
      { label: "1:1 문의", onClick: () => router.push("") },
    ],
  },
  {
    label: "계정 관리",
    items: [
      { label: "로그아웃", onClick: () => router.push("")},
      { label: "탈퇴", color: "danger", onClick: () => router.push("")},
    ],
  },
];
