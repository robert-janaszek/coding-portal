# Hints — Merge Sort

Spoilers. Read only after you have tried on your own.

## Idea

Divide in half until the pieces are trivial (`length <= 1` is already sorted), then **merge** two sorted runs into one.

## Recursion

```
mergesort(a):
  if a.length <= 1: return a
  mid = floor(a.length / 2)
  left = mergesort(a[0..mid))
  right = mergesort(a[mid..end))
  return merge(left, right)
```

`merge` walks both runs with two indices and always takes the smaller head. When one run is exhausted, append the rest of the other.

## In-place vs extra array

Typical merge uses an auxiliary buffer of size `n` (or of the current range). Sorting entirely in `O(1)` extra space is a different algorithm.

## Complexity

`T(n) = 2 T(n/2) + O(n)` → `O(n log n)` time in every case. Extra space is `O(n)` for the buffer plus `O(log n)` recursion depth.
