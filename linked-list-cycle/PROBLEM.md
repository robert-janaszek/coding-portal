# Linked List Cycle

**Difficulty:** Medium
**Topics:** Linked List, Two Pointers
**Target:** `O(n)` time, `O(1)` extra space

## Problem
Given the `head` of a linked list, return `true` if the linked list has a cycle, otherwise return `false`.

A cycle exists if there is some node in the list that can be reached again by continuously following the `next` pointer.

## Examples

### Example 1

```
Input:  head = [3,2,0,-4], pos = 1
Output: true
```

### Example 2

```
Input:  head = [1,2], pos = -1
Output: false
```

## Constraints (exercise)
- `-10^4 <= Node.val <= 10^4`
- number of nodes in the list is between `0` and `10^4` (tests smaller)

## Files

| File | Role |
|------|------|
| `linkedListCycle.ts` | Stub (+ `ListNode`) |
| `linkedListCycle.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:run -- linked-list-cycle/linkedListCycle.test.ts
```

