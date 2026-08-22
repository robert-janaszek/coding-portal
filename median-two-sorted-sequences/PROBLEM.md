# Median of Two Sorted Sequences

**Difficulty:** Hard  
**Topics:** Arrays  
**Target complexity:** `O(log(m + n))` time, `O(1)` extra space

## Problem

`nums1` and `nums2` are each sorted non-decreasing. Return the **median** of the combined multiset (both arrays concatenated, then sorted).

Let that combined sequence be `A` of length `N = m + n`, indexed from `0`.

- If `N` is **odd**, the median is the single middle value: `A[floor(N / 2)]`.
- If `N` is **even**, the median is the average of the two middle values: `(A[N / 2 - 1] + A[N / 2]) / 2` (a float is allowed).

Duplicates count separately. Either array may be empty.

## Examples

### Example 1

```
Input:  nums1 = [2, 8], nums2 = [4]
Output: 4
Explanation: combined A = [2, 4, 8], N = 3 (odd) → A[1] = 4
```

### Example 2

```
Input:  nums1 = [1, 5], nums2 = [2, 9]
Output: 3.5
Explanation: combined A = [1, 2, 5, 9], N = 4 (even) → (A[1] + A[2]) / 2 = (2 + 5) / 2 = 3.5
```

## Constraints

- `nums1.length == m`
- `nums2.length == n`
- `0 <= m <= 1000`
- `0 <= n <= 1000`
- `1 <= m + n <= 2000`
- `-10^6 <= nums1[i], nums2[i] <= 10^6`

## Files

| File | Role |
|------|------|
| `medianTwoSortedSequences.ts` | Stub — implement here |
| `solutions/` | Archived attempts (spoilers) |
| `medianTwoSortedSequences.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:median-two-sorted-sequences
```
