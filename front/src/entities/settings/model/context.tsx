import { createContext, useContext } from "react";

import { useSettingsState } from "./state";

type TContext = ReturnType<typeof useSettingsState>;

const Context = createContext<TContext | null>(null);

export const useSettingsContext = () => {
  const data = useContext(Context);

  if (!data) {
    throw new Error(
      "Can not use 'useSettingsContext' outside of the 'SettingsProvider'"
    );
  }

  return data;
};

type TProps = {
  children: React.ReactNode;
};

export const SettingsProvider = ({ children }: TProps) => {
  const state = useSettingsState();

  return <Context.Provider value={state}>{children}</Context.Provider>;
};
