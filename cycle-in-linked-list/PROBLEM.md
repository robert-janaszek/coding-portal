# Cycle in a Linked List

**Difficulty:** Medium
**Topics:** Linked List
**Target:** `O(n)` time, `O(1)` extra space

## Problem

Given `head`, decide whether the list loops: following `next` forever would revisit some node.

`pos` in the examples is only a drawing hint (the tail links back to that index). It is **not** an argument to your function. `pos = -1` means the tail’s `next` is `null`.

## Examples

### Example 1

```
Input:  head = [5, 1, 9], pos = 2
Output: true
```

### Example 2

```
Input:  head = [7], pos = -1
Output: false
```

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

