# Hints — Partition

Spoilers. Read only after you have tried on your own.

## Idea

Walk the subarray once. Keep a boundary `i`: everything before `i` is already `<= pivot`. Scan with `j`; when you see a small element, swap it into the boundary and advance `i`.

## Lomuto

Pivot is `nums[right]`. Do not include `right` in the scan.

1. `i = left`
2. For `j = left … right - 1`:
   - if `nums[j] <= pivot`: swap `nums[i]` with `nums[j]`, then `i++`
3. Swap `nums[i]` with `nums[right]`
4. Return `i`

## Invariant

After the loop, `[left, i)` are `<= pivot`, `[i, right)` are `> pivot`, and `nums[right]` is still the pivot. The last swap puts it in its hole.

Duplicates go left because of `<=`. Equals on the right would move `p`.

## Complexity

One pass, constant extra pointers → `O(n)` time, `O(1)` extra space.
