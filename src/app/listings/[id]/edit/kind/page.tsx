"use client";

import { useParams, useRouter } from "next/navigation";

import { useEffect } from "react";

import { useListingStore } from "@/stores/useListingStore";

import { usePropertyDetailEditList } from "@/hooks/property/useProperty";

import toPostPropertyDetail from "@/utils/toPostPropertyDetail";

import BottomActionBar from "@/components/common/BottomActionBar";
import ListingType from "@/components/listings/create/listingType/ListingType";

const EditKind = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data } = usePropertyDetailEditList(id ?? "");

  const { setListingType } = useListingStore();

  useEffect(() => {
    if (data) {
      const parsed = toPostPropertyDetail(data);
      setListingType(parsed.kind);
    }
  }, [data, setListingType]);

  const handleSave = () => {
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
