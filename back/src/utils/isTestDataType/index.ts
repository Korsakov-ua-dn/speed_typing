import type { TestDataType } from "../../index.js";

export const isTestDataType = (value: unknown): value is TestDataType => {
  if (value === "word" || value === "typescript") {
    return true;
  }

  return false;
};
