// 매물 세부 정보 입력 단계에서 선택한 항목에 따라 적절한 드롭다운 콘텐츠를 렌더링하는 컴포넌트
import { useListingStore } from "@/stores/useListingStore";

// 세부 항목별 UI 컴포넌트
import CapacityPeopleField from "@/components/listings/create/listingDetails/CapacityPeopleField";
import FurnitureContent from "@/components/listings/create/listingDetails/FurnitureContent";
import HighLightsContent from "@/components/listings/create/listingDetails/HighLightsContent";
import InternalDetailsContent from "@/components/listings/create/listingDetails/InternalDetailsContent";
import IsBrokeredField from "@/components/listings/create/listingDetails/IsBrokeredField";
import PropertyTypeField from "@/components/listings/create/listingDetails/PropertyTypeField";

// 카테고리별 옵션과 질문 매핑
import { CATEGORY_OPTIONS } from "@/constants/property-category";
import { QUESTION_MAP } from "@/constants/question-map";

// 타입 정의
import { ListingDetailsOption } from "@/types/createPropertyAnswer";
import {
  CapacityRent,
  CapacityShare,
  RentInternalDetails,
  RentPropertySubType,
  ShareInternalDetails,
  SharePropertySubType,
} from "@/types/listingDetailPost";

// Props 정의
type ValueOf<T extends ListingDetailsOption["type"]> = Extract<
  ListingDetailsOption,
  { type: T }
>["value"];

interface Props<T extends ListingDetailsOption["type"]> {
  id: T;
  value?: ValueOf<T> | null;
  onSelect: (value: ValueOf<T> | null) => void;
}

// 기존 옵션에서 해당 카테고리 ID만 새로 교체하는 유틸 함수
function updateOptionItemIdsByCategory(
  prevIds: number[],
  newIds: number[],
  categoryIds: number[],
): number[] {
  const remaining = prevIds.filter(id => !categoryIds.includes(id));
  return [...remaining, ...newIds];
}

function ListingDetailsDropdownContent<T extends ListingDetailsOption["type"]>({
  id,
  value,
  onSelect,
}: Props<T>) {
  // 전역 상태 (Zustand) 가져오기
  const {
    listingType,
    optionItemIds,
    setOptionItemIds,
    rentCapacityPeople,
    shareCapacityPeople,
    rentPropertyType,
    sharePropertyType,
    setRentPropertyType,
    setSharePropertyType,
    setRentCapacityPeople,
    setShareCapacityPeople,
    rentInternalDetails,
    setRentInternalDetails,
    shareInternalDetails,
    setShareInternalDetails,
  } = useListingStore();

  // 매물 타입이 없으면 렌더링 중단
  if (!listingType) return null;

  // 현재 id에 해당하는 질문 객체 찾기
  const question = QUESTION_MAP[listingType].ListingDetails.find(
    q => q.id === id,
  );
  if (!question) return null;

  // 카테고리별 옵션 ID 추출
  const highlightIds = CATEGORY_OPTIONS[1].items.map(
    item => item.optionId,
  ) as number[];
  const furnitureIds = Object.values(CATEGORY_OPTIONS[2].items)
    .flat()
    .map(item => item.optionId) as number[];
  const isBrokeredIds = CATEGORY_OPTIONS[5].items.map(
    item => item.optionId,
  ) as number[];

  // 항목별 조건 분기
  switch (id) {
    // 내부 시설 정보
    case "internalDetails": {
      const internalDetails =
        listingType === "RENT" ? rentInternalDetails : shareInternalDetails;

      if (!internalDetails) return null;

      const onSelectInternalDetails = onSelect as (
        value: Extract<
          ListingDetailsOption,
          { type: "internalDetails" }
        >["value"],
      ) => void;

      return (
        <InternalDetailsContent
          value={internalDetails}
          onChange={(key, val) => {
            const updated = {
              ...internalDetails,
              [key]: val,
            };
            // 상태 업데이트
            if (listingType === "RENT") {
              setRentInternalDetails(updated as RentInternalDetails);
            } else {
              setShareInternalDetails(updated as ShareInternalDetails);
            }
            onSelectInternalDetails(updated);
          }}
          listingType={listingType}
        />
      );
    }

    // 하이라이트 옵션 (옵션 배열)
    case "highlights": {
      const onSelectHighlights = onSelect as (
        value: Extract<ListingDetailsOption, { type: "highlights" }>["value"],
      ) => void;

      return (
        <HighLightsContent
          value={optionItemIds.filter(id => highlightIds.includes(id))}
          onChange={(newValue: number[]) => {
            const updated = updateOptionItemIdsByCategory(
              optionItemIds,
              newValue,
              highlightIds,
            );
            setOptionItemIds(updated);
            onSelectHighlights(updated);
          }}
        />
      );
    }

    // 가구 옵션 (옵션 배열)
    case "furniture": {
      const onSelectFurniture = onSelect as (
        value: Extract<ListingDetailsOption, { type: "furniture" }>["value"],
      ) => void;

      return (
        <FurnitureContent
          value={optionItemIds.filter(id => furnitureIds.includes(id))}
          onChange={(newValue: number[]) => {
            const updated = updateOptionItemIdsByCategory(
              optionItemIds,
              newValue,
              furnitureIds,
            );
            setOptionItemIds(updated);
            onSelectFurniture(updated);
          }}
        />
      );
    }

    // 중개 여부 (단일 선택)
    case "isBrokered": {
      const onSelectBrokered = onSelect as (
        value: Extract<ListingDetailsOption, { type: "isBrokered" }>["value"],
      ) => void;

      return (
        <IsBrokeredField
          value={optionItemIds.filter(id => isBrokeredIds.includes(id))}
          onChange={(newValue: number[]) => {
            const updated = updateOptionItemIdsByCategory(
              optionItemIds,
              newValue,
              isBrokeredIds,
            );
            setOptionItemIds(updated);
            const selected = newValue[0] ?? null;
            if (selected !== null) {
              onSelectBrokered(selected);
            }
          }}
        />
      );
    }

    // 수용 인원
    case "capacityPeople": {
      const onSelectCapacity = onSelect as (
        value: Extract<
          ListingDetailsOption,
          { type: "capacityPeople" }
        >["value"],
      ) => void;

      const fallbackValue =
        listingType === "RENT" ? rentCapacityPeople : shareCapacityPeople;

      return (
        <CapacityPeopleField
          listingType={listingType}
          value={(value || fallbackValue) as CapacityRent | CapacityShare}
          onSelect={selected => {
            if (listingType === "RENT") {
              setRentCapacityPeople(selected as CapacityRent);
            } else {
              setShareCapacityPeople(selected as CapacityShare);
            }
            onSelectCapacity(selected);
          }}
        />
      );
    }

    // 매물 유형
    case "propertyType": {
      const onSelectProperty = onSelect as (
        value: Extract<ListingDetailsOption, { type: "propertyType" }>["value"],
      ) => void;

      const fallbackValue =
        listingType === "RENT" ? rentPropertyType : sharePropertyType;

      return (
        <PropertyTypeField
          listingType={listingType}
          value={
            (value || fallbackValue) as
              | RentPropertySubType
              | SharePropertySubType
          }
          onSelect={selected => {
            if (listingType === "RENT") {
              setRentPropertyType(selected as RentPropertySubType);
            } else {
              setSharePropertyType(selected as SharePropertySubType);
            }
            onSelectProperty(selected);
          }}
        />
      );
    }

    default:
      return null;
  }
}

export default ListingDetailsDropdownContent;
