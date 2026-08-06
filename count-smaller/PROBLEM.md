# Count Smaller After Self

**Difficulty:** Hard  
**Topics:** Arrays, Ordered set, Divide and conquer  
**Target:** `O(n log n)` time

## Problem

Given an integer array `nums`, return an array `counts` where `counts[i]` is the number of elements to the **right** of `nums[i]` that are **strictly smaller** than `nums[i]`.

In other words, for each index `i`:

`counts[i] = |{ j | j > i and nums[j] < nums[i] }|`

## Examples

### Example 1

```
Input:  nums = [5, 2, 6, 1]
Output: [2, 1, 1, 0]
```

Explanation:

- `5` → `2` and `1` are smaller to the right → `2`
- `2` → only `1` → `1`
- `6` → only `1` → `1`
- `1` → nothing → `0`

### Example 2

```
Input:  nums = [-1]
Output: [0]
```

### Example 3

```
Input:  nums = [-1, -1]
Output: [0, 0]
```

(Strictly smaller — equal values do not count.)

## Constraints

- `1 <= nums.length <= 10^5` (tests stay smaller, but aim for `O(n log n)`)
- `-10^4 <= nums[i] <= 10^4`
- Brute force `O(n²)` is too slow for the intended target

## Files

| File | Role |
|------|------|
| `countSmaller.ts` | Stub — implement here |
| `countSmaller.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |
| `solutions/` | Archived attempts (spoilers) |

```bash
npm run test:count-smaller
```
