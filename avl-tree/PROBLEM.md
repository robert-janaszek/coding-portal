# AVL Tree

**Difficulty:** Hard  
**Topics:** Balanced BST, AVL, Rotations  
**Target:** `O(log n)` `insert` / `delete` / `contains`; height always `O(log n)`

## Problem

Implement an **AVL tree**: a BST that stays height-balanced after every update.

Balance factor of a node = `height(left) - height(right)`. In an AVL tree every node has balance factor in `{-1, 0, 1}`. When an insert or delete would break that, fix it with **rotations** (single or double).

This exercise is about the **balancing mechanics**. For an ordered dictionary API built on a balanced BST, see `ordered-map/`.

Implement `AVLTree` (keys only — no values):

- `insert(key)` — add `key` if absent; rebalance along the path
- `delete(key)` — remove `key` if present; return whether it existed; rebalance
- `contains(key)` — whether `key` is in the tree
- `size()` — number of keys
- `height()` — tree height: empty → `0`, single node → `1`
- `toArray()` — keys in ascending (in-order) order

Duplicate `insert` is a no-op (do not change size or structure).

## Examples

```
const t = new AVLTree();
t.insert(30);
t.insert(20);
t.insert(10);   // LL case → rotate; tree stays balanced
t.toArray();    // [10, 20, 30]
t.height();     // 2  (not 3)
t.size();       // 3
t.contains(20); // true

t.insert(40);
t.insert(50);   // RR on the right side
t.toArray();    // [10, 20, 30, 40, 50]
t.delete(20);
t.contains(20); // false
```

Sorted inserts must **not** produce a stick of height `n`:

```
const t = new AVLTree();
for (let i = 1; i <= 100; i++) t.insert(i);
t.height(); // O(log n), e.g. well below 20 — never 100
```

## Constraints

- Keys fit in JS `number` (tests use integers)
- At most a few thousand operations in tests
- Empty tree: `contains` → `false`, `delete` → `false`, `height` → `0`, `toArray` → `[]`

## Complexity

Maintain the AVL invariant after every `insert` / `delete`. Then height is `O(log n)` and each operation is `O(log n)`.

A plain BST without rotations will fail the height checks (especially on sorted input).

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
