# Hints — Count Smaller After Self

Spoilers. Read only after you have tried on your own.

## Idea

Scan from **right to left**. Maintain a structure of values already seen (everything to the right). For each `nums[i]`, query “how many stored values are `< nums[i]`?”, then insert `nums[i]`.

## Structure

You need an ordered collection that supports:

- insert a value
- count how many elements are strictly less than `x`

A balanced BST where each node stores the size of its subtree (or “how many values in this node’s multiplicity”) does both in `O(log n)`. Same role as an order-statistic tree.

Alternatives that also hit `O(n log n)`: Fenwick / segment tree on compressed ranks, or merge-sort counting during merge.

## Strict inequality

When the structure allows duplicates, counting “rank of `x`” must not include equal keys — query `< x`, not `≤ x`.

## Complexity

`n` queries/inserts × `O(log n)` → `O(n log n)`. Nested loops over the suffix are `O(n²)`.
