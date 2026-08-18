# Histogram Max Rectangle

**Difficulty:** Hard  
**Topics:** Arrays  
**Target:** `O(n)` time

## Problem

`heights[i]` is the height of bar `i`; every bar has width `1`. Find the largest axis-aligned rectangle that fits inside the histogram (the rectangle’s top may span several consecutive bars, limited by the shortest of them).

## Examples

```
Input:  heights = [2, 4, 2]
Output: 6
Explanation: height 2 across all three bars

Input:  heights = [3, 1]
Output: 3
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
