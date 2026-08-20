# Single Trail Map

**Difficulty:** Medium  
**Topics:** Graph, Adjacency list  
**Target:** `O(n + m)` time, `O(n + m)` space

## Problem

A park has `n` junctions labeled `0` … `n - 1` and a list of **two-way** trails `trails[i] = [u, v]`.

The map is acceptable only if both of these hold:

1. You can walk from **any** junction to **any** other by following trails.
2. Between any pair of junctions there is **exactly one** walk that does not repeat a junction (no second way around, no leftover loop).

Return `true` if the map is acceptable, otherwise `false`.

A single junction and no trails is acceptable. Tests have no trail from a junction to itself and no duplicate trail pairs.

## Examples

```
Input:  n = 5, trails = [[0,1],[0,2],[0,3],[1,4]]
Output: true

Input:  n = 5, trails = [[0,1],[1,2],[2,3],[1,3],[1,4]]
Output: false
Explanation: junctions 1-2-3 form a loop, so there is more than one walk between 1 and 3.

Input:  n = 1, trails = []
Output: true
```

## Constraints

- `1 <= n <= 10^4` (tests stay smaller)
- `0 <= trails.length <= 2 * 10^4`
- `0 <= u, v < n`
- `u != v`; no duplicate undirected trails in tests

## Files

| File | Role |
|------|------|
| `singleTrailMap.ts` | Stub — implement here |
| `singleTrailMap.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:single-trail-map
```
