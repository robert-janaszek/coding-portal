# Root-to-Leaf Paths

**Difficulty:** Easy
**Topics:** Binary tree, Pre-order
**Target:** `O(n)` time, `O(h)` extra space (`h` = height), not counting the output

## Problem

Given the `root` of a binary tree, return every path from the root to a leaf.

A leaf has no children. Format each path as values joined by `->`, for example `8->3->1`.

Return paths in **left-to-right** leaf order (the order a **pre-order** walk discovers them: visit the node, then the left subtree, then the right subtree).

`TreeNode` is exported from the stub file.

## Examples

### Example 1

```
      8
     / \
    3   9
   / \
  1   5

Input:  root = [8, 3, 9, 1, 5]
Output: ["8->3->1", "8->3->5", "8->9"]
```

### Example 2

```
Input:  root = [4]
Output: ["4"]
```

### Example 3

```
Input:  root = null
Output: []
```

## Constraints (exercise)

- `0 <= n <= 100` nodes (tests smaller)
- `-100 <= Node.val <= 100`

## Files

| File | Role |
|------|------|
| `treePaths.ts` | Stub (+ `TreeNode`) |
| `treePaths.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:tree-paths
```
