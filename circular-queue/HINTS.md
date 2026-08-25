# Hints — Queue

Spoilers. Read only after you have tried on your own.

## Idea

Keep a backing array and two indices (front / next insert). Constructor `size` is the **initial** array length, not a max. `dequeue` advances the front; `enqueue` writes at the back. Slots freed at the front can be reused — typically by wrapping the index.

When every slot holds a live item, allocate a new array of **twice** the length, copy the live range in order (front to back), reset the indices, then insert. Growing by one each time would make `enqueue` amortized linear.

## Empty vs full

With only head and tail, `head === tail` is ambiguous (empty and full look the same). Store a live count, or grow as soon as the next insert would collide with head.

## Complexity

Index arithmetic is `O(1)`. A doubling copy is `O(n)` but rare enough that `enqueue` stays amortized `O(1)`. Extra space stays `O(n)` live items plus at most a constant factor of unused slots. No `shift`, no copy on every operation.
