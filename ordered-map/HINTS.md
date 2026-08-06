# Hints — Ordered Map

Spoilers. Read only after you have tried on your own.

## Idea

You need a dictionary that is also ordered by key. A hash map gives `O(1)` exact lookup but not ordered neighbors. A **balanced binary search tree** (red-black or AVL) keeps keys sorted and supports insert / delete / search in `O(log n)`.

Store `(key, value)` in each node. Ordering is by `key` only.

## Structure

Standard BST search for `get` / `has` / `set` (overwrite value on equal key).

**floorKey(k):** walk from the root; whenever you go left past a node with `node.key ≤ k`, remember that node as a candidate; when you go right, update the candidate. End with the best candidate (or `null`).

**ceilingKey(k):** symmetric — remember candidates with `node.key ≥ k` while searching.

**delete:** BST delete (0 / 1 / 2 children). With two children, replace with in-order successor (or predecessor), then fix balance.

## Balancing (red-black sketch)

After insert/delete, restore red-black invariants with recoloring and rotations (`leftRotate` / `rightRotate`). Common insert fix cases: uncle red → recolor; uncle black → rotate + recolor depending on zig-zag vs zig-zig.

AVL is also fine if height balance is maintained after every update.

## Complexity

Height stays `O(log n)` → each public method is `O(log n)`. Avoid rebuilding a sorted array of keys on every call.
