# Hints — Join Sorted Chains

Spoilers. Read only after you have tried on your own.

## Idea

Every chain is already ordered, so at each step the next output node is the **smallest current head** among the `k` chains. Advance that chain and repeat until nothing remains.

Scanning all `k` heads on every step is `O(N k)` — too slow for the target.

## Min-heap of heads

Keep a heap of size at most `k`, keyed by `val`, holding the current head of each non-empty chain.

1. Push every non-null `chains[i]`.
2. Pop the smallest node, append it to the result, and if it has a `next`, push that `next`.
3. Repeat until the heap is empty.

Each of the `N` nodes is pushed and popped once → `O(N log k)` time, `O(k)` extra space.

## Pairwise join (divide and conquer)

Joining two sorted lists is linear in their combined length. Recursively join the left half of `chains` with the right half (same structure as merge sort). Depth is `log k`; across each level every node is visited a constant number of times → also `O(N log k)`, with `O(log k)` recursion depth.

Joining the lists one after another left-to-right is **not** the same: early lists get walked `Θ(k)` times.

## Complexity

Time: `O(N log k)`  
Space: `O(k)` with a heap, or `O(log k)` stack with pairwise join (plus a dummy tail pointer).
