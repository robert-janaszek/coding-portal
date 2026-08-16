# Champagne Tower

**Difficulty:** Medium  
**Topics:** Probability  
**Target:** `O(row^2)` time, `O(row)` extra space

## Problem

Glasses are stacked in a pyramid: row `0` has 1 glass, row `1` has 2, …, row `r` has `r + 1` glasses. Each glass holds **1** cup.

You pour `poured` cups into the **top** glass `(0, 0)`. Any overflow splits **equally** to the two glasses below (left and right). Overflow from the bottom row is lost.

Return how full glass `queryGlass` in row `queryRow` is (both **0-indexed**). A full glass is `1`; an empty glass is `0`. Partial fill is a fraction in `(0, 1)`.

Answers within `10^{-6}` of the true value are accepted.

You cannot simulate one cup at a time — `poured` can be up to `10^9`.

## Examples

```
Input:  poured = 1, queryRow = 1, queryGlass = 1
Output: 0
Explanation: one cup fills only the top glass; row 1 stays empty

Input:  poured = 2, queryRow = 1, queryGlass = 1
Output: 0.5
Explanation: top keeps 1 and overflows 1; that 1 splits 0.5 / 0.5 to the two glasses in row 1

Input:  poured = 100000009, queryRow = 33, queryGlass = 17
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
