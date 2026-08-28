# Flip a Singly Linked List

**Difficulty:** Easy
**Topics:** Linked List
**Target:** `O(n)` time, `O(1)` extra space

## Problem

You are given `head` of a singly linked list. Reverse the chain in place and return the node that used to be last (the new head).

## Examples

### Example 1

```
Input:  8 → 3 → 1 → 6 → null
Output: 6 → 1 → 3 → 8 → null
```

### Example 2

```
Input:  4 → 9 → null
Output: 9 → 4 → null
```

### Example 3

```
Input:  null
Output: null
```

## Constraints (exercise)

- `-5000 <= Node.val <= 5000`
- number of nodes in the list is between `0` and `5000` (tests smaller)

## Files

| File | Role |
|------|------|
| `flipSinglyLinkedList.ts` | Stub (+ `ListNode`) |
| `flipSinglyLinkedList.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:flip-singly-linked-list
```
