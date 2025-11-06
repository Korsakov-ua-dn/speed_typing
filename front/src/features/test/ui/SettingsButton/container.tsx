import { useOpen } from "../../../../shared/hooks/useOpen";
import { Modal } from "../../../../shared/ui/Modal";

import { useTestTypesQuery } from "../../../../entities/test/model/useTestTypesQuery";
import { useSettingsContext } from "../../../../entities/settings/model/context";
import { TSettings } from "../../../../entities/settings/model/state";

import { SettingsIcon } from "./Icon/ui";

export const SettingsButton = () => {
  const { types, status: testTypesFetchingStatus } = useTestTypesQuery();

  const { isOpen, actions } = useOpen();

  const { settings, settingsActions } = useSettingsContext();

  return (
    <>
      <button onClick={actions.toggle}>
        <SettingsIcon />
      </button>

      {isOpen && (
        <Modal onClose={actions.close}>
          <select
            onChange={(event) => {
              const value = event.currentTarget.value as TSettings["testType"];
              settingsActions.setTestType(value);
            }}
            value={settings.testType}
          >
            {types?.map((type) => {
              return (
                <option key={type} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
        </Modal>
      )}
    </>
  );
};
