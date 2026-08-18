# Ordered Sum Count

**Difficulty:** Medium
**Topics:** Combinatorics
**Target:** `O(n * target)` time, `O(target)` extra space

## Problem

Given distinct positive integers `nums` and a `target`, count sequences that sum to `target`. Values may be reused. Order matters: `[1, 3]` and `[3, 1]` are different.

## Examples

### Example 1

```
Input:  nums = [1, 3], target = 4
Output: 4
Explanation:
[1,1,1,1]
[1,1,3], [1,3,1], [3,1,1]
```

### Example 2

```
Input:  nums = [9], target = 3
Output: 0
```

### Example 3

```
Input:  nums = [2, 5], target = 7
Output: 2
Explanation: [2, 5] and [5, 2]
```

## Constraints (exercise)

- `1 <= nums.length <= 200`
- `1 <= nums[i] <= 1000`
- all values in `nums` are unique
- `1 <= target <= 1000`
- the answer fits in a 32-bit signed integer

## Files

| File | Role |
|------|------|
| `orderedSumCount.ts` | Stub |
| `orderedSumCount.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:ordered-sum-count
```
