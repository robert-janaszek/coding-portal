# Traveling Salesman

**Difficulty:** Hard  
**Topics:** NP-complete, Graph  
**Target:** `O(n^2 * 2^n)` time, `O(n * 2^n)` space

## Problem

There are `n` cities (`0` … `n - 1`). `dist` is an `n × n` matrix: `dist[i][j]` is the cost of traveling from `i` to `j` (`dist[i][i] === 0`).

Return the **minimum cost** of a tour that visits **every city exactly once** and returns to city `0`. (You may start the written tour at `0` without loss of generality.)

This is the **traveling salesman problem** (NP-complete). Tests keep `n` small.

## Examples

```
Input:  dist = [[0,10,15,20],[10,0,35,25],[15,35,0,30],[20,25,30,0]]
Output: 80
Explanation: 0 → 1 → 3 → 2 → 0  costs 10 + 25 + 30 + 15 = 80

Input:  dist = [[0,1,5],[1,0,3],[5,3,0]]
Output: 9
Explanation: 0 → 1 → 2 → 0  costs 1 + 3 + 5 = 9

Input:  dist = [[0]]
Output: 0
```

## Constraints

- `1 <= n <= 12` (tests typically `n <= 8`)
- `dist.length === n`, `dist[i].length === n`
- `0 <= dist[i][j] <= 10^6`
- `dist[i][i] === 0`

## Files

| File | Role |
|------|------|
| `travelingSalesman.ts` | Stub — implement here |
| `travelingSalesman.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:traveling-salesman
```
