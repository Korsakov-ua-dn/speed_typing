import { useQuery } from "@tanstack/react-query";

import { request } from "../../../../utils/request";

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
  ast: any[];
};

type TTestType = "typescript" | "word";
