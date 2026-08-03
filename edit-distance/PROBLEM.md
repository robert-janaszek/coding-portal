# 72. Edit Distance

**Difficulty:** Hard  
**Topics:** Strings, DP  
**Target:** `O(m * n)` time

## Problem

Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`.

Allowed operations (each costs 1):

- Insert a character
- Delete a character
- Replace a character

## Examples

```
Input:  word1 = "horse", word2 = "ros"
Output: 3
Explanation: horse → rorse → rose → ros

Input:  word1 = "intention", word2 = "execution"
Output: 5
```

## Constraints

- `0 <= word1.length, word2.length <= 500`
- lowercase English letters in tests

## Files

| File | Role |
|------|------|
| `minDistance.ts` | Stub — implement here |
| `solution.ts` | Reference solution (spoilers) |
| `minDistance.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:edit-distance
```
