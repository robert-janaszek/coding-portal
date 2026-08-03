# Hints — Edit Distance

Spoilers. Read only after you have tried on your own.

`dp[i][j]` = edit distance of `word1[0..i)` and `word2[0..j)`.

- `dp[0][j] = j`, `dp[i][0] = i`
- if `word1[i-1] === word2[j-1]`: `dp[i][j] = dp[i-1][j-1]`
- else: `1 + min(replace, delete, insert)` =
  `1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])`

Space can be optimized to `O(min(m, n))`.
