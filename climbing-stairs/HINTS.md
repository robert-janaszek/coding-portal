# Hints — Climbing Stairs

Spoilers. Read only after you have tried on your own.

This is Fibonacci in disguise.

Let `dp[i]` = number of ways to reach step `i`.

- `dp[1] = 1`
- `dp[2] = 2`
- for `i >= 3`: `dp[i] = dp[i - 1] + dp[i - 2]`
  (last jump was 1 step from `i-1`, or 2 steps from `i-2`)

Answer: `dp[n]`.

You only need the last two values → `O(1)` extra space.
