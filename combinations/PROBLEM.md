# k-Subsets of 1..n

**Difficulty:** Medium
**Topics:** Combinatorics
**Target:** `O(C(n,k) * k)` time, `O(k)` extra space (excluding output)

## Problem

Return every way to pick `k` distinct integers from `1 … n`. Each pick should be listed in increasing order.

Order of the returned lists does not matter.

## Examples

### Example 1

```
Input:  n = 3, k = 2
Output: [[1, 2], [1, 3], [2, 3]]
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

