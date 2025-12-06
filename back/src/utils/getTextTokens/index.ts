import {
  AST_TOKEN_TYPES,
  TSESTree,
} from "@typescript-eslint/typescript-estree";

export const getTextTokens = (text: string): TSESTree.Token[] => {
  let tokens = [];
  let range0 = 0;

  for (let i = 0, l = text.length; i <= l; i++) {
    if (/^[a-zA-Zа-яА-Я]$/.test(text[i])) {
      continue;
    }

    if (range0 === i) {
      range0++;
      continue;
    }

    const value = text.slice(range0, i);

    tokens.push({
      // loc: {
      //   end: { column: 0, line: 0 },
      //   start: { column: 0, line: 0 },
      // },
      range: [range0, i],
      type: "String",
      value,
    } as TSESTree.Token);

    range0 = i + 1;
  }

  return tokens;
};
