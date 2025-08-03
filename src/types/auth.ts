// 회원가입 시 전달할 데이터
import { Gender } from "./member";

export interface Consent {
  type: string;
  agreed: boolean;
}

export interface SignupPayload {
  name: string;
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
export interface UpdateUserPayload {
  name: string;
  nickname: string;
  birthDate: string;
  phoneNumber: string;
  gender: Gender;
  profileImage: string | null;
}

// 인증 타입 enum
export type VerificationType = "ID_CARD" | "PASSPORT" | "DRIVER_LICENSE";
