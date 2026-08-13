# Hints — 0/1 Knapsack

Spoilers. Read only after you have tried on your own.

The decision version is **NP-complete**; with integer capacity `W` the usual DP is `O(nW)` (pseudo-polynomial).

Let `dp[w]` = max value using capacity exactly (or at most) `w`.

Process items one by one. For each item `(wt, val)`, iterate `w` **downward** from `capacity` to `wt`:

```
dp[w] = max(dp[w], dp[w - wt] + val)
```

Downward order ensures each item is used at most once (forward order would be unbounded knapsack).

Answer: `dp[capacity]`.
