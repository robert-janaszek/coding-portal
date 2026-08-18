# Hints — Cycle in a Linked List

Spoilers. Read only after you have tried on your own.

## Floyd’s cycle detection (tortoise & hare)

Maintain two pointers:

- `slow` moves by `1` step
- `fast` moves by `2` steps

If there is a cycle, `fast` will eventually catch up with `slow`.

## Termination condition

- If `fast` becomes `null` or `fast.next` becomes `null`, there is no cycle.

## Complexity

Time: each pointer traverses at most a constant number of passes over the list → `O(n)`

Space: only two pointers → `O(1)`

