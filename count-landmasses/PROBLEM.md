# Count Landmasses

**Difficulty:** Medium
**Topics:** Graph, Grid
**Target:** `O(m*n)` time, `O(m*n)` space

## Problem

You get an `m x n` map: `'1'` is land, `'0'` is water. Count how many landmasses there are.

A landmass is a group of land cells linked along edges (up / down / left / right — not diagonals). The map is surrounded by water.

## Examples

### Example 1

```
Input:  grid = [
  ["1","0","1","0"],
  ["1","0","1","1"],
  ["0","0","0","1"]
]
Output: 2
```

### Example 2

```
Input:  grid = [["1"]]
Output: 1
```

### Example 3

```
Input:  grid = [["0","0"]]
Output: 0
```

## Constraints (exercise)
- `0 <= m <= 300`
- `0 <= n <= 300`
- `grid[i][j]` is `'0'` or `'1'`

## Files

| File | Role |
|------|------|
| `countLandmasses.ts` | Stub |
| `countLandmasses.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:count-landmasses
```

