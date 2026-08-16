# Reverse Pairs

**Difficulty:** Hard  
**Topics:** Arrays, Divide and Conquer  
**Target:** `O(n log n)` time

## Problem

Given an integer array `nums`, return the number of **reverse pairs**.

A reverse pair is a pair of indices `(i, j)` such that:

- `0 <= i < j < nums.length`
- `nums[i] > 2 * nums[j]`

Same family as **Count Smaller After Self**: divide by index, merge-sort the halves, count crossing pairs during merge. The comparison for counting is `>` vs `2 *`, not just `<`.

## Examples

### Example 1

```
Input:  nums = [1, 3, 2, 3, 1]
Output: 2
```

Pairs: `(1, 4)` → `3 > 2 * 1`, and `(3, 4)` → `3 > 2 * 1`.

### Example 2

```
Input:  nums = [2, 4, 3, 5, 1]
Output: 3
```

Pairs: `(1, 4)` → `4 > 2`, `(2, 4)` → `3 > 2`, `(3, 4)` → `5 > 2`.

### Example 3

```
Input:  nums = [5, 4, 3, 2, 1]
Output: 4
```

## Constraints

- `1 <= nums.length <= 5 * 10^4` (tests stay smaller, but aim for `O(n log n)`)
- `-2^31 <= nums[i] <= 2^31 - 1`
- Brute force `O(n²)` is too slow for the intended target

## Files

| File | Role |
|------|------|
| `reversePairs.ts` | Stub — implement here |
| `reversePairs.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |
| `solutions/` | Archived attempts (spoilers) |

```bash
npm run test:reverse-pairs
```
