# Heap Sort (Sortowanie przez kopcowanie)

**Difficulty:** Medium  
**Target complexity:** `O(n log n)` time, `O(1)` extra space (in-place)

## Problem

Implement **heap sort**: sort an array of numbers in non-decreasing order using a binary heap.

Do **not** use the language built-in sort (`Array.prototype.sort`, etc.) inside the solution.

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

- `0 <= nums.length <= 10_000`
- values are finite JS numbers (may include negatives and duplicates)

## Files

| File | Role |
|------|------|
| `heapSort.ts` | Stub |
| `heapSort.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:heapsort
```
