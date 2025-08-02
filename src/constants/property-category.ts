export type OptionItem = {
  optionId: number;
  label: string;
};

export const CATEGORY_OPTIONS = {
  1: {
    key: "highlights",
    items: [
      { optionId: 1, label: "햇빛이 잘 들어요" },
      { optionId: 2, label: "주변 편의시설이 많아요" },
      { optionId: 3, label: "전망이 좋아요" },
      { optionId: 4, label: "주변보다 저렴해요" },
      { optionId: 5, label: "테라스가 있어요" },
      { optionId: 6, label: "교통이 편리해요" },
      { optionId: 7, label: "커뮤니티 시설이 좋아요" },
      { optionId: 8, label: "집상태가 깨끗해요" },
      { optionId: 9, label: "방음이 잘돼요" },
      { optionId: 10, label: "치안이 좋아요" },
    ],
  },
  2: {
    key: "furniture",
    items: {
      침실: [
        { optionId: 12, label: "침대 프레임" },
        { optionId: 13, label: "책상" },
        { optionId: 14, label: "침구류" },
        { optionId: 15, label: "옷장" },
        { optionId: 16, label: "수납장" },
        { optionId: 17, label: "의자" },
      ],
      주방: [
        { optionId: 19, label: "전자렌지" },
        { optionId: 20, label: "냉장고" },
        { optionId: 21, label: "가스렌지" },
        { optionId: 22, label: "식기류" },
        { optionId: 23, label: "조리도구" },
      ],
      거실: [
        { optionId: 25, label: "TV" },
        { optionId: 26, label: "소파" },
        { optionId: 27, label: "커피테이블" },
      ],
      기타: [
        { optionId: 29, label: "Wifi" },
        { optionId: 30, label: "청소기" },
        { optionId: 94, label: "에어콘" },
        { optionId: 95, label: "엘레베이터" },
      ],
    },
  },
  3: {
    key: "additionalInfo",
    items: {
      흡연자: [
        { optionId: 32, label: "가능" },
        { optionId: 33, label: "불가능" },
      ],
      반려동물: [
        { optionId: 35, label: "가능" },
        { optionId: 36, label: "불가능" },
      ],
      "외부인 방문": [
        { optionId: 38, label: "가능" },
        { optionId: 39, label: "불가능" },
      ],
      주차: [
        { optionId: 41, label: "전용공간" },
        { optionId: 42, label: "노상주차" },
        { optionId: 43, label: "불가능" },
      ],
      주방: [
        { optionId: 45, label: "가능" },
        { optionId: 46, label: "불가능" },
      ],
    },
  },
  4: {
    key: "includedItems",
    items: [
      { optionId: 47, label: "수도세" },
      { optionId: 48, label: "전기세" },
      { optionId: 49, label: "인터넷비" },
      { optionId: 50, label: "가스비" },
      { optionId: 51, label: "청소비" },
      { optionId: 52, label: "주차비" },
      { optionId: 53, label: "직접입력" },
    ],
  },
  5: {
    key: "isBrokered",
    items: [
      { optionId: 54, label: "개인 임대" },
      { optionId: 55, label: "부동산 중개" },
    ],
  },
} as const;
