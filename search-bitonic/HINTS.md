# Hints — Search in Bitonic Array

Spoilers. Read only after you have tried on your own.

## Idea

The peak splits the array into two independently sorted halves. Find the peak first, then binary-search each half (ascending on the left, descending on the right).

## Find the peak

While the range has more than one index, look at `mid` vs `mid + 1`:

- if `nums[mid] < nums[mid + 1]`, the peak is to the right (`lo = mid + 1`)
- else the peak is at `mid` or to the left (`hi = mid`)

When `lo === hi`, that index is the peak.

## Search

1. If `nums[peak] === target`, return `peak`.
2. Binary search `[0, peak)` as a normal **ascending** array.
3. Binary search `(peak, n)` as a **descending** array (`nums[mid] > target` → go right, else go left).

## Complexity

Three binary searches → `O(log n)` time, `O(1)` extra space.
