# Hints — Search a Pivoted Array

Spoilers. Read only after you have tried on your own.

## Idea

At any `mid`, **at least one half** `[lo, mid]` or `[mid, hi]` is still sorted. Decide which, then check whether `target` lies in that sorted range.

## Loop

Inclusive `[lo, hi]`. While `lo <= hi`:

1. If `nums[mid] === target`, return `mid`.
2. If `nums[lo] <= nums[mid]`, the **left** half is sorted:
   - if `target` is in `[nums[lo], nums[mid])`, search left (`hi = mid - 1`)
   - else search right
3. Otherwise the **right** half is sorted:
   - if `target` is in `(nums[mid], nums[hi]]`, search right
   - else search left

## Complexity

Each step halves the range → `O(log n)` time, `O(1)` extra space.

Duplicates would break the `nums[lo] <= nums[mid]` test; this exercise has unique values.
