# Hints — K-th Largest in an Array

Spoilers. Read only after you have tried on your own.

## Min-heap of size `k`

Keep the `k` largest values seen so far in a **min-heap** (the root is the smallest of those `k`).

1. Push each number onto the heap.
2. If the heap size exceeds `k`, pop the minimum.
3. After the scan, the root is the `k`-th largest.

`O(n log k)` time, `O(k)` extra space.

## Max-heap alternative

Build a max-heap of all `n` elements and pop `k` times → `O(n + k log n)` if you heapify in linear time.
