# Hints — Knight Probability on Chessboard

Spoilers. Read only after you have tried on your own.

Each of the 8 jumps is equally likely (`1/8`). Off-board probability is lost (does not come back).

Let `dp[r][c]` = probability of being at `(r, c)` after the current number of moves.

Initialize: `1` at the start square, `0` elsewhere.

For each of `k` moves, build a new board: for every on-board square, add `dp[r][c] / 8` to each of the 8 destinations that land on the board.

Answer: sum of all cells after `k` moves.

Knight deltas: `±1, ±2` swapped, all sign combinations (8 pairs).
