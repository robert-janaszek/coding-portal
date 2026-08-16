# Combination Sum

**Difficulty:** Medium
**Topics:** Combinatorics
**Target:** exponential in the depth of the tree, `O(target / min(candidates))` extra space (excluding output)

## Problem

Given an array of **distinct** positive integers `candidates` and a target integer `target`, return all unique combinations where the chosen numbers sum to `target`.

You may reuse the same number from `candidates` **unlimited** times.

Two combinations are unique if the frequency of at least one number differs. Order inside a combination does not matter (treat `[2,2,3]` and `[2,3,2]` as the same). Order of the returned list does not matter.

This is combinations again: a `start` index avoids permutations of the same multiset. The twist is you may stay on the same index (reuse) instead of always advancing.

## Examples

### Example 1

```
Input:  candidates = [2, 3, 6, 7], target = 7
Output: [[2,2,3], [7]]
```

### Example 2

```
Input:  candidates = [2, 3, 5], target = 8
Output: [[2,2,2,2], [2,3,3], [3,5]]
```

### Example 3

```
Input:  candidates = [2], target = 1
Output: []
```

## Constraints (exercise)

- `1 <= candidates.length <= 30`
- `2 <= candidates[i] <= 40`
- all values in `candidates` are unique
- `1 <= target <= 40`

## Files

| File | Role |
|------|------|
| `combinationSum.ts` | Stub |
| `combinationSum.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:combination-sum
```
