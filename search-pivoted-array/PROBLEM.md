# Search a Pivoted Array

**Difficulty:** Medium
**Topics:** Arrays, Search
**Target:** `O(log n)` time, `O(1)` space

## Problem

`nums` is a strictly increasing sequence that was **cut once** and the two pieces swapped. Example: `[-3, 0, 2, 8, 14]` might become `[8, 14, -3, 0, 2]`. A cut of zero (still fully sorted) is allowed.

Find the index of `target`, or `-1` if it is missing. Use modified binary search — a linear scan is too slow for the target.

## Examples

### Example 1

```
Input:  nums = [8, 14, -3, 0, 2], target = 0
Output: 3
```

### Example 2

```
Input:  nums = [8, 14, -3, 0, 2], target = 5
Output: -1
```

### Example 3

```
Input:  nums = [4], target = 1
Output: -1
```

## Constraints (exercise)

- `0 <= nums.length <= 5000` (empty → `-1`)
- `-10^4 <= nums[i], target <= 10^4`
- all values in `nums` are **unique**
- `nums` is a rotation of a strictly ascending array

## Files

| File | Role |
|------|------|
| `searchPivotedArray.ts` | Stub — implement here |
| `searchPivotedArray.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:search-pivoted-array
```
