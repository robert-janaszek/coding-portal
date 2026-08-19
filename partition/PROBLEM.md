# Partition

**Difficulty:** Easy  
**Topics:** Arrays, Sorting  
**Target:** `O(n)` time, `O(1)` extra space (in-place)

## Problem

Implement **Lomuto partition** on a subarray.

Given `nums` and inclusive bounds `left`, `right`, use `nums[right]` as the **pivot**. Rearrange `nums[left..right]` in place and return the final index `p` of the pivot so that:

- `nums[p]` is the original pivot value
- `nums[i] <= nums[p]` for every `left <= i < p`
- `nums[i] > nums[p]` for every `p < i <= right`
- indices outside `[left, right]` are unchanged
- the subarray is a permutation of the original subarray

## Examples

### Example 1

```
Input:  nums = [5, 1, 2, 4, 3], left = 0, right = 4
Pivot:  3
Output: p = 2
Array after: [1, 2, 3, 4, 5]   (left/right sides may differ; invariant must hold)
```

### Example 2

```
Input:  nums = [3, 1, 4, 2], left = 0, right = 3
Pivot:  2
Output: p = 1
```

### Example 3

```
Input:  nums = [1, 2, 3], left = 0, right = 2
Pivot:  3
Output: p = 2
Array unchanged: every value is <= pivot
```

## Constraints

- `1 <= nums.length <= 10^4` (tests stay smaller)
- `0 <= left <= right < nums.length`
- values are finite JS numbers (negatives and duplicates allowed)

## Files

| File | Role |
|------|------|
| `partition.ts` | Stub — implement here |
| `partition.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |
| `solutions/` | Archived attempts (spoilers) |

```bash
npm run test:partition
```
