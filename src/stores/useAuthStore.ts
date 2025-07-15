import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  accessToken: string;
  memberId: string;
  isLoggedIn: boolean;
  isAuthInitialized: boolean;

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
      isAuthInitialized: false,

      setAuth: (accessToken, memberId) =>
        set({
          accessToken,
          memberId,
          isLoggedIn: true,
          isAuthInitialized: true,
        }),

      setAccessToken: accessToken =>
        set({
          accessToken,
          isLoggedIn: !!accessToken,
          isAuthInitialized: true,
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
          isAuthInitialized: true,
        }),
    }),
    {
      name: "auth-storage",
      partialize: state => ({
        accessToken: state.accessToken,
        memberId: state.memberId,
        isLoggedIn: state.isLoggedIn,
        isAuthInitialized: state.isAuthInitialized,
      }),
      onRehydrateStorage: () => state => {
        if (state && state.accessToken) {
          state.setAuth(state.accessToken, state.memberId);
        } else {
          state?.clearAuth();
        }
      },
    },
  ),
);
