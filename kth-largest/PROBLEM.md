# Kth Largest Element

**Difficulty:** Medium  
**Topics:** Arrays  
**Target:** `O(n log k)` time, `O(k)` extra space

## Problem

Given an integer array `nums` and an integer `k`, return the `k`-th **largest** element in the array (1-indexed: `k = 1` is the maximum).

This is the `k`-th largest in **sorted order**, not the `k`-th distinct value.

Do **not** use the language built-in sort (`Array.prototype.sort`, etc.) inside the solution.

## Examples

```
Input:  nums = [3,2,1,5,6,4], k = 2
Output: 5

Input:  nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4

Input:  nums = [1], k = 1
Output: 1
```

## Constraints

- `1 <= k <= nums.length <= 10^4` (tests stay smaller)
- values are finite JS numbers (may include negatives and duplicates)

## Files

| File | Role |
|------|------|
| `findKthLargest.ts` | Stub — implement here |
| `findKthLargest.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:kth-largest
```
