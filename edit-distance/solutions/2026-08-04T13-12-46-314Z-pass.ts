export function minDistance(word1: string, word2: string): number {
  const dp: number[][] = [[]];

  dp[0][0] = 0;

  for (let i = 0; i <= word1.length; i++) {
    for (let j = 0; j <= word2.length; j++) {
      if (i === 0) {
        if (!dp[i]) {
          dp[i] = [];
        }
        dp[i][j] = j;
      }
      if (j === 0) {
        if (!dp[i]) {
          dp[i] = [];
        }
        dp[i][j] = i;
      }

      if (j === 0 || i === 0) {
        continue;
      }

      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
        continue;
      }

      dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }

  if (word1.length === 0) {
    return word2.length;
  }

  if (word2.length === 0) {
    return word1.length;
  }

  return dp[word1.length][word2.length];
}
