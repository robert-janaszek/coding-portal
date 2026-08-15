# AVL Tree

**Difficulty:** Hard  
**Topics:** Balanced BST, AVL, Rotations  
**Target:** `O(log n)` `insert`; height always `O(log n)`

## Problem

Implement an **AVL tree**: a BST that stays height-balanced after every insert.

Balance factor of a node = `height(left) - height(right)`. In an AVL tree every node has balance factor in `{-1, 0, 1}`. When an insert would break that, fix it with **rotations** (single or double).

Implement `AVLTree` (keys only — no values):

- `insert(key)` — add `key` if absent; rebalance along the path
- `toArray()` — snapshot of the tree shape: empty tree → `[]`, otherwise `[key, left, right]` (same format recursively)

Duplicate `insert` is a no-op (do not change structure).

`toArray()` is how tests see that rotations actually happened. In-order keys alone are not enough: an unbalanced stick still sorts the same way.

## Examples

```
const t = new AVLTree();
t.insert(30);
t.insert(20);
t.insert(10);   // LL case → right rotation; 20 becomes root
t.toArray();    // [20, [10, [], []], [30, [], []]]

t.insert(40);
t.insert(50);   // RR on the right side
t.toArray();    // [20, [10, [], []], [40, [30, [], []], [50, [], []]]]
```

Sorted inserts must **not** produce a stick of height `n`:

```
const t = new AVLTree();
for (let i = 1; i <= 7; i++) t.insert(i);
t.toArray();
// [4, [2, [1, [], []], [3, [], []]], [6, [5, [], []], [7, [], []]]]
```

## Constraints

- Keys fit in JS `number` (tests use integers)
- At most a few thousand inserts in tests
- Empty tree: `toArray()` → `[]`

## Complexity

Maintain the AVL invariant after every `insert`. Then height is `O(log n)` and insert is `O(log n)`.

A plain BST without rotations will fail the shape checks (especially on sorted input).

## Files

| File | Role |
|------|------|
| `AVLTree.ts` | Stub class |
| `AVLTree.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |
| `solutions/` | Archived attempts (spoilers) |

```bash
npm run test:avl-tree
```
