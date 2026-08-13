# Number of Provinces

**Difficulty:** Medium  
**Topics:** Graph, Adjacency matrix  
**Target:** `O(n^2)` time, `O(n)` extra space

## Problem

There are `n` cities, labeled `0` … `n - 1`. The graph is given as an **adjacency matrix** `isConnected` of size `n × n`:

- `isConnected[i][j] === 1` means cities `i` and `j` are directly connected
- `isConnected[i][j] === 0` means they are not
- the matrix is symmetric; `isConnected[i][i] === 1`

A **province** is a connected component: a group of cities such that you can travel between any two (directly or through other cities in the group).

Return the number of provinces.

## Examples

```
Input:  isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2
Explanation: cities 0—1 are one province; city 2 is another

Input:  isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3

Input:  isConnected = [[1]]
Output: 1
```

## Constraints

- `1 <= n <= 200`
- `isConnected[i][j]` is `0` or `1`
- `isConnected[i][i] === 1`
- `isConnected[i][j] === isConnected[j][i]`

## Files

| File | Role |
|------|------|
| `findProvinces.ts` | Stub — implement here |
| `findProvinces.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:number-provinces
```
