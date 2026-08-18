# Hints — Root-to-Leaf Paths

Spoilers. Read only after you have tried on your own.

## Pre-order DFS

Visit the node first, then the left child, then the right child. Carry the path so far (values, or a string) as you go down.

When you reach a leaf, copy the current path into the answer.

After exploring a child, remove that node from the path (**backtrack**) so the sibling starts from the same prefix.

## Base cases

- `root === null` → no paths
- a node with `left === null` and `right === null` is a leaf — emit one path

## Complexity

Each node is visited once → `O(n)` time. Recursion depth and the path buffer are `O(h)`.
