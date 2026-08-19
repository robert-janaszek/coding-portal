# Non-Adjacent Max

**Difficulty:** Easy
**Topics:** Arrays
**Target:** `O(n)` time, `O(1)` extra space

## Problem

Given a line of non-negative integers `nums`, pick a subset that maximizes the sum. Two chosen indices may not be adjacent.

Return the maximum sum. An empty line sums to `0`.

## Examples

### Example 1

```
Input:  nums = [4, 1, 5, 8, 3]
Output: 12
Explanation: 4 + 8, or 4 + 5 + 3
```

### Example 2

```
Input:  nums = [6, 1, 2, 10]
Output: 16
Explanation: 6 + 10
```

### Example 3

```
Input:  nums = [5]
Output: 5
```

### Example 4

```
Input:  nums = []
Output: 0
```

## Constraints (exercise)

- `0 <= nums.length <= 100`
- `0 <= nums[i] <= 1000`

## Files

| File | Role |
|------|------|
| `nonAdjacentMax.ts` | Stub |
| `nonAdjacentMax.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:non-adjacent-max
```
