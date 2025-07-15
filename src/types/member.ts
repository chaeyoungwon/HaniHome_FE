export interface Member {
  id: number;
  email: string;
  name: string | null;
  nickname: string | null;
  profileImage: string | null;
  birthDate: string | null;
  phoneNumber: string | null;
  gender: "MALE" | "FEMALE" | null;
  createdAt: string;
  verifications: Verification[];
  verifiedUser: boolean;
}

export interface Verification {
  type: "ID_CARD" | "PASSPORT" | "DRIVER_LICENSE";
  verified: boolean;
}
