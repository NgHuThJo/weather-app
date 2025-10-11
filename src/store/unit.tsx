import { createContext, use, useState, type PropsWithChildren } from "react";
import { type StoreApi, create, useStore } from "zustand";

type UnitStoreProviderProps = PropsWithChildren;
type Unit = "metric" | "imperial";

type UnitStore = {
  currentUnitId: Unit;
  setCurrentUnitId: (unit: Unit) => void;
};

const UnitContext = createContext<StoreApi<UnitStore> | null>(null);

export const useUnitStore = <T,>(selector: (state: UnitStore) => T) => {
  const store = use(UnitContext);

  if (!store) {
    throw new Error("Missing UnitProvider");
  }

  return useStore(store, selector);
};

export const useCurrentUnitId = () =>
  useUnitStore((state) => state.currentUnitId);

export function UnitStoreProvider({ children }: UnitStoreProviderProps) {
  const [store] = useState(() =>
    create<UnitStore>()((set) => ({
      currentUnitId: "metric",
      setCurrentUnitId: (unit) =>
        set(() => ({
          currentUnitId: unit,
        })),
    })),
  );

  return <UnitContext value={store}>{children}</UnitContext>;
}
