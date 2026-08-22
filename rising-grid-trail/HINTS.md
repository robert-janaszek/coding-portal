# Hints — Rising Grid Trail

Spoilers. Read only after you have tried on your own.

## Idea

From a cell you may only step to a strictly larger 4-neighbour. That makes the moves a DAG, so a trail cannot cycle. Memoize the longest trail **starting at** each cell.

## Structure

Let `best(r, c)` = 1 + max `best` of neighbours with a strictly larger value, or `1` if none.

Four directions: `(r ± 1, c)` and `(r, c ± 1)`. Out of bounds is skipped.

The answer is the max of `best(r, c)` over every start cell. Empty grid → `0`.

Fill with DFS + a memo table (or a topological order of increasing values). Without memo you recompute the same tails and miss the time bound.

## Complexity

Each cell is expanded once; four edges each → `O(rows * cols)` time and extra space.
