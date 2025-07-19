import { useState } from "react";
import BackHeader from "@/components/layout/header/BackHeader";
import AddressField from "./AddressField";
import FunnelStepMenu from "./FunnelStepMenu";
import PhotoField from "./PhotoField";

interface AddressPhotoProps {
  onNext: () => void;
  onPrev: () => void;
}

const AddressPhoto = ({ onNext, onPrev }: AddressPhotoProps) => {
  const [subStep, setSubStep] = useState<"address" | "photo">("address");

  return (
    <>
      <BackHeader rightIcon="close" />
      <FunnelStepMenu />
      {subStep === "address" && (
        <AddressField onNext={() => setSubStep("photo")} />
      )}
      {subStep === "photo" && (
        <PhotoField onNext={onNext} onPrev={onPrev} />
      )}
    </>
  );
};

export default AddressPhoto;