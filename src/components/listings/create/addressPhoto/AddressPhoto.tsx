"use client";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

import PhotoField from "@/components/listings/create/addressPhoto/PhotoField";
import FunnelLayout from "@/components/listings/create/common/FunnelLayout";

import AddressField from "./AddressField";

interface AddressPhotoProps {
  onNext: () => void;
  onPrev: () => void;
  subStep: "address" | "photo";
}

const AddressPhoto = ({ onNext, onPrev, subStep }: AddressPhotoProps) => {
  const router = useRouter();

  // URL에 subStep 반영
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("subStep") !== subStep) {
      query.set("subStep", subStep);
      router.replace(`?${query.toString()}`, { scroll: false });
    }
  }, [subStep]);

  return (
    <FunnelLayout>
      {subStep === "address" && <AddressField onNext={onNext} />}
      {subStep === "photo" && <PhotoField onNext={onNext} onPrev={onPrev} />}
    </FunnelLayout>
  );
};

export default AddressPhoto;
