export interface UserInfo {
  id: string;
  name: string;
  email: string;
  // ... 기타 필드들
}

export interface UserUpdateData {
  name?: string;
  email?: string;
  // ... 수정 가능한 필드들
}
