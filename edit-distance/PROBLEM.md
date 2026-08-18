# String Conversion Cost

**Difficulty:** Hard  
**Topics:** Strings  
**Target:** `O(m * n)` time

## Problem

Turn `word1` into `word2` using the fewest edits. Each of these counts as one edit:

- insert one character
- delete one character
- replace one character with another

## Examples

```
Input:  word1 = "kitten", word2 = "mitten"
Output: 1
Explanation: replace k → m

Input:  word1 = "cart", word2 = "cats"
Output: 1
Explanation: replace r → s
```

## Constraints

- `0 <= word1.length, word2.length <= 500`
- lowercase English letters in tests

## Files

| File | Role |
|------|------|
| `minDistance.ts` | Stub — implement here |
| `solutions/` | Archived attempts (spoilers) |
| `minDistance.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:edit-distance
```
