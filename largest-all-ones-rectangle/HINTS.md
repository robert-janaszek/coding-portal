# Hints — Largest All-Ones Rectangle

Spoilers. Read only after you have tried on your own.

Treat each row as the **base** of a histogram:

- Maintain `heights[c]` = consecutive `'1'`s ending at the current row in column `c`.
- When `matrix[r][c] === '0'`, reset `heights[c] = 0`; otherwise increment.

For every row, after updating `heights`, compute the largest rectangle in that histogram (same problem as `histogram-max-rectangle/`). Take the max over all rows.

If you already solved the histogram with a monotonic stack in `O(cols)`, the full matrix is `O(rows * cols)`.
