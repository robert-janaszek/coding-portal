# Unbounded Combinations

**Difficulty:** Medium
**Topics:** Combinatorics
**Target:** exponential in the depth of the tree, `O(target / min(candidates))` extra space (excluding output)

## Problem

`candidates` are distinct positive integers. List every multiset drawn from them that sums to `target`. A value may be reused any number of times.

Two lists are the same combination if they have the same counts. `[3, 5]` and `[5, 3]` are one combination. Order of the returned list does not matter.

## Examples

### Example 1

```
Input:  candidates = [3, 5, 8], target = 8
Output: [[3, 5], [8]]
```

### Example 2

```
Input:  candidates = [4, 5, 6], target = 10
Output: [[4, 6], [5, 5]]
```

### Example 3

```
Input:  candidates = [4], target = 3
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
| `unboundedCombinations.ts` | Stub |
| `unboundedCombinations.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:unbounded-combinations
```
