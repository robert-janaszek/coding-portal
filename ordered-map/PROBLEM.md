# Ordered Map

**Difficulty:** Hard  
**Topics:** Design, Balanced BST, Red-black tree  
**Target:** `O(log n)` per `set` / `get` / `delete` / `floorKey` / `ceilingKey` / `has`

## Problem

Design an **ordered map** (sorted dictionary): keys stay in sorted order, and you can query the nearest keys by order — not only exact lookup.

A hash map cannot do `floor` / `ceiling` in logarithmic time. A **balanced BST** (e.g. red-black tree or AVL) can. For AVL rotations and height invariants specifically, see `avl-tree/`.

Implement `OrderedMap`:

- `set(key, value)` — insert or overwrite `key`
- `get(key)` — value if present, else `null`
- `delete(key)` — remove `key` if present; return whether it existed
- `has(key)` — whether `key` is present
- `size()` — number of keys
- `floorKey(key)` — largest key `≤ key`, or `null` if none
- `ceilingKey(key)` — smallest key `≥ key`, or `null` if none

Keys are unique. Values may be any number (including duplicates across keys).

## Examples

```
const m = new OrderedMap();
m.set(10, 100);
m.set(20, 200);
m.set(30, 300);

m.get(20);         // 200
m.get(15);         // null
m.has(10);         // true
m.size();          // 3

m.floorKey(25);    // 20
m.floorKey(10);    // 10
m.floorKey(5);     // null

m.ceilingKey(25);  // 30
m.ceilingKey(30);  // 30
m.ceilingKey(35);  // null

m.set(20, 999);    // overwrite
m.get(20);         // 999

m.delete(20);      // true
m.has(20);         // false
m.floorKey(25);    // 10
m.ceilingKey(15);  // 30
m.size();          // 2
```

## Constraints

- Keys and values fit in JS `number` (tests use integers)
- At most a few thousand operations in tests
- Empty map: `get` / `floorKey` / `ceilingKey` → `null`, `size()` → `0`

## Complexity

Do **not** scan all keys on each query. Each listed operation should be **O(log n)** worst-case (balanced tree), where `n` is the number of keys.

Sorting a snapshot of keys on every call (or linear search) fails the target even if tests pass on small inputs.

## Files

| File | Role |
|------|------|
| `OrderedMap.ts` | Stub class |
| `OrderedMap.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |
| `solutions/` | Archived attempts (spoilers) |

```bash
npm run test:ordered-map
```
