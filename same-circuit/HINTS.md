# Hints — Same Circuit

Spoilers. Read only after you have tried on your own.

## Idea

Each `link` **merges** two groups of benches. Each `check` asks whether two benches are already in the **same** group, using only wires read so far.

BFS/DFS can answer one snapshot, but the snapshot changes after every `link`. Walking the map again for every `check` repeats work and misses the target.

Keep a representative (root) per group. Two benches share a circuit iff they have the same root.

## Structure

1. `parent[i] = i` at the start — `n` groups of one.
2. `find(x)`: walk `parent` until you hit a root (`parent[r] === r`). Optional: flatten the walk (path compression) so later finds are cheaper.
3. `link a b`: `find(a)` and `find(b)`; if they differ, set one root’s parent to the other (optional: hang the smaller tree under the larger).
4. `check a b`: `find(a) === find(b)`.

A `link` on benches that already share a root is a no-op.

## Complexity

With flattening, each `find` / `link` is almost `O(1)`. One pass over the log → `O(n + m)`.
