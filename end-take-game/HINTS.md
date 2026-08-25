# Hints — End Take Game

Spoilers. Read only after you have tried on your own.

## Idea

The remaining piles are always a contiguous slice. Taking an end shrinks that slice by one. The current player wants the best score on `piles[i..j]`; the opponent then does the same on what is left.

Greedy (always the larger visible end) fails: the other end can unlock a much larger pile on the next turn.

## Structure

Let `dp[i][j]` be the score the player about to move can get from `piles[i..j]`.

- `dp[i][i] = piles[i]`
- After taking `piles[i]`, the opponent gets `dp[i + 1][j]` from the rest, so you get `sum(i..j) - dp[i + 1][j]`
- After taking `piles[j]`, you get `sum(i..j) - dp[i][j - 1]`

So `dp[i][j] = sum(i..j) - min(dp[i + 1][j], dp[i][j - 1])`.

Fill by growing length (or `i` descending, `j` ascending from `i + 1`) so the shorter slices are already known. Empty input → `0`. Answer: `dp[0][n - 1]`.

## Complexity

One value per pair of indices: `O(n * n)` time and extra space. Prefix sums make each `sum(i..j)` O(1). A rolling band of lengths is enough if you want less space.
