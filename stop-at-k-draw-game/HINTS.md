# Hints — Stop-at-K Draw Game

Spoilers. Read only after you have tried on your own.

Let `dp[x]` = probability of finishing with score `<= n`, given the current score is already `x`.

If `x >= k` she has stopped: `dp[x] = 1` if `x <= n`, else `0`.

If `x < k` she draws: `dp[x] = (dp[x+1] + … + dp[x+maxPts]) / maxPts`.

Fill from large `x` down to `0`. Answer: `dp[0]`.

If `k = 0` she never draws (score stays 0) → `1`.

The nested sum is `O(n * maxPts)`, which is enough here. Consecutive windows overlap, so you can maintain a running sum and get `O(n)` if you want.
