# Combination Sum Count

**Difficulty:** Medium
**Topics:** Combinatorics
**Target:** `O(n * target)` time, `O(target)` extra space

## Problem

`candidates` are distinct positive integers. Count how many **multisets** drawn from them sum to `target`. A value may be reused. Order does not matter: `[3, 5]` and `[5, 3]` are one combination.

Return the count, not the lists.

## Examples

### Example 1

```
Input:  candidates = [3, 5, 8], target = 8
Output: 2
Explanation: [3, 5] and [8]
```

### Example 2

```
Input:  candidates = [4, 5, 6], target = 10
Output: 2
Explanation: [4, 6], [5, 5]
```

### Example 3

```
Input:  candidates = [4], target = 3
Output: 0
```

### Example 4

```
Input:  candidates = [1, 3, 4], target = 6
Output: 4
Explanation: [1,1,1,1,1,1], [1,1,1,3], [1,1,4], [3,3]
```

## Constraints (exercise)

- `1 <= candidates.length <= 100`
- `1 <= candidates[i] <= 500`
- all values in `candidates` are unique
- `0 <= target <= 1000`
- the answer fits in a JavaScript `number` (safe integer)

`target = 0` has one combination: the empty list.

## Files

| File | Role |
|------|------|
| `combinationSumCount.ts` | Stub |
| `combinationSumCount.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:combination-sum-count
```
