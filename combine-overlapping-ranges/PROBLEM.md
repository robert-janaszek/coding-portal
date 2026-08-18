# Combine Overlapping Ranges

**Difficulty:** Medium
**Topics:** Arrays, Intervals
**Target:** `O(n log n)` time, `O(n)` space (or `O(1)` extra excluding output)

## Problem

Each range is a closed pair `[start, end]`. Fuse every pair that overlaps or merely **touches** at an endpoint (`[2, 5]` and `[5, 8]` become `[2, 8]`).

Return the fused ranges, sorted by `start`.

## Examples

### Example 1

```
Input:  intervals = [[2, 5], [1, 3], [9, 12], [8, 10]]
Output: [[1, 5], [8, 12]]
```

### Example 2

```
Input:  intervals = [[4, 7], [0, 4]]
Output: [[0, 7]]
```

### Example 3

```
Input:  intervals = [[3, 6], [6, 9]]
Output: [[3, 9]]
```

## Constraints (exercise)
- `0 <= intervals.length <= 10_000`
- `-10_000 <= start <= end <= 10_000`

## Files

| File | Role |
|------|------|
| `combineOverlappingRanges.ts` | Stub |
| `combineOverlappingRanges.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:combine-overlapping-ranges
```

