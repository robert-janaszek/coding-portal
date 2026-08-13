# Merge Intervals

**Difficulty:** Medium
**Topics:** Arrays, Intervals
**Target:** `O(n log n)` time, `O(n)` space (or `O(1)` extra excluding output)

## Problem
Given an array of intervals where each interval is `[start, end]`, merge all overlapping intervals.

Two intervals overlap if they share at least one point. In particular, intervals that touch at the boundary (e.g. `[1,4]` and `[4,5]`) should be merged.

Return the merged intervals as an array of `[start, end]`, sorted by `start`.

## Examples

### Example 1

```
Input:  intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
```

### Example 2

```
Input:  intervals = [[1,4],[0,4]]
Output: [[0,4]]
```

### Example 3

```
Input:  intervals = [[1,4],[4,5]]
Output: [[1,5]]
```

## Constraints (exercise)
- `0 <= intervals.length <= 10_000`
- `-10_000 <= start <= end <= 10_000`

## Files

| File | Role |
|------|------|
| `mergeIntervals.ts` | Stub |
| `mergeIntervals.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:run -- merge-intervals/mergeIntervals.test.ts
```

