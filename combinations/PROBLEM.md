# Combinations (n choose k)

**Difficulty:** Medium
**Topics:** Combinatorics
**Target:** `O(C(n,k) * k)` time, `O(k)` extra space (excluding output)

## Problem
Given two integers `n` and `k`, return all possible combinations of `k` numbers chosen from the range `1...n`.

Each combination should be a list of numbers in increasing order.

## Examples

### Example 1

```
Input:  n = 4, k = 2
Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
```

### Example 2

```
Input:  n = 1, k = 1
Output: [[1]]
```

### Example 3

```
Input:  n = 4, k = 0
Output: [[]]
```

## Constraints (exercise)
- `0 <= k <= n <= 30`

## Files

| File | Role |
|------|------|
| `combine.ts` | Stub |
| `combine.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:run -- combinations/combine.test.ts
```

