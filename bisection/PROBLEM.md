# Binary Search (Bisection)

**Difficulty:** Easy → Medium  
**Topics:** Arrays, Search  
**Target:** `O(log n)` time, `O(1)` space

## Problem

`nums` is strictly increasing. Return the index of `target`, or `-1` if it is missing.

## Examples

```
Input:  nums = [2, 4, 8, 16, 32], target = 16
Output: 3

Input:  nums = [2, 4, 8, 16, 32], target = 6
Output: -1

Input:  nums = [7], target = 7
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
