# Largest Rectangle in Histogram

**Difficulty:** Hard  
**Topics:** Arrays  
**Target:** `O(n)` time

## Problem

Given an array of integers `heights` representing the histogram's bar height where the width of each bar is `1`, return the area of the largest rectangle in the histogram.

## Examples

```
Input:  heights = [2,1,5,6,2,3]
Output: 10
Explanation: rectangle of height 5 covering indices [2,3] → area 10

Input:  heights = [2,4]
Output: 4
```

## Constraints

- `1 <= heights.length <= 10^5` (tests stay smaller)
- `0 <= heights[i] <= 10^4`

## Files

| File | Role |
|------|------|
| `largestRectangleArea.ts` | Stub |
| `largestRectangleArea.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:histogram
```
