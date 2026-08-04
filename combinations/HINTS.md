# Hints — Combinations (n choose k)

Spoilers. Read only after you have tried on your own.

## Backtracking structure

1. Build the current combination in `path`.
2. Choose the next number from a range `start...n`.
3. When `path.length === k`, save a copy to the answer.
4. Recurse with `start = chosen + 1` so combinations don’t repeat.

## Pruning (optional but helpful)

If there aren’t enough remaining numbers to reach length `k`, stop early.

