import { useState } from "react";

import { ViewingPropertyItem } from "@/types/viewing.type";

import ContentWrapper from "../layout/ContentWrapper";
import CancelReasonModal from "./CancelReasonModal";
import ViewingEmptyMessage from "./ViewingEmptyMessage";
import ViewingManageCard from "./ViewingManageCard";

interface ViewingCanceledSectionProps {
  data: ViewingPropertyItem[];
}

const ViewingCanceledSection = ({ data }: ViewingCanceledSectionProps) => {
  const [openId, setOpenId] = useState<number | null>(null);
  const selectedItem = data.find(item => item.id === openId);

  if (data.length === 0) {
    return <ViewingEmptyMessage message="취소된 뷰잉이 없어요" />;
  }

  return (
    <ContentWrapper className="mb-6 flex flex-col" bottomOffset={62}>
      <ul className="mt-4 flex flex-col gap-4">
        {data.map(item => (
          <li key={item.id}>
            <ViewingManageCard
              id={item.id}
              viewingItem={item}
              status="CANCELLED"
              onArrowClick={() => setOpenId(item.id)}
            />
          </li>
        ))}
      </ul>

      {selectedItem && (
        <CancelReasonModal
          isOpen={openId !== null}
          onClose={() => setOpenId(null)}
          userType={selectedItem.canSeeViewingDetail ? "guest" : "host"}
          viewingId={selectedItem.id}
        />
      )}
    </ContentWrapper>
  );
};

export default ViewingCanceledSection;
