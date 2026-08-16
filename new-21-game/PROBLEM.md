# New 21 Game

**Difficulty:** Medium  
**Topics:** Probability  
**Target:** `O(n * maxPts)` time, `O(n)` space

## Problem

Alice starts with **0** points. While her score is **strictly less than** `k`, she draws an integer uniformly from `1 … maxPts` and adds it to her score. Draws are independent.

She **stops** as soon as the score is `>= k`.

Return the probability that her **final** score is `<= n`.

Answers within `10^{-5}` of the true value are accepted.

## Examples

```
Input:  n = 10, k = 1, maxPts = 10
Output: 1
Explanation: she draws once (already k = 1) and the result is at most 10

Input:  n = 6, k = 1, maxPts = 10
Output: 0.6
Explanation: one draw in 1..10; 6 of 10 outcomes are <= 6

Input:  n = 21, k = 17, maxPts = 10
Output: 0.73278
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
