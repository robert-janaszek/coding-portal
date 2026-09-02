# Heaviest Stretch

**Difficulty:** Easy
**Topics:** Arrays
**Target:** `O(n)` time, `O(1)` extra space

## Problem

Given a line of integers `nums` (negatives allowed), pick a **contiguous** stretch of indices that maximizes the sum of its values.

Return that maximum sum (not the stretch itself). The stretch must be non-empty when `nums` is non-empty — you cannot skip every cell. If the line is empty, return `0`.

## Examples

### Example 1

```
Input:  nums = [3, -2, 5, -1]
Output: 6
Explanation: 3 + -2 + 5; dropping the -2 would lose the 3
```

### Example 2

```
Input:  nums = [-4, -1, -7]
Output: -1
Explanation: every stretch is negative; keep the least-bad cell
```

### Example 3

```
Input:  nums = [2, -5, 3, 4, -1]
Output: 7
Explanation: 3 + 4; the dip of -5 is not worth bridging
```

### Example 4

```
Input:  nums = []
Output: 0
```

## Constraints (exercise)

- `0 <= nums.length <= 10^5` (tests smaller)
- `-10^4 <= nums[i] <= 10^4`

## Files

| File | Role |
|------|------|
| `heaviestStretch.ts` | Stub — implement here |
| `heaviestStretch.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:heaviest-stretch
```
