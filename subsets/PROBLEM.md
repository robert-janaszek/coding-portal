# Subsets

**Difficulty:** Easy
**Topics:** Combinatorics
**Target:** `O(n * 2^n)` time, `O(n)` extra space (excluding output)

## Problem

Given an array of **distinct** integers `nums`, return all possible subsets (the power set).

The solution must not contain duplicate subsets. Order of subsets (and order inside a subset) does not matter.

This is the same search tree as combinations, except you keep **every** prefix, not only those of length `k`.

## Examples

### Example 1

```
Input:  nums = [1, 2, 3]
Output: [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]
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
| `subsets.ts` | Stub |
| `subsets.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:subsets
```
