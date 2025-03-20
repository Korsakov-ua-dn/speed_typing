import { TSESTree } from "@typescript-eslint/typescript-estree";

export const concatTokensWithComments = (
  tokens: TSESTree.Token[],
  comments: TSESTree.Comment[]
) => {
  const result = new Array(tokens.length + comments.length);

  let tokenIndex = 0;
  let commentIndex = 0;
  let resultIndex = 0;

  while (tokenIndex < tokens.length || commentIndex < comments.length) {
    const tokenRangeStart = tokens[tokenIndex]?.range[0] ?? Infinity;
    const commentRangeStart = comments[commentIndex]?.range[0] ?? Infinity;

    if (tokenRangeStart < commentRangeStart) {
      result[resultIndex] = tokens[tokenIndex];
      tokenIndex++;
    } else {
      result[resultIndex] = comments[commentIndex];
      commentIndex++;
    }
    resultIndex++;
  }

  return result;
};
