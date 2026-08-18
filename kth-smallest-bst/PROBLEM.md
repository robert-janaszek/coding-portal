# Kth Smallest in a BST

**Difficulty:** Medium
**Topics:** Binary tree, In-order, BST
**Target:** `O(n)` time, `O(h)` extra space (`h` = height)

## Problem

Given the `root` of a **binary search tree** and an integer `k` (1-indexed), return the `k`-th smallest value among the nodes.

In a BST, an **in-order** walk (left subtree, node, right subtree) visits keys in sorted order. Use that — do not dump every value into an array and sort.

`TreeNode` is exported from the stub file.

## Examples

### Example 1

```
      6
     / \
    2   8
   / \
  1   4

Input:  root = [6, 2, 8, 1, 4], k = 3
Output: 4
```

### Example 2

```
Input:  same tree, k = 1
Output: 1
```

### Example 3

```
Input:  same tree, k = 5
Output: 8
```

## Constraints (exercise)

- `1 <= n <= 10^4` nodes (tests smaller)
- `1 <= k <= n`
- node values are **unique**
- the tree is a valid BST

## Files

| File | Role |
|------|------|
| `kthSmallestBst.ts` | Stub (+ `TreeNode`) |
| `kthSmallestBst.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:kth-smallest-bst
```
