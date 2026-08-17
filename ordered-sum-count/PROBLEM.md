# Ordered Sum Count

**Difficulty:** Medium
**Topics:** Combinatorics
**Target:** `O(n * target)` time, `O(target)` extra space

## Problem

Given an array of **distinct** positive integers `nums` and a target integer `target`, return the number of sequences that sum to `target`. You may reuse a number **unlimited** times.

Order matters: `[1, 2]` and `[2, 1]` are two different sequences.

## Examples

### Example 1

```
Input:  nums = [1, 2, 3], target = 4
Output: 7
Explanation:
[1,1,1,1]
[1,1,2], [1,2,1], [2,1,1]
[1,3], [3,1]
[2,2]
```

### Example 2

```
Input:  nums = [9], target = 3
Output: 0
```

### Example 3

```
Input:  nums = [2, 3, 6, 7], target = 7
Output: 4
Explanation:
[2,2,3], [2,3,2], [3,2,2], [7]
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
