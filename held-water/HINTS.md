# Hints — Held Water

Spoilers. Read only after you have tried on your own.

## Idea

At index `i`, water can rise only as high as the shorter of:

- the tallest bar strictly to the left
- the tallest bar strictly to the right

Units at `i`: `max(0, min(leftMax, rightMax) - heights[i])`. Sum over `i`. Ends hold nothing — one side has no wall.

## Prefix and suffix maxima

Two extra arrays (or one pass each way):

- `leftMax[i]` = max of `heights[0 .. i - 1]`
- `rightMax[i]` = max of `heights[i + 1 .. n - 1]`

Then one more pass to sum. `O(n)` time, `O(n)` extra space.

## Two pointers

The limiting wall is the side whose running max is smaller. Keep `lo` / `hi` at the ends and running `leftMax` / `rightMax`:

- if `leftMax <= rightMax`, water at `lo` is decided by `leftMax`; step `lo` right
- else water at `hi` is decided by `rightMax`; step `hi` left

Each index is visited once.

## Complexity

Two-pointer scan → `O(n)` time, `O(1)` extra space.
