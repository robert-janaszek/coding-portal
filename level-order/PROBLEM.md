# Level-Order Groups

**Difficulty:** Easy
**Topics:** Binary tree, Level-order
**Target:** `O(n)` time, `O(w)` extra space (`w` = max width)

## Problem

Given the `root` of a binary tree, return its node values **grouped by level**, from top to bottom. Within a level, values go **left to right**.

This is **level-order** (BFS): finish one depth before moving to the next. Do not flatten the tree into a single list — each level is its own array.

`TreeNode` is exported from the stub file.

## Examples

### Example 1

```
      4
     / \
    9   2
   /   / \
  1   7   6

Input:  root = [4, 9, 2, 1, null, 7, 6]
Output: [[4], [9, 2], [1, 7, 6]]
```

### Example 2

```
Input:  root = [3]
Output: [[3]]
```

### Example 3

```
Input:  root = null
Output: []
```

## Constraints (exercise)

- `0 <= n <= 2000` nodes (tests smaller)
- `-1000 <= Node.val <= 1000`

## Files

| File | Role |
|------|------|
| `levelOrder.ts` | Stub (+ `TreeNode`) |
| `levelOrder.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:level-order
```
