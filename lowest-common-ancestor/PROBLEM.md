# Lowest Common Ancestor (LCA) in Binary Tree

**Difficulty:** Medium
**Topics:** Binary tree, DFS
**Target:** `O(n)` time, `O(h)` space (recursion stack)

## Problem
Given the `root` of a binary tree and two nodes `p` and `q`, return the lowest common ancestor (LCA) of `p` and `q`.

The LCA of two nodes is the lowest node in the tree that has both `p` and `q` as descendants (where a node can be a descendant of itself).

## Examples

### Example 1

```
Input:  root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
```

### Example 2

```
Input:  root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
```

### Example 3

```
Input:  root = [3,5,1,6,2,0,8,null,null,7,4], p = 6, q = 4
Output: 2
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

