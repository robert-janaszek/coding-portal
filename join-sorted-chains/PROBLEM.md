# Join Sorted Chains

**Difficulty:** Hard  
**Topics:** Linked List  
**Target:** `O(N log k)` time, `O(k)` extra space (or `O(log k)` stack with divide-and-conquer)

## Problem

You receive an array `chains` of `k` singly linked lists. Each non-empty list is already sorted **non-decreasing**. Some entries may be `null`.

Join every node into **one** sorted list and return its head. Rewire the existing nodes — do not allocate a new node for a value that already lives in `chains`.

If `chains` is empty, or every entry is `null`, return `null`.

`N` is the total number of nodes across all chains.

## Examples

### Example 1

```
Input:
  1 → 4 → 7 → null
  2 → 5 → null
  3 → null

Output:
  1 → 2 → 3 → 4 → 5 → 7 → null
```

### Example 2

```
Input:  []
Output: null
```

### Example 3

```
Input:
  null
  0 → 2 → 2 → null
  null

Output:
  0 → 2 → 2 → null
```

## Constraints (exercise)

- `0 <= k <= 10^4` (tests smaller)
- each chain has between `0` and `500` nodes (tests smaller)
- `N <= 10^4` in the intended bound (tests smaller)
- `-10^4 <= Node.val <= 10^4`

## Files

| File | Role |
|------|------|
| `joinSortedChains.ts` | Stub (+ `ListNode`) |
| `joinSortedChains.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:join-sorted-chains
```
