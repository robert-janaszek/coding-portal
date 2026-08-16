# Hints — Generate Parentheses

Spoilers. Read only after you have tried on your own.

## Idea

Build a string of length `2n` by appending `'('` or `')'`. Count how many of each you have used so far. Only take a step that can still lead to a valid string.

## Structure

Keep `open` and `close` (how many of each are already in `path`).

- You may append `'('` while `open < n`.
- You may append `')'` while `close < open`.
- When `path.length === 2n`, save a copy.

Undo is `path.pop()` if you store characters in an array (cheaper than concatenating strings at every step).

## Complexity

The number of well-formed strings is the Catalan number `C_n = (1/(n+1)) * C(2n, n)`, which is `Θ(4^n / n^{3/2})`. Extra space for the current path is `O(n)`.
