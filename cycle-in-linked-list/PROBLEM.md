# Cycle in a Linked List

**Difficulty:** Medium
**Topics:** Linked List
**Target:** `O(n)` time, `O(1)` extra space

## Problem

You are given `head` of a singly linked list. Return `true` if the list has a cycle, otherwise `false`.

A cycle means some node’s `next` points back to a node already on the list, so following `next` never reaches `null`.

The function takes only `head`. You inspect the live `next` pointers; you are not given an index of where a cycle starts.

## Examples

### Example 1

```
5 → 1 → 9 ─┐
        └──┘
```

The last node points to itself. Output: `true`

### Example 2

```
7 → null
```

Output: `false`

### Example 3

```
1 → 2 → 3 ─┐
↑──────────┘
```

The last node points back to the first. Output: `true`

## Constraints (exercise)

- `-10^4 <= Node.val <= 10^4`
- number of nodes in the list is between `0` and `10^4` (tests smaller)

## Files

| File | Role |
|------|------|
| `cycleInLinkedList.ts` | Stub (+ `ListNode`) |
| `cycleInLinkedList.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:cycle-in-linked-list
```
