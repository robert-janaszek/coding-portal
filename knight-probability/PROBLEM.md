# Knight Survival Probability

**Difficulty:** Medium  
**Topics:** Probability  
**Target:** `O(k * n^2)` time, `O(n^2)` space

## Problem

An `n × n` board, a knight starts at `(row, column)`. Each turn it picks one of the **8** knight jumps uniformly. A jump that leaves the board removes the knight for good.

Probability that it is still on the board after exactly `k` jumps. Answers within `10^{-6}` are accepted.

## Examples

```
Input:  n = 3, k = 1, row = 0, column = 0
Output: 0.25
Explanation: from a corner, 2 of 8 jumps stay on a 3×3 board

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
