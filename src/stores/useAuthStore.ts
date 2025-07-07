import { create } from "zustand";

interface AuthStore {
  accessToken: string;
  memberId: string;
  isLoggedIn: boolean;

  setAuth: (accessToken: string, memberId: string) => void;
  setAccessToken: (accessToken: string) => void;
  setMemberId: (memberId: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>(set => ({
  accessToken: "",
  memberId: "",
  isLoggedIn: false,

  setAuth: (accessToken, memberId) =>
    set({ accessToken, memberId, isLoggedIn: true }),

  setAccessToken: accessToken =>
    set(state => ({
      accessToken,
      isLoggedIn: !!accessToken && !!state.memberId,
    })),

  setMemberId: memberId =>
    set(state => ({
      memberId,
      isLoggedIn: !!memberId && !!state.accessToken,
    })),

  clearAuth: () =>
    set({
      accessToken: "",
      memberId: "",
      isLoggedIn: false,
    }),
}));
