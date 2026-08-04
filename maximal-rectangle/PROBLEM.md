# Maximal Rectangle

**Difficulty:** Hard  
**Topics:** Arrays, Dynamic programming, Monotonic stack  
**Target:** `O(rows * cols)` time

## Problem

Given a `rows x cols` binary matrix filled with `'0'` and `'1'`, find the largest rectangle containing only `'1'`s and return its area.

## Examples

```
Input:  matrix = [
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]
Output: 6
Explanation: the rectangle of ones covering the bottom-right 2×3 block (also other rectangles of area 6 exist)

Input:  matrix = [["0"]]
Output: 0

Input:  matrix = [["1"]]
Output: 1
```

## Constraints

- `rows == matrix.length`
- `cols == matrix[i].length`
- `1 <= rows, cols <= 200` (tests stay smaller)
- `matrix[i][j]` is `'0'` or `'1'`

## Files

| File | Role |
|------|------|
| `maximalRectangle.ts` | Stub — implement here |
| `maximalRectangle.test.ts` | Tests |
| `solution.ts` | Reference solution (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:maximal-rectangle
```
