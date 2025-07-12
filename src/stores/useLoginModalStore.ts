import { create } from "zustand";

interface LoginModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useLoginModalStore = create<LoginModalStore>(set => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
