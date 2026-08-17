# Coin Change

**Difficulty:** Medium
**Topics:** Combinatorics
**Target:** `O(n * amount)` time, `O(amount)` extra space

## Problem

You are given an array of **distinct** positive integers `coins` (denominations) and an integer `amount`.

Return the **fewest** number of coins that sum to `amount`. You may reuse a coin **unlimited** times.

If no combination works, return `-1`. `amount = 0` needs `0` coins.

Order does not matter: `3 + 3` and `4 + 1 + 1` are two different ways to make `6`; you only care that `3 + 3` uses fewer coins.

## Examples

### Example 1

```
Input:  coins = [1, 2, 5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
```

### Example 2

```
Input:  coins = [2], amount = 3
Output: -1
```

### Example 3

```
Input:  coins = [1], amount = 0
Output: 0
```

### Example 4

```
Input:  coins = [1, 3, 4], amount = 6
Output: 2
Explanation: 3 + 3, not 4 + 1 + 1 (greedy by largest coin is wrong here)
```

## Constraints (exercise)

- `1 <= coins.length <= 12`
- `1 <= coins[i] <= 10^4`
- all values in `coins` are unique
- `0 <= amount <= 10^4`

## Files

| File | Role |
|------|------|
| `coinChange.ts` | Stub |
| `coinChange.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:coin-change
```
