# K-th Largest in an Array

**Difficulty:** Medium  
**Topics:** Arrays  
**Target:** `O(n log k)` time, `O(k)` extra space

## Problem

Return the `k`-th largest value in `nums` (`k = 1` is the maximum). Duplicates count separately — this is rank in sorted order, not distinct values.

## Examples

```
Input:  nums = [9, 3, 7, 1], k = 2
Output: 7

Input:  nums = [4, 4, 1, 8, 4], k = 3
Output: 4

Input:  nums = [2], k = 1
Output: 2
```

## Constraints

- `1 <= k <= nums.length <= 10^4` (tests stay smaller)
- values are finite JS numbers (may include negatives and duplicates)

## Files

| File | Role |
|------|------|
| `kthLargestInArray.ts` | Stub — implement here |
| `kthLargestInArray.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:kth-largest-in-array
```
