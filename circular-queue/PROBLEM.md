# Queue

**Difficulty:** Medium  
**Topics:** Design, Queue  
**Target:** extra space `O(n)` for `n` items currently stored; amortized `O(1)` `enqueue` / `dequeue`

## Problem

Implement a FIFO **queue**. `enqueue` adds a value at the back. `dequeue` removes and returns the value at the front, or `undefined` if the queue is empty.

`enqueue` **always succeeds**. There is no capacity limit and no `false` / “full” result.

## Complexity

Extra space must be **`O(n)`**, where `n` is the number of items **currently** in the queue — not the number of `enqueue`s over the lifetime of the object.

`enqueue` and `dequeue` must be amortized **`O(1)`**.

## Examples

```
const q = new Queue();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);
q.dequeue(); // 1
q.enqueue(4);
q.dequeue(); // 2
q.dequeue(); // 3
q.dequeue(); // 4
q.dequeue(); // undefined
```

```
empty queue: dequeue() → undefined
```

```
const q = new Queue();
for (let i = 0; i < 100; i++) q.enqueue(i);
q.dequeue(); // 0
q.dequeue(); // 1
```

## Constraints

- values fit in JS `number`
- tests mix enqueue and dequeue, including draining, filling again, and long runs of enqueue

## Files

| File | Role |
|------|------|
| `Queue.ts` | Stub — implement here |
| `Queue.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:circular-queue
```
