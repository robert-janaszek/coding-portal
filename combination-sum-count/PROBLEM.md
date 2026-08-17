# Combination Sum Count

**Difficulty:** Medium
**Topics:** Combinatorics
**Target:** `O(n * target)` time, `O(target)` extra space

## Problem

Given an array of **distinct** positive integers `candidates` and a target integer `target`, return **how many** unique combinations sum to `target`.

You may reuse a candidate **unlimited** times.

Two combinations are unique if the frequency of at least one number differs. Order does not matter: `[2,2,3]` and `[2,3,2]` count as one.

Return the count, not the lists themselves.

## Examples

### Example 1

```
Input:  candidates = [2, 3, 6, 7], target = 7
Output: 2
Explanation: [2,2,3] and [7]
```

### Example 2

```
Input:  candidates = [2, 3, 5], target = 8
Output: 3
Explanation: [2,2,2,2], [2,3,3], [3,5]
```

### Example 3

```
Input:  candidates = [2], target = 1
Output: 0
```

### Example 4

```
Input:  candidates = [1, 2, 5], target = 5
Output: 4
Explanation: [1,1,1,1,1], [1,1,1,2], [1,2,2], [5]
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
