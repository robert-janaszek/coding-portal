# Number of Islands

**Difficulty:** Medium
**Topics:** BFS, DFS, Graph (Grid)
**Target:** `O(m*n)` time, `O(m*n)` space

## Problem
Given an `m x n` 2D grid of characters `grid`, where each character is either `'1'` (land) or `'0'` (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are surrounded by water.

## Examples

### Example 1

```
Input:  grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
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
| `numIslands.ts` | Stub |
| `numIslands.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:number-islands
```

