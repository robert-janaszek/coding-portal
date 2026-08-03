# Hints — K-th in Two Sorted Arrays

Spoilers. Read only after you have tried on your own.

Related to median: odd `m+n` → `k = (m+n+1)/2`; even → average of `k` and `k+1` with `k = (m+n)/2`.

Partition idea (left side size = `k`):

1. Binary-search partition index `i` on the shorter array.
2. `j = k - i`.
3. Keep `i` in `max(0, k-n) … min(k, m)` so `j` stays valid.
4. Boundaries `L1/R1`, `L2/R2` with `-∞` / `+∞` on edges.
5. Valid cut: `L1 <= R2` and `L2 <= R1`.
6. Answer: `max(L1, L2)`.
