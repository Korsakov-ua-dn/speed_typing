import { useQuery } from "@tanstack/react-query";

import { request } from "../../../../utils/request";

import { TestType } from "../../model";

export function useTestTypesQuery() {
  const { data: types, ...rest } = useQuery({
    queryKey: ["tests"],
    queryFn: () => request<TestType>("tests"),
  });

  return {
    types,
    ...rest,
  };
}
