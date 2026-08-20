# Hints — Min Fare From Hub

Spoilers. Read only after you have tried on your own.

## Idea

Hop-count BFS is **wrong** here. The first time you reach a stop is not necessarily the cheapest fare.

Keep `cost[i]` as the best fare found so far (`Infinity` or a sentinel, then convert unreachable to `-1`). Repeatedly take the unprocessed stop `u` with the smallest `cost[u]`, then try each two-way link `u—v` with fare `w`:

`cost[v] = min(cost[v], cost[u] + w)`

That is Dijkstra on a non-negative undirected graph.

## Structure

1. Adjacency list of `[neighbor, fare]` pairs (both directions).
2. `cost[hub] = 0`.
3. Either:
   - scan for the unused stop with minimal `cost` (`O(n^2)`), or
   - a binary heap of `(cost, stop)` (`O((n + m) log n)`).
4. After a stop is popped as “best so far”, never try to cheapen it again (fares are positive).

## Complexity

`O(n^2)` with a dense scan, or `O((n + m) log n)` with a heap. Extra space `O(n + m)`.
