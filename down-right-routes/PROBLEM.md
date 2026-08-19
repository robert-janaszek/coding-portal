# Down-Right Routes

**Difficulty:** Easy
**Topics:** Counting
**Target:** `O(rows * cols)` time, `O(cols)` extra space (a full table is fine too)

## Problem

A grid has `rows` rows and `cols` columns. Start at the top-left cell. You may move only **down** or **right**, one cell at a time. Count how many routes reach the bottom-right cell.

Every route has the same length; they differ only in the order of downs and rights.

## Examples

### Example 1

```
Input:  rows = 2, cols = 3
Output: 3
Explanation: down-right-right, right-down-right, right-right-down
```

### Example 2

```
Input:  rows = 1, cols = 1
Output: 1
```

### Example 3

```
Input:  rows = 3, cols = 4
Output: 10
```

## Constraints (exercise)

- `1 <= rows, cols <= 100`
- the answer fits in a 32-bit signed integer

## Files

| File | Role |
|------|------|
| `downRightRoutes.ts` | Stub |
| `downRightRoutes.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:down-right-routes
```
