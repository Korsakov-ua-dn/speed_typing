import {
  AST_TOKEN_TYPES,
  parse,
  TSESTree,
} from "@typescript-eslint/typescript-estree";

import { concatTokensWithComments } from "../concatTokensWithComments/index.ts";

export const getTSTokens = (text: string) => {
  const result = parse(text, {
    comment: true,
    tokens: true,
    jsx: true,
    loc: true,
    jsDocParsingMode: "all",
  });

  const validTokens = result.tokens.filter(
    (token) =>
      token.type !== AST_TOKEN_TYPES.Punctuator && // "punctuation marks, quotation marks, etc."
      token.type !== AST_TOKEN_TYPES.JSXText && // "/n"
      token.type !== AST_TOKEN_TYPES.Template // "`${"
  );

  return concatTokensWithComments(validTokens, result.comments);
};

/**
 * @todo
 * Необходимо как-то парсить
 * строки - type: "String", value : const text = 'some text description' или '"../../../../shared/ui/Modal"'
 * блоки - type: "Block", value: "*\n *\n * @param testData full data\n * @returns\n "
 * комментарии // - type: "Line", value: " Some comment"
 */

// const text = "../shared/ui/Modal";
// const text = "some text description";
