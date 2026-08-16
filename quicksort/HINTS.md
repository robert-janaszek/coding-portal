# Hints — Quick Sort

Spoilers. Read only after you have tried on your own.

## Idea

Pick a pivot, **partition** so smaller values are on the left and larger on the right, then recurse on both sides. The pivot is then in its final sorted position.

## Recursion

```
quicksort(left, right):
  if left >= right: return
  p = partition(left, right)
  quicksort(left, p - 1)
  quicksort(p + 1, right)
```

Reuse the Lomuto partition from the `partition` exercise (`nums[right]` as pivot). After it returns `p`, do **not** include `p` in either recursive call.

## Pivot

Last element is fine for this exercise. Sorted / reverse-sorted input makes that pivot worst-case `O(n²)` — random or median-of-three avoids it in production.

## Complexity

Average: `T(n) = 2 T(n/2) + O(n)` → `O(n log n)`, stack `O(log n)`.  
Worst (already sorted, bad pivot): `T(n) = T(n-1) + O(n)` → `O(n²)`, stack `O(n)`.
