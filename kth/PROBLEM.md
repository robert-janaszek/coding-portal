# K-th Element in Two Sorted Arrays

**Difficulty:** Hard  
**Topics:** Arrays  
**Target complexity:** `O(log(min(m, n)))` time, `O(1)` extra space

## Problem

Given two sorted arrays `nums1` and `nums2` of size `m` and `n`, and an integer `k` (1-indexed), return the `k`-th smallest element in the merged sorted sequence of the two arrays.

## Examples

### Example 1

```
Input:  nums1 = [1, 3, 5], nums2 = [2, 4, 6], k = 4
Output: 4
Explanation: merged = [1,2,3,4,5,6], 4th element = 4
```

### Example 2

```
Input:  nums1 = [1, 2], nums2 = [3, 4], k = 1
Output: 1
```

### Example 3

```
Input:  nums1 = [1, 2], nums2 = [3, 4], k = 4
Output: 4
```

## Constraints

- `0 <= m, n`
- `1 <= m + n`
- `1 <= k <= m + n`
- arrays are sorted in non-decreasing order
- values fit in a standard JS/TS `number` for these exercises

## Files

| File | Role |
|------|------|
| `findKthSortedArrays.ts` | Stub — implement here |
| `solutions/` | Archived attempts (spoilers) |
| `findKthSortedArrays.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:kth
```
