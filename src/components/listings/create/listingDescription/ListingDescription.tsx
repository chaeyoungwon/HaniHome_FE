"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import { useListingStore } from "@/stores/useListingStore";

import {
  fetchTemporaryPropertyData,
  postTemporaryPropertyData,
} from "@/apis/propertyApi";

import { createPayloadByStep } from "@/hooks/property/createPayloadBySteps";
import {
  usePatchProperty,
  usePropertyDetailEditList,
} from "@/hooks/property/usePropertyApi";

import toPostPropertyDetail from "@/utils/listing/toPostPropertyDetail";

import AlertMessage from "@/components/common/AlertMessage";
import BottomActionBar from "@/components/common/BottomActionBar";
import TextareaField from "@/components/common/TextareaField";
import BackHeader from "@/components/layout/header/BackHeader";

import { TemporaryPropertyPost } from "@/types/temporaryProperty.type";

interface ListingDescriptionProps {
  onNext?: () => void;
  onPrev?: () => void;
  edit?: boolean;
}
const ListingDescription = ({
  onNext,
  edit = false,
}: ListingDescriptionProps) => {
  const store = useListingStore();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params.id as string;
  const { data } = usePropertyDetailEditList(id ?? "");
  const draftId = searchParams.get("draftId");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { description, setDescription } = useListingStore();
  const [text, setText] = useState(description || "");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [draftData, setDraftData] = useState<TemporaryPropertyPost | null>(
    null,
  );
  useEffect(() => {
    if (edit && data) {
      const parsed = toPostPropertyDetail(data);
      const fetchedDescription = parsed.description || "";
      setText(fetchedDescription);
      setDescription(fetchedDescription);
    } else if (!edit) {
      setText(description || "");
    }
  }, [edit, data]);

  useEffect(() => {
    const initDraft = async () => {
      if (!draftId) return;
      try {
        const draftData = await fetchTemporaryPropertyData(Number(draftId));
        setDraftData(draftData);
        if (draftData.description) {
          store.setDescription(draftData.description);
        }
      } catch (error) {
        console.error("임시 저장 데이터 가져오기 실패", error);
      }
    };
    initDraft();
  }, [draftId, setDescription]);

  const handleResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleChange = (value: string) => {
    if (value.length <= 300) {
      setText(value);
      setDescription(value);
      handleResize();
    }
  };

  const { mutate: patchProperty } = usePatchProperty(Number(id));

  const handleSave = () => {
    const jsonDiscriminator = data?.kind;
    const payload = {
      jsonDiscriminator,
      description,
    };
    patchProperty(payload, {
      onSuccess: () => {
        router.push(`/listings/${id}/edit`);
      },
    });
  };

  const handleTemporarySave = async () => {
    const payload = createPayloadByStep(
      "LISTING_DESCRIPTION",
      store,
      draftData,
    );
    try {
      await postTemporaryPropertyData(payload);
      router.push(`/home`);
    } catch (e) {
      console.error("임시 저장 실패:", e);
    }
  };

  return (
    <>
      <BackHeader rightIcon="close" />
      <div className="flex flex-col gap-2 px-4 py-3">
        <div className="text-heading2 text-gray-900">
          마지막이에요! <br />
          매물에 대한 소개를 적어주세요
        </div>
        <div className="text-cap1-med text-gray-700">
          자세하게 적을수록 조회수가 높아져요
        </div>
      </div>
      <TextareaField
        onChange={handleChange}
        value={text}
        maxLength={300}
        placeholder="주변 인프라, 편리한 교통, 깔끔한 집 등 다양하게 매물을 홍보해요"
        gap="gap-2"
      />
      {!edit ? (
        text && (
          <BottomActionBar
            buttons={[
              {
                label: "저장",
                onClick: handleTemporarySave,
                variant: "outline",
              },
              {
                label: "다음",
                onClick: () => {
                  setDescription(text);
                  if (onNext) onNext();
                },
                variant: "filled",
              },
            ]}
          />
        )
      ) : (
        <BottomActionBar label="저장" onClick={handleSave} />
      )}
      {alertMessage && (
        <AlertMessage
          message={alertMessage}
          className="bottom-[70px]"
          onDone={() => setAlertMessage(null)}
        />
      )}
    </>
  );
};
export default ListingDescription;
