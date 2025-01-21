import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
  isAuth: boolean;
  user: any;
  login: () => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isAuth: false,
      user: null,
      login: () => {
        // set isAuth to true after login
        set((state) => ({ isAuth: true }));
      },
      logout: () => {
        set((state) => ({ isAuth: false }));
      }
    }),
    {
      name: 'auth-store'
    }
  )
);
