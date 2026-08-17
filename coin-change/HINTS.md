# Hints — Coin Change

Spoilers. Read only after you have tried on your own.

## Idea

Greedy (always take the largest coin) is wrong — `[1, 3, 4]` and `amount = 6` wants two `3`s, not `4 + 1 + 1`.

Let `dp[s]` = fewest coins that sum to `s`, or a sentinel meaning impossible.

## Structure

Base: `dp[0] = 0`. Every other `dp[s]` starts as `amount + 1` (or `Infinity`).

```
for s from 1 to amount:
  for each coin c <= s:
    dp[s] = min(dp[s], dp[s - c] + 1)
```

Reuse is unbounded because you look at smaller sums that may already have used `c`.

Answer: `dp[amount]` if it is finite, else `-1`.

## Complexity

`amount` sums, `n` coins each: `O(n * amount)` time, `O(amount)` extra space.
