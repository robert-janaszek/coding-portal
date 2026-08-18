# Reverse Linked List

**Difficulty:** Easy
**Topics:** Linked List
**Target:** `O(n)` time, `O(1)` extra space

## Problem

Given the `head` of a singly linked list, reverse the list and return the new head.

Reverse **in place** by rewiring `next` pointers. Do not allocate a new chain of nodes. Recursion uses `O(n)` call-stack space, so it does not meet the space target.

## Examples

### Example 1

```
Input:  head = [1, 2, 3, 4, 5]
Output: [5, 4, 3, 2, 1]
```

### Example 2

```
Input:  head = [1, 2]
Output: [2, 1]
```

### Example 3

```
Input:  head = []
Output: []
```

## Constraints (exercise)

- `-5000 <= Node.val <= 5000`
- number of nodes in the list is between `0` and `5000` (tests smaller)

## Files

| File | Role |
|------|------|
| `reverseList.ts` | Stub (+ `ListNode`) |
| `reverseList.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:reverse-linked-list
```
