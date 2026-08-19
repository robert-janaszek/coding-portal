# Hints — Down-Right Routes

Spoilers. Read only after you have tried on your own.

## Idea

A cell is reached only from above or from the left. Let `dp[r][c]` = number of routes from the top-left to cell `(r, c)`.

## Structure

First row and first column are all `1` (only one way: always right, or always down).

```
for r from 1 to rows - 1:
  for c from 1 to cols - 1:
    dp[r][c] = dp[r - 1][c] + dp[r][c - 1]
```

Answer: `dp[rows - 1][cols - 1]`.

You only need the previous row (or a single rolling row) → `O(cols)` extra space.

Closed form `C(rows + cols - 2, rows - 1)` also works if you multiply carefully so intermediates stay in range.

## Complexity

`rows * cols` cells, constant work each: `O(rows * cols)` time.
