# Shortest Path (Unweighted)

**Difficulty:** Medium  
**Topics:** Graph, Adjacency list  
**Target:** `O(n + m)` time, `O(n + m)` space

## Problem

You are given an **undirected unweighted** graph with `n` nodes labeled `0` … `n - 1` and a list of edges `edges[i] = [u, v]`.

Return an array `dist` of length `n` where `dist[i]` is the **shortest-path distance** (number of edges) from `source` to node `i`. If `i` is unreachable, set `dist[i] = -1`.

`dist[source]` must be `0`.

## Examples

```
Input:  n = 4, edges = [[0,1],[1,2],[2,3]], source = 0
Output: [0,1,2,3]

Input:  n = 3, edges = [[0,1]], source = 0
Output: [0,1,-1]

Input:  n = 1, edges = [], source = 0
Output: [0]
```

## Constraints

- `1 <= n <= 10^4` (tests stay smaller)
- `0 <= edges.length <= 2 * 10^4`
- `0 <= u, v, source < n`
- `u != v`; no duplicate undirected edges in tests

## Files

| File | Role |
|------|------|
| `shortestPath.ts` | Stub — implement here |
| `shortestPath.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:shortest-path
```
