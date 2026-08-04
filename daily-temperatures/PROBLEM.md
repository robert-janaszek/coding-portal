# Daily Temperatures

**Difficulty:** Medium  
**Topics:** Arrays, Monotonic stack  
**Target:** `O(n)` time, `O(n)` space

## Problem

Given an array of integers `temperatures` representing the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i`-th day to get a warmer temperature.

If there is no future day for which this is possible, put `0` instead.

## Examples

```
Input:  temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]

Input:  temperatures = [30,40,50,60]
Output: [1,1,1,0]

Input:  temperatures = [30,60,90]
Output: [1,1,0]
```

## Constraints

- `1 <= temperatures.length <= 10^5` (tests stay smaller)
- `30 <= temperatures[i] <= 100`

## Files

| File | Role |
|------|------|
| `dailyTemperatures.ts` | Stub — implement here |
| `dailyTemperatures.test.ts` | Tests |
| `solution.ts` | Reference solution (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:daily-temperatures
```
