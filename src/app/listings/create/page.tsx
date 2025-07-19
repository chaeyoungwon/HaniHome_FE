"use client";

import { useListingStore } from "@/stores/useListingStore";

import useFunnel from "@/hooks/common/useFunnel";

import Funnel from "@/components/common/Funnel/Funnel";
import AddressPhoto from "@/components/listings/create/AddressPhoto";
import ListingType from "@/components/listings/create/ListingType";

const steps = [
  "ListingType",
  "AddressPhoto",
  "ListingsDetails",
  "MovingConditions",
  "ContractTerms",
  "CreateConfirm",
  "CreateSuccess",
];

const ListingCreatePage = () => {
  const { step, onNextStep, onPrevStep } = useFunnel({ steps });
  const { setListingType } = useListingStore();

  return (
    <Funnel step={step}>
      <Funnel.Step name="ListingType">
        <ListingType
          onSelectType={type => {
            setListingType(type);
            onNextStep();
          }}
        />
      </Funnel.Step>

      <Funnel.Step name="AddressPhoto">
        <AddressPhoto onNext={onNextStep} onPrev={onPrevStep} />
      </Funnel.Step>
      
      {/* 
      <Funnel.Step name="ListingsDetails">
        <ListingDetail onNext={onNextStep} onPrev={onPrevStep} />
      </Funnel.Step>
      <Funnel.Step name="MovingConditions">
        <MovingCondition onNext={onNextStep} onPrev={onPrevStep} />
      </Funnel.Step>
      <Funnel.Step name="ContractTerms">
        <ContractTerms onNext={onNextStep} onPrev={onPrevStep} />
      </Funnel.Step>
      <Funnel.Step name="CreateConfirm">
        <CreateConfirm onNext={onNextStep} onPrev={onPrevStep} />
      </Funnel.Step>
      <Funnel.Step name="CreateSuccess">
        <CreateSuccess />
      </Funnel.Step>
      */}
    </Funnel>
  );
};

export default ListingCreatePage;
