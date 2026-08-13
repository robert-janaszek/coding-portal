# Clone Graph

**Difficulty:** Medium  
**Topics:** Graph, Objects and pointers  
**Target:** `O(V + E)` time, `O(V)` space

## Problem

Given a reference to a node in a **connected undirected graph**, return a **deep copy** of the graph.

Each node has a unique `val` (`1` … `n`) and a list of `neighbors`. The copy must have the same connectivity, but **no node object from the original graph** may appear in the copy.

If `node` is `null`, return `null`.

## Examples

```
Input:  adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
Explanation: four nodes 1—2—3—4—1 (a square)

Input:  adjList = [[]]
Output: [[]]
Explanation: one node with no neighbors

Input:  node = null
Output: null
```

`adjList[i]` is the neighbor list of node `i + 1` (1-indexed values).

## Constraints

- `0 <= n <= 100` (`n = 0` means `node` is `null`)
- `1 <= Node.val <= n` (unique)
- the graph is connected and undirected (no duplicate edges, no self-loops in tests)

## Files

| File | Role |
|------|------|
| `cloneGraph.ts` | Stub — implement here (`GraphNode` + `cloneGraph`) |
| `cloneGraph.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:clone-graph
```
