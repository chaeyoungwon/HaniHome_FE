// 회원가입 시 전달할 데이터
export interface SignupPayload {
  name: string;
  email: string;
  phone: string;
  nickname: string;
  gender: string;
  region: string;
  profileimg: string;
  agreed: number[];
}

// 로그인 시 전달할 데이터 (소셜 로그인 코드 등)
export interface LoginPayload {
  code: string;
}

// 로그인 응답 형식
export interface LoginResponse {
  accessToken: string;
  memberId: string;
}

// 유저 정보 수정
export interface UpdateUserPayload {}
