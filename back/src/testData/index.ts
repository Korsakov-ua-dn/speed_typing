import { ts_1 } from "./ts_1.js";
import { ts_2 } from "./ts_2.js";
import { word_1 } from "./word_1.js";

import type { TestDataType } from "../index.js";

export const testDataMap: Record<TestDataType, string> = {
  typescript: ts_2,
  word: word_1,
} as const;
