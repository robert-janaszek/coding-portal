# Hints — Sorted Row-Column Matrix Search

Spoilers. Read only after you have tried on your own.

## Why not one binary search?

Rows and columns are sorted, but the matrix as a whole is not. `matrix[i][n-1]` may be larger than `matrix[i+1][0]`. Flattening to a 1D binary search is the *other* 2D-matrix problem.

Binary search on every row is `O(m log n)` — correct, but slower than the target.

## Staircase from a corner

Start at the **top-right** corner `(0, n - 1)` (bottom-left works the same way). From that cell, one direction is smaller, the other is larger:

- if `matrix[r][c] === target` → found
- if `matrix[r][c] > target` → everything below in this column is even larger, so move **left** (`c--`)
- if `matrix[r][c] < target` → everything left in this row is even smaller, so move **down** (`r++`)

Stop when you walk off the matrix.

## Complexity

Each step drops a row or a column → at most `m + n` steps → `O(m + n)` time, `O(1)` extra space.
