export const COMMON_MOVING_CONDITIONS = [
  {
    id: "genderPreference",
    label: "원하는 게스트 성별이 있으신가요?",
    options: ["무관", "남자만", "여자만", "커플 가능"],
  },
  {
    id: "livingConditions",
    label: "거주 조건을 입력해주세요",
    options: ["노티스", "최소 거주 기간", "계약 형태 설명"],
  },
  {
    id: "moveInInfo",
    label: "입주 가능일을 선택해주세요",
    options: ["availableFrom", "availableTo", "isImmediate", "isNegotiable"],
  },
  {
    id: "availableOptions",
    label: "다음 항목이 가능한지 알려주세요",
    options: {
      흡연자: ["가능", "불가능"],
      반려동물: ["가능", "불가능"],
      "외부인 방문": ["가능", "불가능"],
      주차: ["전용공간", "노상 주차", "불가능"],
      "주방 사용": ["가능", "불가능"],
    },
  },
];

// 공통 ContractTerms

export const COMMON_CONTRACT_TERMS = [
  {
    id: "costDetails",
    label: "거래 비용을 입력해주세요",
    options: {
      weeklyCost: {
        label: "빌",
        value: "",
      },
      includedItems: {
        label: "빌에 포함된 항목",
        value: [
          "수도세",
          "전기세",
          "인터넷비",
          "가스비",
          "청소비",
          "주차비",
          "직접입력",
        ],
      },
      billDescription: {
        label: "빌 설명",
        value: "",
      },
      deposit: {
        label: "디파짓",
        value: "",
      },
      keyDeposit: {
        label: "Key 디파짓 (선택)",
        value: "",
      },
    },
  },
  {
    id: "meetingTime",
    label: "뷰잉 가능 기간을 설정해주세요",
    options: {
      meetingDateFrom: { label: "시작일", value: null },
      meetingDateTo: { label: "종료일", value: null },
    },
  },
  {
    id: "timeSlots",
    label: "뷰잉 가능 시간대를 설정해주세요",
    options: ["startTime", "endTime"]
  },
];

export const QUESTION_MAP = {
  SHARE: {
    ListingDetails: [
      {
        id: "propertyType",
        label: "매물 유형을 선택해주세요",
        options: ["마스터 룸", "거실 쉐어", "세컨드 룸"],
      },
      {
        id: "capacityPeople",
        label: "최대 몇 명이 쓸 수 있나요?",
        options: ["독방", "2인 1실", "3인 1실", "n인 1실"],
      },
      {
        id: "internalDetails",
        label: "매물 정보를 입력해주세요",
        options: [
          "Internal Area",
          "Total Area (선택)",
          "총 거주인",
          "욕실 쉐어자 수",
          "건물 전체 층 (선택)",
          "해당 층 (선택)",
        ],
      },
      {
        id: "highlights",
        label: "이 매물 장점은 무엇인가요?",
        options: [
          "전망이 좋아요",
          "햇빛이 잘 들어요",
          "교통이 편리해요",
          "주변보다 저렴해요",
          "테라스가 있어요",
          "집 상태가 깨끗해요",
          "방음이 잘돼요",
          "치안이 좋아요",
          "주변 편의시설이 많아요",
          "커뮤니티 시설이 좋아요",
        ],
      },
      {
        id: "furniture",
        label: "기본 제공 가전, 가구를 선택해주세요",
        options: {
          침실: ["침대 프레임", "침구류", "의자", "책상", "옷장", "수납장"],
          주방: ["전자렌지", "냉장고", "가스렌지", "식기류", "조리도구"],
          거실: ["TV", "소파", "커피테이블"],
          기타: ["Wifi", "청소기", "에어콘", "엘레베이터"],
        },
      },
    ],
    MovingConditions: COMMON_MOVING_CONDITIONS,
    ContractTerms: COMMON_CONTRACT_TERMS,
  },

  RENT: {
    ListingDetails: [
      {
        id: "propertyType",
        label: "매물 유형을 선택해주세요",
        options: [
          "하우스",
          "아파트",
          "유닛",
          "스튜디오",
          "그래니 플랫",
          "타운하우스",
        ],
      },
      {
        id: "capacityPeople",
        label: "최대 몇 명이 쓸 수 있나요?",
        options: ["1명", "2명", "3명", "4명", "기타 (5명 이상)"],
      },
      {
        id: "internalDetails",
        label: "매물 정보를 입력해주세요",
        options: [
          "Internal Area",
          "Total Area (선택)",
          "방 개수",
          "욕실 개수",
          "건물 전체 층 (선택)",
          "해당 층 (선택)",
        ],
      },
      {
        id: "isBrokered",
        label: "부동산 중개 여부를 알려주세요",
        options: ["부동산 중개", "개인 임대"],
      },
      {
        id: "highlights",
        label: "이 매물 장점은 무엇인가요?",
        options: [
          "전망이 좋아요",
          "햇빛이 잘 들어요",
          "교통이 편리해요",
          "주변보다 저렴해요",
          "테라스가 있어요",
          "집 상태가 깨끗해요",
          "방음이 잘돼요",
          "치안이 좋아요",
          "주변 편의시설이 많아요",
          "커뮤니티 시설이 좋아요",
        ],
      },
      {
        id: "furniture",
        label: "기본 제공 가전, 가구를 선택해주세요",
        options: {
          침실: ["침대 프레임", "침구류", "의자", "책상", "옷장", "수납장"],
          주방: ["전자렌지", "냉장고", "가스렌지", "식기류", "조리도구"],
          거실: ["TV", "소파", "커피테이블"],
          기타: ["Wifi", "청소기", "에어콘", "엘레베이터"],
        },
      },
    ],
    MovingConditions: COMMON_MOVING_CONDITIONS,
    ContractTerms: COMMON_CONTRACT_TERMS,
  },
};
