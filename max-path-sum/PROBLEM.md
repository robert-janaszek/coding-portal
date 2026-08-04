# Binary Tree Maximum Path Sum

**Difficulty:** Hard  
**Topics:** Binary tree  
**Target:** `O(n)` time

## Problem

A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge. Nodes appear at most once. The path **does not need to pass through the root**.

The **path sum** is the sum of node values on the path.

Given the `root`, return the maximum path sum of any non-empty path.

`TreeNode` is exported from the stub file.

## Examples

```
Input:  root = [1,2,3]
Output: 6
Explanation: path 2 → 1 → 3

Input:  root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: path 15 → 20 → 7
```

## Constraints

- number of nodes in `[1, 3 * 10^4]` (tests smaller)
- `-1000 <= Node.val <= 1000`

## Files

| File | Role |
|------|------|
| `maxPathSum.ts` | Stub (+ `TreeNode`) |
| `maxPathSum.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:max-path-sum
```
