# Connected City Groups

**Difficulty:** Medium  
**Topics:** Graph, Adjacency matrix  
**Target:** `O(n^2)` time, `O(n)` extra space

## Problem

`n` cities, labels `0 … n - 1`. `isConnected` is an `n × n` symmetric 0/1 matrix: `1` means a direct road. The diagonal is all `1`.

A group is a connected component (you can travel between any two cities in it, possibly via others). Count the groups.

## Examples

```
Input:  isConnected = [[1,0,1],[0,1,0],[1,0,1]]
Output: 2
Explanation: cities 0—2; city 1 alone

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
