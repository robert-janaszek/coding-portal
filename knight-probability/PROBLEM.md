# Knight Probability on Chessboard

**Difficulty:** Medium  
**Topics:** Probability  
**Target:** `O(k * n^2)` time, `O(n^2)` space

## Problem

On an `n × n` chessboard, a knight starts at `(row, column)`. Each move it chooses one of the **8** knight jumps **uniformly at random**. If a jump would leave the board, the knight is gone and stays gone.

Return the probability that the knight is still on the board after exactly `k` moves.

Answers within `10^{-6}` of the true value are accepted.

## Examples

```
Input:  n = 3, k = 2, row = 0, column = 0
Output: 0.0625
Explanation: from (0,0) two of eight first moves stay on the board;
from each of those, only 2/8 second moves stay → (2/8) * (2/8) = 0.0625

Input:  n = 1, k = 0, row = 0, column = 0
Output: 1

Input:  n = 1, k = 1, row = 0, column = 0
Output: 0
```

## Constraints

- `1 <= n <= 25`
- `0 <= k <= 100`
- `0 <= row, column < n`

## Files

| File | Role |
|------|------|
| `knightProbability.ts` | Stub — implement here |
| `knightProbability.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:knight-probability
```
