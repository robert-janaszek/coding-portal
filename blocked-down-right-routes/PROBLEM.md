# Blocked Down-Right Routes

**Difficulty:** Medium
**Topics:** Counting
**Target:** `O(rows * cols)` time, `O(cols)` extra space (a full table is fine too)

## Problem

A grid of `rows` by `cols` cells. Each cell is `0` (open) or `1` (blocked). Start at the top-left cell. You may move only **down** or **right**, one open cell at a time. Count how many routes reach the bottom-right cell.

A route may not enter a blocked cell. If the start or the finish is blocked, there are `0` routes.

This is the same motion as `down-right-routes/`, with walls.

## Examples

```
Input:  grid = [
  [0, 0, 1],
  [0, 0, 0],
  [1, 0, 0],
]
Output: 4

Input:  grid = [
  [0, 1],
  [0, 0],
]
Output: 1
Explanation: only down then right

Input:  grid = [[1]]
Output: 0
```

## Constraints (exercise)

- `1 <= rows, cols <= 100` (tests smaller)
- `grid[r][c]` is `0` or `1`
- the answer fits in a 32-bit signed integer

## Files

| File | Role |
|------|------|
| `blockedDownRightRoutes.ts` | Stub — implement here |
| `blockedDownRightRoutes.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:blocked-down-right-routes
```
