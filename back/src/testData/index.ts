import { english_1 } from "./english_1.ts";
import { ts_1 } from "./ts_1.ts";
import { ts_2 } from "./ts_2.ts";
import { ts_3 } from "./ts_3.ts";
import { ts_4 } from "./ts_4.ts";
import { ts_5 } from "./ts_5.ts";
import { word_1 } from "./word_1.ts";

export const testTypes = ["typescript", "english"] as const;

export const testDataMap: Record<TestType, string> = {
  typescript: ts_4,
  english: english_1,
} as const;

export type TestType = (typeof testTypes)[number];
