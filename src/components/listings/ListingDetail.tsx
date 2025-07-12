import { ListingDummies } from "@/constants/mock/listing-card-dummies";

import RentDetail from "./RentDetail";
import ShareDetail from "./ShareDetail";

interface ListingDetailProps {
  listingId: string;
}

const ListingDetail = ({ listingId }: ListingDetailProps) => {
  const data = ListingDummies.find(item => item.id === Number(listingId));
  // 추후 API 연결하면서 변경 예정

  if (data?.type === "렌트") {
    return <RentDetail listingId={listingId} />;
  }

  if (data?.type === "쉐어") {
    return <ShareDetail listingId={listingId} />;
  }
};

export default ListingDetail;
