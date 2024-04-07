import { StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import { Transaction } from "@/types";
import { ZustandMMKVStorage } from "./storage-middleware";

interface IBalanceStore {
  transactions: Array<Transaction>;
  balance: number;
  runTransaction: (transaction: Transaction) => void;
  clearTransactions: () => void;
}

const BalanceStore: StateCreator<IBalanceStore> = (set) => ({
  transactions: [],
  balance: 0,
  runTransaction: (transaction: Transaction) => {
    set((state) => ({
      transactions: [transaction, ...state.transactions],
      balance: state.balance + transaction.amount,
    }));
  },
  clearTransactions: () => {
    set({ transactions: [], balance: 0 });
  },
});

const useBalanceStore = create<IBalanceStore>()(
  persist(BalanceStore, {
    name: "secure-balance-storage",
    storage: createJSONStorage(() => ZustandMMKVStorage),
  })
);

function useBalanceStoreShallow<T>(selector: (s: IBalanceStore) => T) {
  return useBalanceStore<T>(useShallow(selector));
}

export { useBalanceStore, useBalanceStoreShallow };
