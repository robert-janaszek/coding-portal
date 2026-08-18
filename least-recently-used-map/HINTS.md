# Hints — Least-Recently-Used Map

Spoilers. Read only after you have tried on your own.

Interview classic: `Map<key, Node>` + doubly linked list (MRU at head, LRU at tail).

In TypeScript/JS, `Map` preserves insertion order — you can:

1. on `get`/`put` hit: `delete` then `set` to move to MRU
2. on overflow: delete the first key from the `Map` iterator

Either approach is fine if `get`/`put` are amortized `O(1)`.
