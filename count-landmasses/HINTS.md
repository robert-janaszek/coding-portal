# Hints — Count Landmasses

Spoilers. Read only after you have tried on your own.

## Idea

Each island is a connected component of cells with value `'1'`.

## Approach (DFS/BFS)

1. Iterate over all cells.
2. When you find an unvisited land cell (`'1'`), increment the answer.
3. Explore its whole component using DFS (recursion) or BFS (queue).
4. Mark cells as visited (either with a `Set` or by mutating the grid, e.g. turning `'1'` into `'0'`).

## Complexity

Every cell is visited at most once → `O(m*n)` time.

