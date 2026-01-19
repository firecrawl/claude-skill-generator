import { createContext, useContext, ReactNode } from "react";

export type TabsValue = "monthly" | "yearly";

interface TabsContextType {
  value: TabsValue;
  setValue: (value: TabsValue) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function TabsProvider({
  children,
  value,
  setValue,
}: {
  children: ReactNode;
  value: TabsValue;
  setValue: (value: TabsValue) => void;
}) {
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      {children}
    </TabsContext.Provider>
  );
}

export function useTabs() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("useTabs must be used within a TabsProvider");
  }

  return context;
}
