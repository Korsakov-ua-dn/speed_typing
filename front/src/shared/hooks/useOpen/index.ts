import { useMemo, useState } from "react";

export type TOpenActions = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const useOpen = () => {
  const [isOpen, setVisible] = useState(false);

  const actions: TOpenActions = useMemo(
    () => ({
      open: () => setVisible(true),
      close: () => setVisible(false),
      toggle: () => setVisible((prev) => !prev),
    }),
    []
  );

  return {
    isOpen,
    actions,
  };
};
