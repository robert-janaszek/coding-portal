# Hints — Heaviest Stretch

Spoilers. Read only after you have tried on your own.

## Idea

A cubic scan of every pair of endpoints is too slow. Track one extra number: the best stretch that **ends at the current index**.

Let `ending[i]` = heaviest stretch that is required to finish at `i`.

At `i` you either start fresh on `nums[i]`, or grow the stretch that already ended at `i - 1`.

## Structure

- `ending[0] = nums[0]`
- for `i >= 1`: `ending[i] = max(nums[i], ending[i - 1] + nums[i])`
- answer = max of all `ending[i]` (or `0` if the line is empty)

You only need the previous `ending` value and a running max → `O(1)` extra space.

If `ending[i - 1]` is negative, growing it can never beat starting over at `i`. That is why a deep dip can split the line into two stretches.

## Complexity

One pass over `n` cells: `O(n)` time, `O(1)` extra space.
