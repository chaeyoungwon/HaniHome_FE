import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  accessToken: string;
  memberId: string;
  isLoggedIn: boolean;

  setAuth: (accessToken: string, memberId: string) => void;
  setAccessToken: (accessToken: string) => void;
  setMemberId: (memberId: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      accessToken: "",
      memberId: "",
      isLoggedIn: false,

      setAuth: (accessToken, memberId) =>
        set({ accessToken, memberId, isLoggedIn: true }),

      setAccessToken: accessToken =>
        set({
          accessToken,
          isLoggedIn: !!accessToken,
        }),

      setMemberId: memberId =>
        set({
          memberId,
        }),

      clearAuth: () =>
        set({
          accessToken: "",
          memberId: "",
          isLoggedIn: false,
        }),
    }),
    {
      name: "auth-storage",
      partialize: state => ({
        accessToken: state.accessToken,
        memberId: state.memberId,
        isLoggedIn: state.isLoggedIn,
      }),
    },
  ),
);
