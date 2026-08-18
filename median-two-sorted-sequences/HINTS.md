# Hints — Median of Two Sorted Sequences

Spoilers. Read only after you have tried on your own.

**Easy (accepted, not optimal):** merge both arrays, or two pointers to the middle → `O(m+n)`.

**Hard (required):** binary search on a partition index across two arrays (classic single-array search is in `../bisection/`).

Core of the log solution:

1. Search cut `i` on the shorter array.
2. `half = floor((m + n + 1) / 2)`, `j = half - i`.
3. Valid when `L1 <= R2` and `L2 <= R1`.
4. Odd → `max(L1, L2)`; even → `(max(L1, L2) + min(R1, R2)) / 2`.
