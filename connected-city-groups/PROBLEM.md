# Connected City Groups

**Difficulty:** Medium  
**Topics:** Graph, Adjacency matrix  
**Target:** `O(n^2)` time, `O(n)` extra space

## Problem

There are `n` cities numbered `0` through `n - 1`. You get an `n × n` matrix `isConnected`.

`isConnected[i][j] === 1` means a **direct road** between city `i` and city `j`. Roads are two-way, so the matrix is always symmetric. Every city is connected to itself (`isConnected[i][i] === 1`). A `0` means no direct road between those two cities.

A **group** is a set of cities you can travel between by following roads. Two cities are in the same group even if they have no direct road — a path through other cities is enough. A city with no roads to anyone else is a group of one.

Return the number of groups.

## Examples

### Example 1

```
Input:  isConnected = [
  [1, 0, 1],
  [0, 1, 0],
  [1, 0, 1]
]
Output: 2
```

Row `i` lists the direct roads from city `i`:

- City 0 ↔ city 2
- City 1 has no road to 0 or 2

Cities `0` and `2` are one group. City `1` is a group by itself.

### Example 2

```
Input:  isConnected = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
]
Output: 3
```

No roads between distinct cities — three groups of one.

### Example 3

```
Input:  isConnected = [
  [1, 1, 0, 0],
  [1, 1, 1, 0],
  [0, 1, 1, 1],
  [0, 0, 1, 1]
]
Output: 1
```

Roads: `0 ↔ 1 ↔ 2 ↔ 3`. Every city is reachable from every other, so there is one group.

### Example 4

```
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
| `connectedCityGroups.ts` | Stub — implement here |
| `connectedCityGroups.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:connected-city-groups
```
