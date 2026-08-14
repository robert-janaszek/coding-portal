# Hints — Tree Iterator (DFS & BFS)

Spoilers. Read only after you have tried on your own.

## Idea

A **generator** (`function*` + `yield`) pauses and resumes. A **manual iterator** stores the same pending work in a stack or queue and pops one node per `next()`.

DFS pending work = **stack**. BFS pending work = **queue**.

## Generators (`yield`)

Recursive DFS is natural:

- if `node` is null, return
- `yield node.val`
- `yield*` the left subtree, then `yield*` the right subtree

BFS: put `root` in a queue; while the queue is not empty, dequeue, `yield` the value, enqueue left then right (if present).

## Manual `next()`

The object you return only needs a `next()` method.

- **DFS:** stack of nodes. On `next()`, pop; if the node has children, **push right then left** (so left comes off first). Return `{ value: node.val, done: false }`. Empty stack → `{ done: true }`.
- **BFS:** same, but a queue: dequeue, enqueue left then right.

Initialize the stack/queue with `root` when it is non-null. After the walk is finished, further `next()` calls must keep returning `{ done: true }`.

## Complexity

Each node is pushed and popped once → `O(n)` time for a full walk. Extra memory is the stack height (`O(h)`) or the queue width (`O(w)`), not a copy of every value.
