# Hints — Single Trail Map

Spoilers. Read only after you have tried on your own.

## Idea

The two conditions together mean the undirected graph is a **tree**: connected and acyclic.

Equivalent checks (pick one):

- connected and `trails.length === n - 1`
- connected and a DFS/BFS never sees an already-visited neighbor other than its parent
- Union-Find: every trail joins two different components, and you end with one component

`trails.length === n - 1` alone is **not** enough: a triangle plus an isolated junction also has `n - 1` trails.

## Structure

1. If `trails.length !== n - 1`, return `false` (optional fast reject).
2. Build an adjacency list (both directions).
3. Walk from junction `0` (DFS or BFS), tracking the parent so you do not count the trail you just came along as a cycle.
4. If you hit a visited non-parent, there is a loop → `false`.
5. If some junction was never visited, the map is disconnected → `false`.

## Complexity

One walk over junctions and trails → `O(n + m)`.
