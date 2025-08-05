import { Property } from "@/types/property.type";

import ListingDetailSkeleton from "../skeleton/listingsDetail/ListingDetailSkeleton";
import RentDetail from "./RentDetail";
import ShareDetail from "./ShareDetail";

interface ListingDetailProps {
  listingId: string;
  data?: Property;
}

const ListingDetail = ({ listingId, data }: ListingDetailProps) => {
  if (!data) return <ListingDetailSkeleton />;

  if (data?.kind === "RENT") {
    return <RentDetail listingId={listingId} data={data} />;
  }

  if (data?.kind === "SHARE") {
    return <ShareDetail listingId={listingId} data={data} />;
  }
};

export default ListingDetail;
