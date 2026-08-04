# Binary Search (Bisection)

**Difficulty:** Easy → Medium  
**Topics:** Arrays, search  
**Target:** `O(log n)` time, `O(1)` space

## Problem

Given a sorted array of integers `nums` (ascending) and a target value `target`, return the **index** of `target` if it exists.

If `target` is not present, return `-1`.

You must use **bisection / binary search** — do not scan linearly.

## Examples

```
Input:  nums = [-1,0,3,5,9,12], target = 9
Output: 4

Input:  nums = [-1,0,3,5,9,12], target = 2
Output: -1

Input:  nums = [5], target = 5
Output: 0
```

## Constraints

- `0 <= nums.length <= 10^4` (empty → `-1`)
- `-10^4 <= nums[i], target <= 10^4`
- `nums` is sorted ascending
- all values in `nums` are **unique**

## Files

| File | Role |
|------|------|
| `binarySearch.ts` | Stub — implement here |
| `binarySearch.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:bisection
```
