export const ts_5 = `import { Modal } from "../../../../shared/ui/Modal";

import type { TTest } from "../../model/useTestQuery";

type TProps = {
  userInput: string;
  testData: TTest;
  onClose: VoidFunction;
};

/**
 *
 * @param testData full data
 * @returns
 */
export const StatModal = ({ testData, userInput, onClose }: TProps) => {
  const wpm = (() => {})();

  console.log({ testData });
  console.log({ userInput });

  // Some comment
  // the end
  return (
    <Modal onClose={onClose}>
          {/* 
        start ====>
        ======>     end
        */}
      <div></div>
    </Modal>
  );
};

`;
