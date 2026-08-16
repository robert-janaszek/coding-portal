# Hints — Subsets

Spoilers. Read only after you have tried on your own.

## Idea

Same `push` / recurse / `pop` as combinations. Difference: save a copy of `path` at **every** node, not only when the length hits `k`. The empty path is a valid subset.

## Structure

Two equivalent shapes:

1. Loop `for (let i = start; i < nums.length; i++)`, take `nums[i]`, recurse with `start = i + 1`. Save `path` before the loop (or at the top of `dfs`).
2. At index `i`: either skip `nums[i]` (`dfs(i + 1)`), or take it (`path.push`, `dfs(i + 1)`, `path.pop`). Save when `i === nums.length`.

## Complexity

There are `2^n` subsets. Copying a subset of length up to `n` makes the time `O(n * 2^n)`. Extra space is the recursion depth / `path`: `O(n)`.
