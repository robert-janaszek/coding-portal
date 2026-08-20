# Walk Between Stops

**Difficulty:** Medium  
**Topics:** Graph, Adjacency list  
**Target:** `O(n + m)` time, `O(n + m)` space

## Problem

A park has `n` stops labeled `0` … `n - 1` and two-way trails `trails[i] = [u, v]`. Trails have no length other than “one hop”.

Return **one shortest walk** from `start` to `finish`: a list of stop ids that begins at `start`, ends at `finish`, and uses as few trails as possible. Consecutive ids in the list must be joined by a trail.

If `start === finish`, return `[start]`. If `finish` cannot be reached, return `[]`.

When several walks have the same hop count, any one of them is accepted.

## Examples

```
Input:  n = 4, trails = [[0,1],[1,2],[2,3]], start = 0, finish = 3
Output: [0, 1, 2, 3]

Input:  n = 4, trails = [[0,1],[1,2],[2,3],[0,3]], start = 0, finish = 3
Output: [0, 3]
Explanation: [0, 1, 2, 3] is a walk, but it uses three hops; [0, 3] uses one.

Input:  n = 3, trails = [[0,1]], start = 0, finish = 2
Output: []

Input:  n = 1, trails = [], start = 0, finish = 0
Output: [0]
```

## Constraints

- `1 <= n <= 10^4` (tests stay smaller)
- `0 <= trails.length <= 2 * 10^4`
- `0 <= u, v, start, finish < n`
- `u != v`; no duplicate undirected trails in tests

## Files

| File | Role |
|------|------|
| `walkBetweenStops.ts` | Stub — implement here |
| `walkBetweenStops.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:walk-between-stops
```
