# Opposite Ends

**Difficulty:** Medium  
**Topics:** Graph, Adjacency list  
**Target:** `O(n + m)` time, `O(n + m)` space

## Problem

A panel has `n` terminals labeled `0` … `n - 1`. Each cable `[u, v]` joins two distinct terminals. You may assign every terminal one of **two polarities**.

A layout is valid when **every cable** has opposite polarities on its two ends. Isolated terminals (no cables) may take either polarity.

Return `true` if some assignment works, `false` if no assignment can satisfy every cable.

The cables are two-way. Tests have no self-cables and no duplicate pairs.

## Examples

```
Input:  n = 4, cables = [[0,1],[1,2],[2,3]]
Output: true
Explanation: polarities can alternate along the chain.

Input:  n = 3, cables = [[0,1],[1,2],[0,2]]
Output: false
Explanation: the three cables form a triangle; two ends of some cable would share a polarity.

Input:  n = 1, cables = []
Output: true
```

## Constraints

- `1 <= n <= 10^4` (tests stay smaller)
- `0 <= cables.length <= 2 * 10^4`
- `0 <= u, v < n`
- `u != v`; no duplicate undirected cables in tests

## Files

| File | Role |
|------|------|
| `oppositeEnds.ts` | Stub — implement here |
| `oppositeEnds.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:opposite-ends
```
