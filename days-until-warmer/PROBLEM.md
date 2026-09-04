# Days Until Warmer

**Difficulty:** Medium  
**Topics:** Arrays  
**Target:** `O(n)` time, `O(n)` space

## Problem

You are given `temperatures[i]`, the temperature on day `i`. For each day, find how many days later a **strictly warmer** temperature first occurs. Use `0` when no later day is warmer.

## Examples

```
Input:  temperatures = [18, 21, 19, 24, 22]
Output: [1, 2, 1, 0, 0]

Input:  temperatures = [5, 6, 7]
Output: [1, 1, 0]

Input:  temperatures = [9, 4, 4]
Output: [0, 0, 0]
```

## Constraints

- `1 <= temperatures.length <= 10^5` (tests stay smaller)
- values fit in JS `number`

## Files

| File | Role |
|------|------|
| `daysUntilWarmer.ts` | Stub — implement here |
| `daysUntilWarmer.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:days-until-warmer
```
