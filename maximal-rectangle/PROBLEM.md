# Largest All-Ones Rectangle

**Difficulty:** Hard  
**Topics:** Arrays  
**Target:** `O(rows * cols)` time

## Problem

`matrix` is a grid of `'0'` / `'1'` characters. Return the area of the biggest axis-aligned rectangle made entirely of `'1'`s.

## Examples

```
Input:  matrix = [
  ["1","1","0"],
  ["1","1","1"],
  ["0","1","1"]
]
Output: 4

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
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:maximal-rectangle
```
