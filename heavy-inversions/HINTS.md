# Hints — Heavy Inversions

Spoilers. Read only after you have tried on your own.

## Idea

Same skeleton as right-side-smaller-counts: split by **index**, sort each half, count pairs that **cross** the midpoint, then merge.

A crossing pair is `left[a]` (earlier index) and `right[b]` (later index) with `left[a] > 2 * right[b]`.

## Counting is not `+= j` from the sort comparison

Sort still uses ordinary `<` / `<=`. The pair condition is **stricter** (`> 2x`), so it does not line up with “how many from the right already entered the merged array”.

After both halves are sorted, count with a **second** two-pointer pass (or a `j` that only moves forward):

- For each `left[i]`, advance `j` on the right while `left[i] > 2 * right[j]`
- Add that `j` to the answer
- Then merge the two halves as usual

`j` only moves right → `O(m)` count + `O(m)` merge.

## Recursion

Pairs entirely in the left half and entirely in the right half are counted by the recursive calls. The merge step only adds crossing pairs. Each `(i, j)` with `i < j` meets in exactly one merge.

## Negatives / overflow

`2 * nums[j]` is safe in JS for 32-bit ints. Watch the inequality: `-2 > 2 * (-4)` is true (`-2 > -8`).

## Complexity

`T(n) = 2 T(n/2) + O(n)` → `O(n log n)`. Nested loops over all pairs are `O(n²)`.
