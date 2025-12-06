import { useMemo, useState } from "react";

import type { TTest } from "../../test/model/useTestQuery";

export const useSettingsState = () => {
  const [state, setState] = useState<TSettings>({
    duration: 10_000,
    testType: "english",
  });

  const actions = useMemo(() => {
    return {
      setDuration: (duration: TSettings["duration"]) => {
        setState((prev) => {
          return { ...prev, duration };
        });
      },

      setTestType: (testType: TSettings["testType"]) => {
        setState((prev) => {
          return { ...prev, testType };
        });
      },
    };
  }, []);

  return { settings: state, settingsActions: actions };
};

export type TSettings = {
  testType: TTest["type"];
  /**
   * @param duration - ms
   */
  duration: number;
};

export type TSettingsActions = ReturnType<
  typeof useSettingsState
>["settingsActions"];
