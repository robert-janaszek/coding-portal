# Hints — AVL Tree

Spoilers. Read only after you have tried on your own.

## Idea

Each node stores `key`, `left`, `right`, and either `height` or a balance factor. After a recursive insert/delete, update height and, if `|balance| > 1`, rotate.

## Four imbalance cases

Balance = `height(left) - height(right)`.

- **LL** (balance > 1 and key went into left-left): `rightRotate(node)`
- **RR** (balance < -1 and key went into right-right): `leftRotate(node)`
- **LR** (balance > 1 and key went into left-right): `leftRotate(node.left)` then `rightRotate(node)`
- **RL** (balance < -1 and key went into right-left): `rightRotate(node.right)` then `leftRotate(node)`

Same cases apply on the way up after `delete` (choose the side by the child's balance when ambiguous).

## Delete

Standard BST delete (0 / 1 / 2 children). With two children, replace with in-order successor (min of right subtree), then delete that successor node and rebalance upward.

## Height

If you store height on each node (empty child = 0 with this problem’s convention: missing subtree contributes `0`, leaf node height `1`):

`height(node) = 1 + max(height(left), height(right))`

Public `height()` is the root’s height (or `0` if empty).

## Complexity

Rotations are `O(1)`; you touch `O(log n)` nodes on the path → `O(log n)` per update.
