# Hints — Shortest Path (Unweighted)

Spoilers. Read only after you have tried on your own.

On an unweighted graph, **BFS from `source`** yields shortest distances.

1. Build an adjacency list from `edges` (add both directions).
2. `dist[i] = -1` for all `i`, then `dist[source] = 0`.
3. Queue starting at `source`.
4. For each popped node `u`, for each neighbor `v` with `dist[v] === -1`: set `dist[v] = dist[u] + 1` and enqueue `v`.

First time you reach a node is via a shortest path (BFS layers).
