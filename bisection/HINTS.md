# Hints — Binary Search

Spoilers. Read only after you have tried on your own.

1. Maintain inclusive range `[lo, hi]`.
2. While `lo <= hi`:
   - `mid = lo + floor((hi - lo) / 2)`
   - if `nums[mid] === target` → return `mid`
   - if `nums[mid] < target` → `lo = mid + 1`
   - else → `hi = mid - 1`
3. Return `-1`.

Watch off-by-one: mid formula, `lo`/`hi` updates, empty array.
