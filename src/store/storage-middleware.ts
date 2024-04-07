import { StateStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";

export const ZustandSecureStorage: StateStorage = {
  setItem: (key, value) => {
    return SecureStore.setItemAsync(key, value);
  },
  getItem: async (key) => {
    const value = await SecureStore.getItemAsync(key);
    return value ?? null;
  },
  removeItem: (key) => {
    return SecureStore.deleteItemAsync(key);
  },
};
