# Hints — Blocked Down-Right Routes

Spoilers. Read only after you have tried on your own.

## Idea

Same as `down-right-routes/`: a cell is reached only from above or from the left. A blocked cell contributes `0` routes, and that `0` propagates.

## Structure

Let `dp[r][c]` = number of routes from the top-left to `(r, c)`.

- if `grid[r][c] === 1`: `dp[r][c] = 0`
- `dp[0][0] = 1` when the start is open, else `0`
- first row: only from the left, until the first wall (then the rest stay `0`)
- first column: only from above, until the first wall
- otherwise: `dp[r][c] = dp[r - 1][c] + dp[r][c - 1]` when the cell is open

Answer: `dp[rows - 1][cols - 1]`.

A rolling row is enough for `O(cols)` extra space.

## Complexity

`O(rows * cols)` time.
