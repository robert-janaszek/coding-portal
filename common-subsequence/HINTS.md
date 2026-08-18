# Hints — Common Subsequence Length

Spoilers. Read only after you have tried on your own.

Let `dp[i][j]` be the answer for prefixes `s[0..i)` and `t[0..j)`.

- `dp[0][j] = dp[i][0] = 0`
- if `s[i - 1] === t[j - 1]`: take the match → `dp[i - 1][j - 1] + 1`
- else: drop a letter from one side → `max(dp[i - 1][j], dp[i][j - 1])`

Only the previous row is needed if you want `O(min(m, n))` extra space.

Same grid shape as string conversion cost; the recurrence just has no insert/delete/replace penalties.
