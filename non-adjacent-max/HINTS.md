# Hints — Non-Adjacent Max

Spoilers. Read only after you have tried on your own.

## Idea

At each index you either skip it or take it. Taking it forbids the previous index.

Let `best[i]` = maximum sum using only `nums[0 .. i]`.

## Structure

- `best[-1]` (empty prefix) = `0`
- `best[0]` = `nums[0]`
- for `i >= 1`: `best[i] = max(best[i - 1], (best[i - 2] if i >= 2 else 0) + nums[i])`

You only need the last two `best` values → `O(1)` extra space.

## Complexity

One pass over `n` cells: `O(n)` time, `O(1)` extra space.
