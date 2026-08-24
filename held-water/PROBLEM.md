# Held Water

**Difficulty:** Hard
**Topics:** Arrays
**Target:** `O(n)` time, `O(1)` extra space

## Problem

You have a row of bars, width `1` each. `heights[i]` is how tall bar `i` is.

Rain falls from above. Water sits in the dips: at index `i` it can rise only as high as the **shorter** of the tallest bar strictly to the left and the tallest bar strictly to the right. Height already occupied by the bar itself does not count.

Return how many units of water the whole row holds. Bars on the ends never hold water — there is no wall on one side.

## Examples

### Example 1

```
Input:  heights = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
Output: 6
Explanation: water at the dips: 1 + 1 + 2 + 1 + 1
```

### Example 2

```
Input:  heights = [4, 2, 0, 3, 2, 5]
Output: 9
Explanation: 2 + 4 + 1 + 2 between the outer walls
```

### Example 3

```
Input:  heights = [1, 2, 3]
Output: 0
Explanation: strictly ascending — no dip
```

### Example 4

```
Input:  heights = [5]
Output: 0
```

## Constraints (exercise)

- `1 <= heights.length <= 10^5` (tests stay smaller)
- `0 <= heights[i] <= 10^4`

## Files

| File | Role |
|------|------|
| `heldWater.ts` | Stub — implement here |
| `heldWater.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:held-water
```
