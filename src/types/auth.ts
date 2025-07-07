// 회원가입 시 전달할 데이터

export interface Consent {
  type: string;
  agreed: boolean;
}

export interface SignupPayload {
  name: string;
  email: string;
  phoneNumber: string;
  nickname: string;
  gender: string;
  interestRegion: string;
  profileImage?: string;
  consents: Consent[];
}

// 소셜 로그인 코드
export interface LoginPayload {
  code: string;
}

export interface LoginResponse {
  newUser: boolean;
}

// 유저 정보 수정
export interface UpdateUserPayload {}

// 내 정보
export interface MyInfoResponse {
  id: number;
  email: string;
  name: string;
  nickname: string;
  profileImage: string;
  birthDate: string;
  phoneNumber: string;
  gender: "MALE" | "FEMALE";
  createdAt: string;
}
