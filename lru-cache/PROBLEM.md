# LRU Cache

**Difficulty:** Medium  
**Topics:** Design  
**Target:** `O(1)` average `get` / `put`

## Problem

Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.

Implement `LRUCache` class:

- `LRUCache(capacity)` initialize with positive capacity
- `get(key)` return value if present, else `-1`; counts as use
- `put(key, value)` insert or update; counts as use; if over capacity, evict **least recently used** key

## Examples

```
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // evicts key 2 → {1=1, 3=3}
lRUCache.get(2);    // return -1
lRUCache.put(4, 4); // evicts key 1 → {3=3, 4=4}
lRUCache.get(1);    // return -1
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
```

## Constraints

- `1 <= capacity <= 3000` (tests small)
- keys/values fit in number
- at most a few thousand calls in tests

## Files

| File | Role |
|------|------|
| `LRUCache.ts` | Stub class |
| `LRUCache.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:lru
```
