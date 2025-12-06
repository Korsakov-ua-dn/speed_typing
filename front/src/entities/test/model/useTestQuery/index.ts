import { useQuery } from "@tanstack/react-query";

import { request } from "../../../../utils/request";

type TTokenType =
  | "Boolean"
  | "Identifier"
  | "JSXIdentifier"
  | "JSXText"
  | "Keyword"
  | "Null"
  | "Numeric"
  | "Punctuator"
  | "RegularExpression"
  | "String"
  | "Template"
  | "Block"
  | "Line";

type TToken = {
  range: [number, number];
  type: TTokenType;
  value: string;
};

export const useTestQuery = (type: TTest["type"]) => {
  const { data: testData, ...rest } = useQuery({
    queryKey: ["testData", type],
    queryFn: () => request<TTest>(`tests/${type}`),
  });

  return {
    testData,
    ...rest,
  };
};

export type TTest = {
  type: TTestType;
  text: string;
  tokens: TToken[];
};

type TTestType = "typescript" | "english";
