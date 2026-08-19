# Hints — Palindrome Keep

Spoilers. Read only after you have tried on your own.

## Idea

A palindrome is decided by its two ends. For the slice `s[i..j]`, look at `s[i]` and `s[j]`.

## Structure

Let `dp[i][j]` be the answer for the substring `s[i..j]` (inclusive).

- `dp[i][i] = 1`
- if `s[i] === s[j]`: keep both ends → `dp[i + 1][j - 1] + 2`
- else: drop one end → `max(dp[i + 1][j], dp[i][j - 1])`

Fill by growing length (or `i` descending, `j` ascending) so the inner slice is already known. Adjacent equal letters are `2`.

Same numbers as the longest common subsequence of `s` and its reverse.

## Complexity

One value per pair of indices: `O(n * n)` time and extra space. Only a rolling band of lengths is needed if you want less space.
