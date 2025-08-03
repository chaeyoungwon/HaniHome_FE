"use client";

import { useParams, useRouter } from "next/navigation";

import { useListingStore } from "@/stores/useListingStore";

import BottomActionBar from "@/components/common/BottomActionBar";
import ListingType from "@/components/listings/create/listingType/ListingType";

const EditKind = () => {
  const router = useRouter();
  const { id } = useParams();
  const { setListingType } = useListingStore();
  const handleSave = () => {
    console.log("저장");
    router.push(`/listings/${id}/edit`);
  };
  return (
    <>
      <ListingType
        variant="edit"
        onSelectType={type => {
          setListingType(type);
        }}
      />
      <BottomActionBar label="저장" onClick={handleSave} />
    </>
  );
};
export default EditKind;
