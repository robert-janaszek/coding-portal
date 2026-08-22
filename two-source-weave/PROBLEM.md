# Two-Source Weave

**Difficulty:** Medium
**Topics:** Strings
**Target:** `O(m * n)` time, `O(m * n)` extra space (a rolling row is fine too)

## Problem

You have two source strings `left` and `right`, and a candidate `woven`.

Return `true` if `woven` is a merge of `left` and `right` that **keeps the relative order** of each source. At each step you take the next unused character from `left` or from `right`. Every character of both sources is used once; `woven` has no extra characters.

If `woven.length !== left.length + right.length`, the answer is `false`.

## Examples

```
Input:  left = "ace", right = "bd", woven = "abcde"
Output: true
Explanation: a (left), b (right), c (left), d (right), e (left)

Input:  left = "abc", right = "def", woven = "abedcf"
Output: false
Explanation: `e` from `right` appears before `d`, so `right`'s order is broken

Input:  left = "aa", right = "ab", woven = "aaba"
Output: true
```

## Constraints (exercise)

- `0 <= left.length, right.length <= 200` (tests smaller)
- `woven.length` matches the sum in valid cases; tests also include mismatches
- lowercase English letters in tests

## Files

| File | Role |
|------|------|
| `twoSourceWeave.ts` | Stub — implement here |
| `twoSourceWeave.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:two-source-weave
```
