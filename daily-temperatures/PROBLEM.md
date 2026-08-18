# Days Until Warmer

**Difficulty:** Medium  
**Topics:** Arrays  
**Target:** `O(n)` time, `O(n)` space

## Problem

`temperatures[i]` is the high on day `i`. For each day, how many days later does a **strictly higher** high first appear? Put `0` if it never does.

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

- `1 <= temps.length <= 10^5` (tests stay smaller)
- values fit in JS `number`

## Files

| File | Role |
|------|------|
| `dailyTemperatures.ts` | Stub — implement here |
| `dailyTemperatures.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:daily-temperatures
```
