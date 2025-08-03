import { VerificationType } from "@/types/auth";

export const GENDER_OPTIONS = [
  { label: "남성", value: "MALE" },
  { label: "여성", value: "FEMALE" },
];

export const VERIFICATION_OPTIONS: {
  label: string;
  value: VerificationType;
}[] = [
  { label: "여권", value: "PASSPORT" },
  { label: "운전면허증", value: "DRIVER_LICENSE" },
  { label: "거주허가증", value: "ID_CARD" },
];
