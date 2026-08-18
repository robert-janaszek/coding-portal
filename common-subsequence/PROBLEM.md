# Common Subsequence Length

**Difficulty:** Medium
**Topics:** Strings
**Target:** `O(m * n)` time, `O(m * n)` extra space (a rolling row is fine too)

## Problem

Given strings `s` and `t`, return the length of the longest sequence of characters that appears in **both**, in the same order, not necessarily consecutively.

Deleting characters is allowed; reordering is not. If they share nothing, return `0`.

This is the two-string DP cousin of **String Conversion Cost**: here you only keep matching letters.

## Examples

```
Input:  s = "portal", t = "trail"
Output: 3
Explanation: "tal" and "ral" both work; nothing longer fits both orders

Input:  s = "wave", t = "wave"
Output: 4

Input:  s = "xyz", t = "abc"
Output: 0
```

## Constraints (exercise)

- `0 <= s.length, t.length <= 1000` (tests smaller)
- lowercase English letters in tests

## Files

| File | Role |
|------|------|
| `commonSubsequence.ts` | Stub — implement here |
| `commonSubsequence.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:common-subsequence
```
