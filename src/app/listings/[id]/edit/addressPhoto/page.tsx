"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

import AddressField from "@/components/listings/create/addressPhoto/AddressField";
import PhotoField from "@/components/listings/create/addressPhoto/PhotoField";
import FunnelStepMenu from "@/components/listings/create/common/FunnelStepMenu";

const BackHeader = dynamic(
  () => import("@/components/layout/header/BackHeader"),
  { ssr: false },
);

const AddressPhotoEdit = () => {
  const searchParams = useSearchParams();
  const stepFromQuery = searchParams.get("subStep");
  const isDraft = Boolean(searchParams.get("draftId"));

  const fixedKey = "addressPhoto";
  const [subStep, setSubStep] = useState<"address" | "photo">("address");

  useEffect(() => {
    if (stepFromQuery === "photo" || stepFromQuery === "address") {
      setSubStep(stepFromQuery);
    }
  }, [stepFromQuery]);

  return (
    <>
      <BackHeader isDraft={isDraft} />
      <FunnelStepMenu fixedKey={fixedKey} />
      {subStep === "address" && <AddressField edit />}
      {subStep === "photo" && <PhotoField edit />}
    </>
  );
};

export default AddressPhotoEdit;
