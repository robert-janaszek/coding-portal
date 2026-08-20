# Hints — Walk Between Stops

Spoilers. Read only after you have tried on your own.

## Idea

Same unweighted BFS as hop-count distance, plus a **parent** of each stop.

Do not store a growing copy of the walk on the queue. That shares or copies arrays and blows up memory.

## Structure

1. Adjacency list (both directions).
2. `parent[i] = -1`, then BFS from `start`. When you first reach `v` from `u`, set `parent[v] = u` and enqueue `v`.
3. Stop early once `finish` is reached (optional).
4. If `finish` was never reached, return `[]`.
5. Reconstruct: from `finish`, follow `parent` back to `start`, push into a list, then reverse.

`parent[start]` stays `-1`. First visit is a shortest walk, so you never update `parent[v]` later.

## Complexity

One BFS plus a walk of length at most `n` → `O(n + m)` time and space.
