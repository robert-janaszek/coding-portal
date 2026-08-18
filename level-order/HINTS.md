# Hints — Level-Order Groups

Spoilers. Read only after you have tried on your own.

## Queue (BFS)

Push `root` into a queue. While the queue is not empty:

1. Let `size` be the current queue length — that is one full level.
2. Pop exactly `size` nodes, collect their values, and enqueue their children (left, then right).
3. Append that level’s values to the answer.

`size` is what keeps levels separate. Without it you get a flat walk (like `bfsLevelOrder` in Tree Iterator).

## Complexity

Each node is enqueued once → `O(n)` time. The queue holds at most one level → `O(w)` extra space.
