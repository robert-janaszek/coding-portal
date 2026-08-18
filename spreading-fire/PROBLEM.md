# Spreading Fire

**Difficulty:** Medium
**Topics:** Graph, Grid
**Target:** `O(m * n)` time, `O(m * n)` extra space

## Problem

You have an `m x n` grid. Each cell is one of:

- `0` — empty ground (fire cannot start here or travel across it)
- `1` — a tree
- `2` — a tree that is already on fire

Every minute, fire jumps to any tree that shares an edge (up / down / left / right) with a burning cell. Empty ground stays empty.

Return how many minutes pass until every tree is burning. If some tree can never catch fire, return `-1`.

If the grid starts with no unburned trees, the answer is `0`.

## Examples

### Example 1

```
Input:  grid = [
  [1, 1, 2],
  [1, 0, 1],
  [0, 1, 1]
]
Output: 3
```

### Example 2

```
Input:  grid = [
  [2, 1, 0],
  [0, 0, 0],
  [0, 1, 1]
]
Output: -1
```

The trees in the bottom-right are cut off by empty ground.

### Example 3

```
Input:  grid = [[0, 2], [0, 0]]
Output: 0
```

## Constraints (exercise)

- `1 <= m, n <= 200` (tests smaller)
- `grid[i][j]` is `0`, `1`, or `2`

## Files

| File | Role |
|------|------|
| `timeToBurn.ts` | Stub — implement here |
| `timeToBurn.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:spreading-fire
```
