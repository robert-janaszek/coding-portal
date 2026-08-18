# Hints — Kth Smallest in a BST

Spoilers. Read only after you have tried on your own.

## In-order

Left → node → right visits BST keys from smallest to largest.

Keep a counter of how many nodes you have visited. When the counter hits `k`, that node’s value is the answer. You can stop walking at that point.

Recursive or an explicit stack both work. Extra space should be `O(h)`, not a full sorted copy of the tree.

## Why not sort?

Sorting after collecting values is `O(n log n)` and ignores the BST. In-order already produces sorted order in `O(n)`.
