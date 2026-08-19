# Search in Bitonic Array

**Difficulty:** Medium
**Topics:** Arrays, Search
**Target:** `O(log n)` time, `O(1)` space

## Problem

A **bitonic** (mountain) array strictly increases up to a single peak, then strictly decreases. For example:

```
[1, 3, 8, 12, 4, 2]
         ^
        peak
```

The two halves are sorted **separately**: left of the peak is ascending, right of the peak is descending. The peak is never the first or last index.

Given `nums` and `target`, return the **index** of `target`, or `-1` if it is not present.

## Examples

### Example 1

```
Input:  nums = [1, 3, 8, 12, 4, 2], target = 4
Output: 4
```

### Example 2

```
Input:  nums = [1, 3, 8, 12, 4, 2], target = 12
Output: 3
```

### Example 3

```
Input:  nums = [1, 3, 8, 12, 4, 2], target = 5
Output: -1
```

## Constraints (exercise)

- `3 <= nums.length <= 5000` (tests smaller)
- `-10^4 <= nums[i], target <= 10^4`
- all values in `nums` are **unique**
- there is exactly one peak; `nums[0] < … < nums[p] > … > nums[n - 1]` with `0 < p < n - 1`

## Files

| File | Role |
|------|------|
| `searchBitonic.ts` | Stub — implement here |
| `searchBitonic.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:search-bitonic
```
