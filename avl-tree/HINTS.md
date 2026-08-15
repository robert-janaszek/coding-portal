# Hints — AVL Tree

Spoilers. Read only after you have tried on your own.

## Idea

Each node stores `key`, `left`, `right`, and either `height` or a balance factor. After a recursive insert, update height and, if `|balance| > 1`, rotate.

`toArray()` is just a recursive dump of that structure: empty → `[]`, else `[node.key, toArray(left), toArray(right)]`.

## Four imbalance cases

Balance = `height(left) - height(right)`.

- **LL** (balance > 1 and key went into left-left): `rightRotate(node)`
- **RR** (balance < -1 and key went into right-right): `leftRotate(node)`
- **LR** (balance > 1 and key went into left-right): `leftRotate(node.left)` then `rightRotate(node)`
- **RL** (balance < -1 and key went into right-left): `rightRotate(node.right)` then `leftRotate(node)`

## Height (on nodes, not as a public method)

If you store height on each node (empty child = 0; leaf height = 1):

`height(node) = 1 + max(height(left), height(right))`

Use it only to compute balance factors and decide rotations.

## Complexity

Rotations are `O(1)`; you touch `O(log n)` nodes on the path → `O(log n)` per insert.
