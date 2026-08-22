# Hints — Rising Subsequence Length

Spoilers. Read only after you have tried on your own.

## Idea

For each ending index, remember the longest rising subsequence that **ends there**. The global answer is the max of those.

This is not a contiguous stretch (`heaviest-stretch/` is) and not a subsequence of two strings (`common-subsequence/`).

## Structure

Let `dp[i]` = longest rising subsequence ending at `i` (must include `nums[i]`).

- `dp[i] = 1` (the element alone)
- for each `j < i` with `nums[j] < nums[i]`: `dp[i] = max(dp[i], dp[j] + 1)`

Answer: `max(dp)`, or `0` when `nums` is empty.

There is an `O(n log n)` tails / patience array; it is not required here.

## Complexity

Two nested index loops: `O(n * n)` time, `O(n)` extra space.
