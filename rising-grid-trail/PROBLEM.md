# Rising Grid Trail

**Difficulty:** Hard
**Topics:** Arrays, Matrix
**Target:** `O(rows * cols)` time, `O(rows * cols)` extra space

## Problem

`grid` is a matrix of integers. A trail is a walk to a 4-neighbour (up, down, left, right — no diagonals) whose values are **strictly rising** at every step.

Return the number of cells on the longest such trail. You may start anywhere. A single cell counts as length `1`. If the grid is empty, return `0`.

## Examples

```
Input:  grid = [
  [1, 2, 3],
  [6, 5, 4],
]
Output: 6
Explanation: 1 → 2 → 3 → 4 → 5 → 6

Input:  grid = [
  [10, 1],
  [9, 2],
]
Output: 4
Explanation: 1 → 2 → 9 → 10

Input:  grid = [[7]]
Output: 1
```

## Constraints (exercise)

- `0 <= rows, cols <= 200` (tests smaller)
- an empty grid (`rows = 0`) → `0`
- values are finite JS numbers (may include negatives and duplicates)

## Files

| File | Role |
|------|------|
| `risingGridTrail.ts` | Stub — implement here |
| `risingGridTrail.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:rising-grid-trail
```
