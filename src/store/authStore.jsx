import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  accessToken: null,
  memberId: null,
  setAuth: (accessToken, memberId) => set({ accessToken, memberId }),
  clearAuth: () => set({ accessToken: null, memberId: null }),
}));
