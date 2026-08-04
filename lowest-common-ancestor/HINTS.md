# Hints — Lowest Common Ancestor (LCA)

Spoilers. Read only after you have tried on your own.

## Key DFS idea

For each node, recursively solve the problem for its left and right subtrees.

- If one subtree contains `p` and the other contains `q`, then the current node is the LCA.
- If both nodes are in the same subtree, propagate the result upward from that subtree.

## What to return

A common pattern is to return:

- the node that is the LCA for the current subtree, or
- `null` if neither `p` nor `q` exists in this subtree.

This yields `O(n)` time with `O(h)` recursion stack.

