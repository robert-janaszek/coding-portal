# Deepest Shared Ancestor

**Difficulty:** Medium
**Topics:** Binary tree
**Target:** `O(n)` time, `O(h)` space (recursion stack)

## Problem

In a binary tree, the deepest shared ancestor of nodes `p` and `q` is the lowest node that has both as descendants. A node is a descendant of itself.

Return that node (not just its value). `p` and `q` are guaranteed to exist.

`TreeNode` is exported from the stub file.

## Examples

### Example 1

```
      8
     / \
    3   10
   / \
  1   6

Input:  root = [8, 3, 10, 1, 6], p = 1, q = 6
Output: 3
```

### Example 2

```
Input:  same tree, p = 1, q = 10
Output: 8
```

### Example 3

```
Input:  same tree, p = 6, q = 3
Output: 3
```

## Constraints (exercise)
- Number of nodes in the tree is between `1` and `3 * 10^4` (tests smaller)
- TreeNode values fit in number

## Files

| File | Role |
|------|------|
| `lowestCommonAncestor.ts` | Stub (+ `TreeNode`) |
| `lowestCommonAncestor.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:run -- lowest-common-ancestor/lowestCommonAncestor.test.ts
```

