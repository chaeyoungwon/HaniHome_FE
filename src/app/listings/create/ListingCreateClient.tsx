"use client";

import { useListingStore } from "@/stores/useListingStore";

import useFunnel from "@/hooks/common/useFunnel";

import Funnel from "@/components/common/Funnel/Funnel";
import AddressPhoto from "@/components/listings/create/AddressPhoto";
import CreateConfirm from "@/components/listings/create/CreateConfirm";
import CreateSuccess from "@/components/listings/create/CreateSuccess";
import ListingDescription from "@/components/listings/create/ListingDescription";
import ListingDetails from "@/components/listings/create/ListingDetailsLayout";
import ListingType from "@/components/listings/create/ListingType";
import MovingCondition from "@/components/listings/create/MovingConditionLayout";
import ContractTerms from "@/components/listings/create/ContractTermsLayout";

const steps = [
  "ListingType",
  "AddressPhoto",
  "ListingDetails",
  "MovingConditions",
  "ContractTerms",
  "ListingDescription",
  "CreateConfirm",
  "CreateSuccess",
];

const ListingCreateClient = () => {
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

      <Funnel.Step name="ListingDetails">
        <ListingDetails onNext={onNextStep} onPrev={onPrevStep} />
      </Funnel.Step>
      <Funnel.Step name="MovingConditions">
        <MovingCondition onNext={onNextStep} onPrev={onPrevStep} />
      </Funnel.Step>
      <Funnel.Step name="ContractTerms">
        <ContractTerms onNext={onNextStep} onPrev={onPrevStep} />
      </Funnel.Step>
      <Funnel.Step name="ListingDescription">
        <ListingDescription onNext={onNextStep} onPrev={onPrevStep} />
      </Funnel.Step>
      <Funnel.Step name="CreateConfirm">
        <CreateConfirm onNext={onNextStep} onPrev={onPrevStep} />
      </Funnel.Step>
      <Funnel.Step name="CreateSuccess">
        <CreateSuccess />
      </Funnel.Step>
    </Funnel>
  );
};

export default ListingCreateClient;
