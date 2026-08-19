# Quick Sort

**Difficulty:** Medium  
**Topics:** Sorting  
**Target:** average `O(n log n)` time, `O(log n)` extra stack; worst `O(n²)` time

## Problem

Implement **quicksort**: sort an array of numbers in non-decreasing order.

Do **not** use `Array.prototype.sort` inside the solution.

You may sort in place and return the same array, or return a new array.

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
| `quickSort.ts` | Stub — implement here |
| `quickSort.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |
| `solutions/` | Archived attempts (spoilers) |

```bash
npm run test:quicksort
```
