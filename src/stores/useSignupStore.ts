import { create } from "zustand";

interface SignupState {
  name: string;
  phoneNumber: string;
  agreed: number[];
  nickname: string;
  gender: string;
  interestRegion: string;

  profileImagePreview: string; // URL.createObjectURL() 결과
  profileImage: string | null;

  setField: (
    key: keyof Omit<SignupState, "setField" | "setAgreed" | "reset">,
    value: SignupState[keyof SignupState],
  ) => void;
  setAgreed: (ids: number[]) => void;
  reset: () => void;
}

export const useSignupStore = create<SignupState>(set => ({
  name: "",
  phoneNumber: "",
  agreed: [],
  nickname: "",
  gender: "",
  interestRegion: "",
  profileImagePreview: "",
  profileImage: null,

  setField: (key, value) =>
    set(state => ({
      ...state,
      [key]: value,
    })),

  setAgreed: ids => set({ agreed: ids }),

  reset: () =>
    set({
      name: "",
      phoneNumber: "",
      agreed: [],
      nickname: "",
      gender: "",
      interestRegion: "",
      profileImagePreview: "",
      profileImage: null,
    }),
}));
