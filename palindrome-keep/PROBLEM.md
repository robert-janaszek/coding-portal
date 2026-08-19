# Palindrome Keep

**Difficulty:** Medium
**Topics:** Strings
**Target:** `O(n * n)` time, `O(n * n)` extra space (a rolling row is fine too)

## Problem

Given a string `s`, delete any characters you like. The remaining characters stay in their original order. Return the length of the longest result that reads the same forwards and backwards.

A single character is already a palindrome. If `s` is empty, return `0`.

## Examples

```
Input:  s = "abca"
Output: 3
Explanation: "aba" and "aca" both work; "abca" itself is not a palindrome

Input:  s = "tenet"
Output: 5

Input:  s = "xyz"
Output: 1
```

## Constraints (exercise)

- `0 <= s.length <= 1000` (tests smaller)
- lowercase English letters in tests

## Files

| File | Role |
|------|------|
| `palindromeKeep.ts` | Stub — implement here |
| `palindromeKeep.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:palindrome-keep
```
