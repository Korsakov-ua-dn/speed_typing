import { useQuery } from "@tanstack/react-query";

import { request } from "../../../../utils/request";

import { TTestType } from "../../model/types";

export function useTestTypesQuery() {
  const { data: types, ...rest } = useQuery({
    queryKey: ["tests"],
    queryFn: () => request<TTestType[]>("tests"),
  });

  return {
    types,
    ...rest,
  };
}
