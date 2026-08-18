# Least-Recently-Used Map

**Difficulty:** Medium  
**Topics:** Design  
**Target:** `O(1)` average `get` / `put`

## Problem

Build a fixed-capacity key/value store. `get` and `put` both count as a **use**. When `put` would exceed capacity, drop the key that has gone unused the longest.

- `LRUCache(capacity)` — empty store, `capacity >= 1`
- `get(key)` — value, or `-1` if missing
- `put(key, value)` — insert or overwrite

## Examples

```
const cache = new LRUCache(2);
cache.put(10, 10); // {10}
cache.put(20, 20); // {10, 20}
cache.get(10);     // 10  — 10 is now most recent
cache.put(30, 30); // drops 20 → {10, 30}
cache.get(20);     // -1
cache.put(40, 40); // drops 10 → {30, 40}
cache.get(10);     // -1
cache.get(30);     // 30
cache.get(40);     // 40
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
| `solutions/` | Archived attempts (spoilers) |

```bash
npm run test:lru
```
