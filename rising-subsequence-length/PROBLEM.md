# Rising Subsequence Length

**Difficulty:** Medium
**Topics:** Arrays
**Target:** `O(n * n)` time, `O(n)` extra space

## Problem

Given `nums`, return the length of the longest **strictly rising** subsequence.

A subsequence keeps the original order but may skip elements. It need not be contiguous. Equal values do not count as rising. An empty array has length `0`. A single element has length `1`.

## Examples

```
Input:  nums = [3, 1, 2, 4]
Output: 3
Explanation: 1, 2, 4

Input:  nums = [5, 4, 3, 2]
Output: 1
Explanation: every pair decreases; pick any singleton

Input:  nums = [7, 7, 7]
Output: 1
```

## Constraints (exercise)

- `0 <= nums.length <= 2000` (tests smaller)
- values are finite JS numbers (may include negatives and duplicates)

## Files

| File | Role |
|------|------|
| `risingSubsequenceLength.ts` | Stub — implement here |
| `risingSubsequenceLength.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:rising-subsequence-length
```
