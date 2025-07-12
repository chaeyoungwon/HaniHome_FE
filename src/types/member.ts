export interface Member {
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
