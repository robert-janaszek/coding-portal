# Hints — Heap Sort

Spoilers. Read only after you have tried on your own.

Index math (0-based):

- parent: `floor((i - 1) / 2)`
- left child: `2 * i + 1`
- right child: `2 * i + 2`

Typical steps:

1. **`siftDown(arr, i, heapSize)`** — restore max-heap property at index `i` within `heapSize`.
2. **`buildMaxHeap(arr)`** — `siftDown` for every non-leaf from `floor(n/2)-1` down to `0`.
3. **`heapSort(arr)`** — build heap, then for `end = n-1 … 1`: swap `arr[0]` with `arr[end]`, sift down at `0` with heap size `end`.
