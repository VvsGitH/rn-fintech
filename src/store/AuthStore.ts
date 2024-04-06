import { create } from "zustand";

interface IAuthStore {
  authenticated: boolean;
  signUp: (phone: string) => Promise<void>;
}

const useAuthStore = create<IAuthStore>((set) => ({
  authenticated: false,
  signUp: async (phone: string) => {
    console.log(phone);
    await new Promise((res) => setTimeout(res, 1000));
    set({ authenticated: true });
  },
}));

export default useAuthStore;
