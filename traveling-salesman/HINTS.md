# Hints — Traveling Salesman

Spoilers. Read only after you have tried on your own.

TSP is **NP-complete**; exact solvers are exponential. For `n ≤ 12`, Held–Karp is the usual interview DP.

## Held–Karp

Let `dp[mask][u]` = min cost to start at `0`, visit exactly the cities in `mask`, and end at `u`. City `0` is always in `mask`.

- Base: `dp[1 << 0][0] = 0`
- Transition: for each `mask`, each `u` in `mask`, each `v` not in `mask`:
  `dp[mask | (1 << v)][v] = min(..., dp[mask][u] + dist[u][v])`
- Answer: `min over u of dp[(1 << n) - 1][u] + dist[u][0]`

## Brute force

Permute cities `1 … n-1` after a fixed start `0`, add the return edge. Fine for `n ≤ 8`.
