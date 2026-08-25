# End Take Game

**Difficulty:** Medium
**Topics:** Arrays
**Target:** `O(n * n)` time, `O(n * n)` extra space (a rolling row is fine too)

## Problem

A line of piles `piles` sits between two players. On a turn, a player must take **the leftmost remaining pile or the rightmost remaining pile** and add that value to their score. They alternate until the line is empty.

Both play optimally (each maximizes their own score). Return the **first player's** score.

If `piles` is empty, return `0`.

## Examples

```
Input:  piles = [1, 5, 2]
Output: 3
Explanation: taking 1 leaves [5, 2]; the opponent takes 5; first gets 2. Taking 2 instead also ends at 3. Total is 8, so first cannot get the 5.

Input:  piles = [1, 5, 233, 7]
Output: 234
Explanation: the larger visible end is 7, but taking it lets the opponent take 233. Taking 1 leaves [5, 233, 7]; the opponent can only take 5 or 7, then first takes 233.

Input:  piles = [5]
Output: 5
```

## Constraints (exercise)

- `0 <= piles.length <= 500` (tests smaller)
- `0 <= piles[i] <= 1000` in tests

## Files

| File | Role |
|------|------|
| `endTakeGame.ts` | Stub — implement here |
| `endTakeGame.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:end-take-game
```
