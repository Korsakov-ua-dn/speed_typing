import { AST_TOKEN_TYPES, parse } from "@typescript-eslint/typescript-estree";

import { concatTokensWithComments } from "../concatTokensWithComments/index.js";

export const getTSAST = (text: string) => {
  const result = parse(text, {
    comment: true,
    tokens: true,
    jsx: true,
  });

  const validTokens = result.tokens.filter(
    (token) => token.type !== AST_TOKEN_TYPES.Punctuator
  );

  return concatTokensWithComments(validTokens, result.comments);
};
