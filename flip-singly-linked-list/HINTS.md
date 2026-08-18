# Hints — Flip a Singly Linked List

Spoilers. Read only after you have tried on your own.

## Idea

Walk the list once. At each node, point `next` backward instead of forward.

You need to remember three things: the previous node (the new successor), the current node, and the original `next` before you overwrite it.

## Pointer walk

Start with `prev = null` and `curr = head`.

While `curr` is not null:

1. Save `curr.next`.
2. Set `curr.next` to `prev`.
3. Advance `prev` to `curr`, then `curr` to the saved next.

When the loop ends, `prev` is the new head.

## Complexity

Time: one pass → `O(n)`

Space: a few pointers, no extra list and no recursion → `O(1)`
