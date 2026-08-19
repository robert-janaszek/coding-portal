# Fewest Coins

**Difficulty:** Medium
**Topics:** Combinatorics
**Target:** `O(n * amount)` time, `O(amount)` extra space

## Problem

`coins` is a set of distinct positive denominations. Make exactly `amount` using as **few** coins as possible. Each denomination may be used any number of times.

If it is impossible, return `-1`. `amount = 0` needs `0` coins.

You only care about the count, not the order of coins.

## Examples

### Example 1

```
Input:  coins = [2, 7, 9], amount = 11
Output: 2
Explanation: 9 + 2
```

### Example 2

```
Input:  coins = [4], amount = 7
Output: -1
```

### Example 3

```
Input:  coins = [3], amount = 0
Output: 0
```

### Example 4

```
Input:  coins = [1, 3, 4], amount = 6
Output: 2
Explanation: 3 + 3
```

## Constraints (exercise)

- `1 <= coins.length <= 12`
- `1 <= coins[i] <= 10^4`
- all values in `coins` are unique
- `0 <= amount <= 10^4`

## Files

| File | Role |
|------|------|
| `fewestCoins.ts` | Stub |
| `fewestCoins.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:fewest-coins
```
