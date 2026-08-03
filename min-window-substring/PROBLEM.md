# 76. Minimum Window Substring

**Difficulty:** Hard  
**Topics:** Strings  
**Target:** `O(|s| + |t|)` time

## Problem

Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such window, return `""`.

If multiple windows have the same minimum length, return the one that appears **first**.

## Examples

```
Input:  s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"

Input:  s = "a", t = "a"
Output: "a"

Input:  s = "a", t = "aa"
Output: ""
```

## Constraints

- tests stay modest in length
- `t` consists of letters; case-sensitive

## Files

| File | Role |
|------|------|
| `minWindow.ts` | Stub |
| `minWindow.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:min-window
```
