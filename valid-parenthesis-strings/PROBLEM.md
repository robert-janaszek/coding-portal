# Valid Parenthesis Strings

**Difficulty:** Medium
**Topics:** Combinatorics
**Target:** `O(4^n / sqrt(n))` time (Catalan), `O(n)` extra space (excluding output)

## Problem

Return every string of `n` pairs of parentheses that is correctly matched.

Order of the returned strings does not matter.

## Examples

### Example 1

```
Input:  n = 2
Output: ["(())", "()()"]
```

### Example 2

```
Input:  n = 1
Output: ["()"]
```

## Constraints (exercise)

- `1 <= n <= 8`

## Files

| File | Role |
|------|------|
| `validParenthesisStrings.ts` | Stub |
| `validParenthesisStrings.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:valid-parenthesis-strings
```
