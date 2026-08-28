# Merge Sort

**Difficulty:** Medium
**Topics:** Sorting, Divide and Conquer
**Target:** `O(n log n)` time, `O(n)` extra space

## Problem

Implement **merge sort**: sort an array of numbers in non-decreasing order.

Split the array, recursively sort each half, then merge the two sorted halves.

Do **not** use `Array.prototype.sort` inside the solution.

You may allocate an auxiliary array. Return a new array or the same one.

## Examples

### Example 1

```
Input:  [4, 10, 3, 5, 1]
Output: [1, 3, 4, 5, 10]
```

### Example 2

```
Input:  [1]
Output: [1]
```

### Example 3

```
Input:  []
Output: []
```

## Constraints (exercise)

- `0 <= nums.length <= 10_000` (tests stay smaller)
- values are finite JS numbers (may include negatives and duplicates)

## Files

| File | Role |
|------|------|
| `mergeSort.ts` | Stub — implement here |
| `mergeSort.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |
| `solutions/` | Archived attempts (spoilers) |

```bash
npm run test:mergesort
```
