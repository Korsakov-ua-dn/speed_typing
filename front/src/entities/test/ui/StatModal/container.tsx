import { Modal } from "../../../../shared/ui/Modal";

import { useSettingsContext } from "../../../settings/model/context";

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
  const { settings } = useSettingsContext();

  const { tokens, text } = testData;

  let correctWordsCount = 0;
  let incorrectWordsCount = 0;

  for (let i = 0; i < tokens.length; i++) {
    const currentToken = tokens[i];
    const prevToken = tokens[i - 1];

    // if last word unfinished
    if (currentToken.range[1] > userInput.length) {
      break;
    }

    const originFragment = text.slice(
      currentToken.range[0],
      currentToken.range[1]
    );

    const typedFragment = userInput.slice(
      currentToken.range[0],
      currentToken.range[1]
    );

    const missingRangeBeforeOrigin = !prevToken
      ? text.slice(0, currentToken.range[0])
      : text.slice(prevToken.range[1], currentToken.range[0]);

    const missingRangeBeforeTyped = !prevToken
      ? userInput.slice(0, currentToken.range[0])
      : userInput.slice(prevToken.range[1], currentToken.range[0]);

    console.log(
      "originFragment === typedFragment: ",
      originFragment,
      " === ",
      typedFragment
    );

    console.log(
      "missingRangeBeforeOrigin === typedFmissingRangeBeforeTypedragment: ",
      missingRangeBeforeOrigin,
      " === ",
      missingRangeBeforeTyped
    );

    if (
      originFragment === typedFragment &&
      missingRangeBeforeOrigin === missingRangeBeforeTyped
    ) {
      correctWordsCount += 1;
    } else {
      incorrectWordsCount += 1;
    }
  }

  const totalWordsCount = correctWordsCount + incorrectWordsCount;

  return (
    <Modal onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", color: "#000" }}>
        <span>{(correctWordsCount / totalWordsCount) * 100}%</span>

        <span>
          wpm:
          {(totalWordsCount * 60) / (settings.duration / 1000)}
        </span>

        <span>correct: {correctWordsCount}</span>

        <span>incorrec: {incorrectWordsCount}</span>
      </div>
    </Modal>
  );
};
