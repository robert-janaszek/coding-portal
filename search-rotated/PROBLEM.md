# Search in Rotated Sorted Array

**Difficulty:** Medium
**Topics:** Arrays, Search
**Target:** `O(log n)` time, `O(1)` space

## Problem

An array `nums` of unique integers was sorted in ascending order, then **rotated** at an unknown pivot. For example, `[0, 1, 2, 4, 5, 6, 7]` may become `[4, 5, 6, 7, 0, 1, 2]`.

Given `nums` and `target`, return the **index** of `target`, or `-1` if it is not present.

You must use modified binary search — do not scan linearly. A rotation is optional: a fully sorted array is a valid input (rotation of `0`).

## Examples

### Example 1

```
Input:  nums = [4, 5, 6, 7, 0, 1, 2], target = 0
Output: 4
```

### Example 2

```
Input:  nums = [4, 5, 6, 7, 0, 1, 2], target = 3
Output: -1
```

### Example 3

```
Input:  nums = [1], target = 0
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
| `searchRotated.ts` | Stub — implement here |
| `searchRotated.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:search-rotated
```
