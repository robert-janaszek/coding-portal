# 0/1 Knapsack

**Difficulty:** Medium  
**Topics:** NP-complete  
**Target:** `O(n * capacity)` time, `O(capacity)` extra space (or `O(n * capacity)`)

## Problem

You have `n` items. Item `i` has weight `weights[i]` and value `values[i]`. The knapsack holds at most `capacity` total weight.

Each item may be taken **at most once** (0/1). Return the **maximum total value** that fits.

This is the classic **0/1 knapsack** problem (NP-complete in general). Tests keep `n` and `capacity` modest.

## Examples

```
Input:  weights = [1, 2, 3], values = [6, 10, 12], capacity = 5
Output: 22
Explanation: take items with weights 2 and 3 (values 10 + 12)

Input:  weights = [2, 3, 4, 5], values = [3, 4, 5, 6], capacity = 5
Output: 7
Explanation: weights 2 + 3

Input:  weights = [10], values = [1], capacity = 5
Output: 0
```

## Constraints

- `n == weights.length == values.length`
- `0 <= n <= 100`
- `0 <= capacity <= 1000`
- `1 <= weights[i], values[i] <= 1000` when `n > 0`

## Files

| File | Role |
|------|------|
| `knapsack.ts` | Stub — implement here |
| `knapsack.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:knapsack
```
