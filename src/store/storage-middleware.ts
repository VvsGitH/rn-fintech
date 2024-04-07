import { StateStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
import { MMKV } from "react-native-mmkv";

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

const storage = new MMKV({ id: "zustand-mmkv-storage" });

export const ZustandMMKVStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};
