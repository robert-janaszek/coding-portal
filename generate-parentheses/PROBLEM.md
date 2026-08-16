# Generate Parentheses

**Difficulty:** Medium
**Topics:** Combinatorics
**Target:** `O(4^n / sqrt(n))` time (Catalan), `O(n)` extra space (excluding output)

## Problem

Given `n` pairs of parentheses, return all strings of well-formed parentheses with exactly `n` pairs.

Order of the returned strings does not matter.

The search tree is the same as combinations (`push` a choice, recurse, undo), but a choice is illegal if it can never become a valid string.

## Examples

### Example 1

```
Input:  n = 3
Output: ["((()))", "(()())", "(())()", "()(())", "()()()"]
```

### Example 2

```
Input:  n = 1
Output: ["()"]
```

### Example 3

```
Input:  n = 2
Output: ["(())", "()()"]
```

## Constraints (exercise)

- `1 <= n <= 8`

## Files

| File | Role |
|------|------|
| `generateParenthesis.ts` | Stub |
| `generateParenthesis.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:generate-parentheses
```
