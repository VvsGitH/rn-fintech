import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

interface IAuthStore {
  authenticated: boolean;
  signUp: (phone: string) => Promise<void>;
  signInByPhone: (phone: string) => Promise<boolean>;
  signInByGoogle: () => Promise<boolean>;
  signInByApple: () => Promise<boolean>;
}

const useAuthStore = create<IAuthStore>((set) => ({
  authenticated: false,
  signUp: async (phone: string) => {
    console.log(phone);
    await new Promise((res) => setTimeout(res, 1000));
    set({ authenticated: true });
  },
  signInByPhone: async (phone) => {
    console.log(phone);
    await new Promise((res) => setTimeout(res, 1000));
    set({ authenticated: true });
    return true;
  },
  signInByGoogle: async () => {
    console.log("Google sign in");
    await new Promise((res) => setTimeout(res, 1000));
    set({ authenticated: true });
    return true;
  },
  signInByApple: async () => {
    console.log("Apple sing in");
    await new Promise((res) => setTimeout(res, 1000));
    set({ authenticated: true });
    return true;
  },
}));

function useAuthStoreShallow<T>(selector: (s: IAuthStore) => T) {
  return useAuthStore<T>(useShallow(selector));
}

export { useAuthStore, useAuthStoreShallow };
