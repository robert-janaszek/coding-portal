# Heavy Inversions

**Difficulty:** Hard  
**Topics:** Arrays
**Target:** `O(n log n)` time

## Problem

Count pairs of indices `(i, j)` with `i < j` and `nums[i] > 2 * nums[j]`.

## Examples

### Example 1

```
Input:  nums = [6, 1, 2]
Output: 2
```

Pairs: `6 > 2 * 1` and `6 > 2 * 2`.

### Example 2

```
Input:  nums = [9, 2, 3]
Output: 2
```

Pairs: `9 > 2 * 2` and `9 > 2 * 3`. `2 > 2 * 3` is false.

### Example 3

```
Input:  nums = [4, 1]
Output: 1
```


## Constraints

- `1 <= nums.length <= 5 * 10^4` (tests stay smaller, but aim for `O(n log n)`)
- `-2^31 <= nums[i] <= 2^31 - 1`

## Files

| File | Role |
|------|------|
| `heavyInversions.ts` | Stub — implement here |
| `heavyInversions.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |
| `solutions/` | Archived attempts (spoilers) |

```bash
npm run test:heavy-inversions
```
