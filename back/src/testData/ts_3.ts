export const ts_3 = `import { testTypes, type TestType } from "../../testData/index.ts";

export const isTestType = (value: unknown): value is TestType => {
  if (typeof value !== "string") {
    return false;
  }

  if (!testTypes.includes(value as (typeof testTypes)[number])) {
    return false;
  }

  return true;
};

`;
