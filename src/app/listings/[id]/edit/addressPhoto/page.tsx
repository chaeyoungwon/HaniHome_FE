"use client";

import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

import BackHeader from "@/components/layout/header/BackHeader";
import AddressField from "@/components/listings/create/addressPhoto/AddressField";
import FunnelStepMenu from "@/components/listings/create/common/FunnelStepMenu";
import PhotoField from "@/components/listings/create/addressPhoto/PhotoField";


const AddressPhotoEdit = () => {
  const searchParams = useSearchParams();
  const stepFromQuery = searchParams.get("subStep");

  const fixedKey = "addressPhoto";

  const [subStep, setSubStep] = useState<"address" | "photo">("address");

  useEffect(() => {
    if (stepFromQuery === "photo" || stepFromQuery === "address") {
      setSubStep(stepFromQuery);
    }
  }, [stepFromQuery]);

  return (
    <>
      <BackHeader />
      <FunnelStepMenu fixedKey={fixedKey} />
      {subStep === "address" && <AddressField edit/>}
      {subStep === "photo" && <PhotoField edit />}
    </>
  );
};
export default AddressPhotoEdit;
