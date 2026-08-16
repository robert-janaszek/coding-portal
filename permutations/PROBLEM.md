# Permutations

**Difficulty:** Medium
**Topics:** Combinatorics
**Target:** `O(n * n!)` time, `O(n)` extra space (excluding output)

## Problem

Given an array of **distinct** integers `nums`, return all possible permutations.

Order of the returned lists does not matter.

Combinations always pick the next number **to the right**. Here order matters, so any unused number can go in the next slot.

## Examples

### Example 1

```
Input:  nums = [1, 2, 3]
Output: [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
```

### Example 2

```
Input:  nums = [0, 1]
Output: [[0,1], [1,0]]
```

### Example 3

```
Input:  nums = [1]
Output: [[1]]
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
