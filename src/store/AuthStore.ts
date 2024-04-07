import { router } from "expo-router";
import { StateCreator, create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { createJSONStorage, persist } from "zustand/middleware";
import { ZustandSecureStorage } from "./storage-middleware";

interface IAuthStore {
  authenticated: boolean;
  signUp: (phone: string) => Promise<boolean>;
  signInByPhone: (phone: string) => Promise<boolean>;
  signInByGoogle: () => Promise<boolean>;
  signInByApple: () => Promise<boolean>;
  verifyCode: (code: string, isSignIn: boolean) => Promise<boolean>;
}

const AuthStore: StateCreator<IAuthStore> = (set) => ({
  authenticated: false,
  signUp: async (phone: string) => {
    console.log(phone);
    await new Promise((res) => setTimeout(res, 1000));
    router.push({ pathname: "/verify-phone", params: { phone: phone, isSignIn: "false" } });
    return true;
  },
  signInByPhone: async (phone) => {
    console.log(phone);
    await new Promise((res) => setTimeout(res, 1000));
    router.push({ pathname: "/verify-phone", params: { phone: phone, isSignIn: "true" } });
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
  verifyCode: async (code, isSignIn) => {
    console.log(isSignIn ? "Conferming user identity" : "Finalizing sign up");
    console.log("Verifing code: ", code);
    await new Promise((res) => setTimeout(res, 1000));
    set({ authenticated: true });
    return true;
  },
});

const useAuthStore = create<IAuthStore>()(
  persist(AuthStore, {
    name: "secure-auth-storage",
    storage: createJSONStorage(() => ZustandSecureStorage),
  })
);

function useAuthStoreShallow<T>(selector: (s: IAuthStore) => T) {
  return useAuthStore<T>(useShallow(selector));
}

export { useAuthStore, useAuthStoreShallow };
