# Stop-at-K Draw Game

**Difficulty:** Medium  
**Topics:** Probability  
**Target:** `O(n * maxPts)` time, `O(n)` space

## Problem

Score starts at `0`. While it is **strictly less than** `k`, add an independent uniform draw from `1 … maxPts`. Stop at the first score `>= k`.

Return the probability that the **final** score is `<= n`. Answers within `10^{-5}` are accepted.

## Examples

```
Input:  n = 8, k = 1, maxPts = 8
Output: 1
Explanation: one draw in 1..8, all of which are <= 8

Input:  n = 4, k = 1, maxPts = 8
Output: 0.5
Explanation: one draw; 4 of 8 outcomes are <= 4

Input:  n = 12, k = 8, maxPts = 4
Output: 1
Explanation: you stop between 8 and 11, all <= 12
```

## Constraints

- `0 <= k <= n <= 2000`
- `1 <= maxPts <= 2000`

## Files

| File | Role |
|------|------|
| `new21Game.ts` | Stub — implement here |
| `new21Game.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:new-21-game
```
