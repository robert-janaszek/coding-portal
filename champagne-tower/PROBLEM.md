# Overflow Pyramid

**Difficulty:** Medium  
**Topics:** Probability  
**Target:** `O(row^2)` time, `O(row)` extra space

## Problem

Glasses form a pyramid: row `r` has `r + 1` glasses, each holding **1** unit. You pour `poured` units into the top glass `(0, 0)`. Overflow splits **evenly** to the two glasses below. Anything that runs off the bottom row is lost.

How full is glass `queryGlass` in row `queryRow` (both 0-based)? Full is `1`, empty is `0`, otherwise a fraction in `(0, 1)`.

Answers within `10^{-6}` are accepted. Do not simulate one unit at a time — `poured` can be huge.

## Examples

```
Input:  poured = 1, queryRow = 1, queryGlass = 0
Output: 0
Explanation: the single unit stays in the top glass

Input:  poured = 3, queryRow = 1, queryGlass = 0
Output: 1
Explanation: top keeps 1 and sends 1 to each glass in row 1

Input:  poured = 8, queryRow = 2, queryGlass = 1
Output: 1
```

## Constraints

- `0 <= poured <= 10^9`
- `0 <= queryGlass <= queryRow < 100`

## Files

| File | Role |
|------|------|
| `champagneTower.ts` | Stub — implement here |
| `champagneTower.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:champagne-tower
```
