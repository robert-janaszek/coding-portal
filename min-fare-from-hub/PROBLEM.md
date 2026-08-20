# Min Fare From Hub

**Difficulty:** Medium  
**Topics:** Graph, Adjacency list, Weighted paths  
**Target:** `O(n^2)` or `O((n + m) log n)` time, `O(n + m)` space

## Problem

A transit network has `n` stops labeled `0` … `n - 1`. Each entry in `links` is `[u, v, fare]`: a **two-way** ride between `u` and `v` that costs `fare` (positive). There is no extra charge for transferring.

Return an array `cost` of length `n` where `cost[i]` is the **cheapest total fare** from `hub` to stop `i`. If `i` cannot be reached, set `cost[i] = -1`.

`cost[hub]` must be `0`.

A route with **more rides** can still be cheaper than a route with fewer rides, if the fares differ.

## Examples

```
Input:  n = 4, links = [[0,1,4],[0,2,1],[2,1,1],[1,3,3]], hub = 0
Output: [0, 2, 1, 5]
Explanation: 0→2 costs 1; 0→2→1 costs 2 (cheaper than the direct 4);
             0→2→1→3 costs 5.

Input:  n = 3, links = [[0,1,7]], hub = 0
Output: [0, 7, -1]

Input:  n = 1, links = [], hub = 0
Output: [0]
```

## Constraints

- `1 <= n <= 2000` (tests stay smaller)
- `0 <= links.length <= 8000`
- `0 <= u, v, hub < n`
- `u != v`; `1 <= fare <= 10^6`
- no duplicate undirected links in tests

## Files

| File | Role |
|------|------|
| `minFareFromHub.ts` | Stub — implement here |
| `minFareFromHub.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:min-fare-from-hub
```
