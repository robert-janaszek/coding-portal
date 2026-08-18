# Max Path Sum in a Tree

**Difficulty:** Hard  
**Topics:** Binary tree, Post-order  
**Target:** `O(n)` time

## Problem

A path is a walk along tree edges that does not repeat a node. It may start and end anywhere — it does **not** have to include the root.

Return the largest sum of node values on any non-empty path.

Work **post-order**: both children’s results are needed before this node can choose a downward gain vs a path that bends here.

`TreeNode` is exported from the stub file.

## Examples

```
Input:  root = [2, -1, 3]
Output: 4
Explanation: path -1 → 2 → 3

Input:  root = [4, -2, 7, null, null, 3, 1]
Output: 14
Explanation: path 4 → 7 → 3
```

## Constraints

- number of nodes in `[1, 3 * 10^4]` (tests smaller)
- `-1000 <= Node.val <= 1000`

## Files

| File | Role |
|------|------|
| `maxPathSumInATree.ts` | Stub (+ `TreeNode`) |
| `maxPathSumInATree.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |
| `solutions/` | Archived attempts (spoilers) |

```bash
npm run test:max-path-sum-in-a-tree
```
