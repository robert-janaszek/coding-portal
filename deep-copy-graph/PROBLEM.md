# Deep Copy a Graph

**Difficulty:** Medium  
**Topics:** Graph, Objects and pointers  
**Target:** `O(V + E)` time, `O(V)` space

## Problem

Given one node of a **connected** graph, return a **deep copy**.

Each node has a unique `val` (`1` … `n`) and a `neighbors` list. The copy must match the connectivity, and **must not reuse** any original node object.

Edges may be one-way (a chain) or two-way (an undirected cycle through pointers). `null` copies to `null`.

## Examples

```
Input:  1 -> 2
Output: a new node 1 whose only neighbor is a new node 2 (2 has no neighbors)

Input:  1 -> 2 -> 3
Output: a new chain with the same vals and one-way edges

Input:  adjList = [[2, 3], [1], [1]]
Output: node 1 linked both ways to 2 and to 3; 2 and 3 are not linked to each other

Input:  adjList = [[]]
Output: [[]]
Explanation: one node, no neighbors

Input:  node = null
Output: null
```

`adjList[i]` lists neighbors of node `i + 1` (values are 1-based).

## Constraints

- `0 <= n <= 100` (`n = 0` means `node` is `null`)
- `1 <= Node.val <= n` (unique)
- the graph is connected (no duplicate edges, no self-loops in tests)

## Files

| File | Role |
|------|------|
| `deepCopyGraph.ts` | Stub — implement here (`GraphNode` + `deepCopyGraph`) |
| `deepCopyGraph.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:deep-copy-graph
```
