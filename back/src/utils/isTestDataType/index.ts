import { testTypes, type TestType } from "../../testData/index.js";

export const isTestType = (value: unknown): value is TestType => {
  if (typeof value !== "string") {
    return false;
  }

  if (!testTypes.includes(value as (typeof testTypes)[number])) {
    return false;
  }

  return true;
};
