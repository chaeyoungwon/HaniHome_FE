import ContractInfo from "@/components/listings/ContractInfo";
import ListingDetail from "@/components/listings/ListingDetail";
import MoveInCondition from "@/components/listings/MoveInCondition";

import { Property } from "@/types/property.type";

type TabItem = {
  key: string;
  label: string;
  Component: React.ComponentType<{ listingId: string; data?: Property }>;
};

export const listingDetailTabs: readonly TabItem[] = [
  {
    key: "detail",
    label: "매물 상세",
    Component: ListingDetail,
  },
  {
    key: "condition",
    label: "입주 조건",
    Component: MoveInCondition,
  },
  {
    key: "contract",
    label: "계약 사항",
    Component: ContractInfo,
  },
];
