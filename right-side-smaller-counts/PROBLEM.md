# Right-Side Smaller Counts

**Difficulty:** Hard  
**Topics:** Arrays  
**Target:** `O(n log n)` time

## Problem

For each index `i`, count how many values **to the right** are **strictly smaller** than `nums[i]`.

`counts[i] = |{ j | j > i and nums[j] < nums[i] }|`

Equals do not count.

## Examples

### Example 1

```
Input:  nums = [8, 1, 5, 2]
Output: [3, 0, 1, 0]
```

- `8` → `1, 5, 2` → `3`
- `1` → none → `0`
- `5` → `2` → `1`
- `2` → none → `0`

### Example 2

```
Input:  nums = [4]
Output: [0]
```

### Example 3

```
Input:  nums = [2, 2]
Output: [0, 0]
```

## Constraints

- `1 <= nums.length <= 10^5` (tests stay smaller, but aim for `O(n log n)`)
- `-10^4 <= nums[i] <= 10^4`

## Files

| File | Role |
|------|------|
| `rightSideSmallerCounts.ts` | Stub — implement here |
| `rightSideSmallerCounts.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |
| `solutions/` | Archived attempts (spoilers) |

```bash
npm run test:right-side-smaller-counts
```
