# Hints — Connected City Groups

Spoilers. Read only after you have tried on your own.

## Representation

`isConnected` is an **adjacency matrix**: city `j` is a neighbor of `i` iff `isConnected[i][j] === 1`. Scanning a row is `O(n)`.

## Idea

Count connected components.

1. Walk cities `0 … n-1`.
2. When you find an unvisited city, start DFS/BFS (or `union`) and mark the whole component visited.
3. Increment the answer once per such start.

Union-Find: for every `i < j` with `isConnected[i][j] === 1`, union `i` and `j`; answer = number of roots.

## Complexity

You inspect every matrix entry a constant number of times → `O(n^2)`.
