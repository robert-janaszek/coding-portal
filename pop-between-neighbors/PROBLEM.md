# Pop Between Neighbors

**Difficulty:** Hard
**Topics:** Arrays
**Target:** `O(n * n * n)` time, `O(n * n)` extra space

## Problem

You have a line of non-negative integers `nums`. Remove every value, one at a time.

When you remove `nums[i]`, add **left × nums[i] × right** to the score, where `left` and `right` are the nearest values still present on each side. A missing side counts as `1`.

The order of removals changes the neighbors, so it changes the total. Return the **maximum** score over all orders. An empty line scores `0`.

## Examples

```
Input:  nums = [2, 4, 6]
Output: 66
Explanation: remove 4 first (2×4×6 = 48), then 2 (1×2×6 = 12), then 6 (1×6×1 = 6)

Input:  nums = [4]
Output: 4
Explanation: only 1×4×1

Input:  nums = [1, 2]
Output: 4
Explanation: remove 1 first (1×1×2 = 2), then 2 (1×2×1 = 2)
```

## Constraints (exercise)

- `0 <= nums.length <= 50` (tests smaller)
- `0 <= nums[i] <= 100` in tests

## Files

| File | Role |
|------|------|
| `popBetweenNeighbors.ts` | Stub — implement here |
| `popBetweenNeighbors.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:pop-between-neighbors
```
