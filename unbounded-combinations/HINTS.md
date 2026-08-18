# Hints — Unbounded Combinations

Spoilers. Read only after you have tried on your own.

## Idea

DFS with a running remainder. Same `push` / recurse / `pop` as combinations. Save `path` when the remainder hits `0`. Give up a branch when the remainder goes negative.

## Structure

Loop `for (let i = start; i < candidates.length; i++)`:

- take `candidates[i]`
- recurse with remainder `remain - candidates[i]`
- to **reuse** this number, pass the same `i` as `start` (not `i + 1`)
- `i + 1` would be “use each candidate at most once”

Starting the loop at `start` (and never looking left) keeps each multiset in non-decreasing order, so `[2,2,3]` appears once, not as `[3,2,2]` as well.

## Complexity

Depth is at most `target / min(candidates)`. Branching is up to `n`. Extra space is the current path: `O(target / min(candidates))`.
