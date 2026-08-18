# All Orderings

**Difficulty:** Medium
**Topics:** Combinatorics
**Target:** `O(n * n!)` time, `O(n)` extra space (excluding output)

## Problem

`nums` holds distinct integers. Return every permutation.

Order of the returned lists does not matter.

Unlike combinations (always take the next unused value **to the right**), here any unused value can fill the next slot.

## Examples

### Example 1

```
Input:  nums = [4, 8]
Output: [[4, 8], [8, 4]]
```

### Example 2

```
Input:  nums = [9]
Output: [[9]]
```

## Constraints (exercise)

- `1 <= nums.length <= 6`
- `-10 <= nums[i] <= 10`
- all values in `nums` are unique

## Files

| File | Role |
|------|------|
| `permute.ts` | Stub |
| `permute.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:permutations
```
