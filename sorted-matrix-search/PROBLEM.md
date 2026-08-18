# Sorted Row-Column Matrix Search

**Difficulty:** Medium
**Topics:** Arrays, Matrix, Search
**Target:** `O(m + n)` time, `O(1)` extra space

## Problem

Given an `m x n` grid of integers `matrix` and an integer `target`, return `true` if `target` appears in the grid, otherwise `false`.

Each row is sorted left to right. Each column is sorted top to bottom.

The grid is **not** one long sorted sequence: the first entry of row `i + 1` may be smaller than the last entry of row `i`. Do not flatten the grid and run a single binary search.

## Examples

### Example 1

```
Input:  matrix = [
  [1,  6, 10, 14],
  [2,  7, 11, 16],
  [4,  9, 12, 18],
  [8, 13, 17, 20]
], target = 9
Output: true
```

### Example 2

```
Input:  same matrix, target = 15
Output: false
```

## Constraints (exercise)

- `0 <= m, n <= 200` (empty grid → `false`; tests smaller)
- `-10^4 <= matrix[i][j], target <= 10^4`
- each row is non-decreasing left to right
- each column is non-decreasing top to bottom

## Files

| File | Role |
|------|------|
| `sortedMatrixSearch.ts` | Stub — implement here |
| `sortedMatrixSearch.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:sorted-matrix-search
```
