# Flip a Singly Linked List

**Difficulty:** Easy
**Topics:** Linked List
**Target:** `O(n)` time, `O(1)` extra space

## Problem

Given `head`, reverse the chain and return the node that used to be last.

Rewire `next` pointers on the existing nodes. Building a second list of new nodes does not meet the space target. Recursion uses `O(n)` call-stack space, so it also fails the target.

## Examples

### Example 1

```
Input:  head = [8, 3, 1, 6]
Output: [6, 1, 3, 8]
```

### Example 2

```
Input:  head = [4, 9]
Output: [9, 4]
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
