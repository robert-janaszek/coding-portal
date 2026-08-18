# Power Set

**Difficulty:** Easy
**Topics:** Combinatorics
**Target:** `O(n * 2^n)` time, `O(n)` extra space (excluding output)

## Problem

`nums` holds distinct integers. Return every subset (including `[]` and the full array).

Duplicate subsets are not allowed. Order of subsets, and order inside a subset, does not matter.

Same search tree as k-subsets, except you keep **every** prefix, not only those of length `k`.

## Examples

### Example 1

```
Input:  nums = [4, 8]
Output: [[], [4], [8], [4, 8]]
```

### Example 2

```
Input:  nums = [0]
Output: [[], [0]]
```

### Example 3

```
Input:  nums = []
Output: [[]]
```

## Constraints (exercise)

- `0 <= nums.length <= 10`
- `-10 <= nums[i] <= 10`
- all values in `nums` are unique

## Files

| File | Role |
|------|------|
| `powerSet.ts` | Stub |
| `powerSet.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:power-set
```
