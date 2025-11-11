import { Modal } from "../../../../shared/ui/Modal";

import type { TTest } from "../../model/useTestQuery";

type TProps = {
  userInput: string;
  testData: TTest;
  onClose: VoidFunction;
};

export const StatModal = ({ testData, userInput, onClose }: TProps) => {
  const wpm = (() => {})();

  console.log({ testData });
  console.log({ userInput });

  return (
    <Modal onClose={onClose}>
      <div></div>
    </Modal>
  );
};
