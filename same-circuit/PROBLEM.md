# Same Circuit

**Difficulty:** Medium  
**Topics:** Graph, Disjoint sets  
**Target:** `O(n + m)` time overall (`m` = log length), `O(n)` extra space

## Problem

A workshop has `n` benches labeled `0` … `n - 1`. A wiring log `ops` is processed **in order**. Each line is one of:

- `["link", a, b]` — lay a two-way wire between benches `a` and `b`
- `["check", a, b]` — ask whether `a` and `b` already share a circuit **after the wires laid so far** (directly or through other benches)

Two benches share a circuit when you can walk from one to the other along wires that have already been laid. A bench always shares a circuit with itself.

Return one boolean per `check`, in the order the checks appear. `link` lines produce no output.

A fresh walk over the whole workshop for every `check` will not meet the target: the map grows as the log is read, and each check must use the wiring **at that moment**.

Tests have `a != b` on every `link`. A `link` between benches that already share a circuit is allowed (a second wire). `check` may use `a === b`.

## Examples

```
Input:  n = 5, ops = [
  ["link", 0, 1],
  ["link", 1, 2],
  ["check", 0, 2],
  ["check", 0, 3],
  ["link", 3, 4],
  ["check", 2, 4],
  ["link", 2, 3],
  ["check", 0, 4],
]
Output: [true, false, false, true]
Explanation:
- After 0—1—2, benches 0 and 2 share a circuit.
- 3 is still separate.
- 3—4 is a second circuit; 2 and 4 are not joined yet.
- Wire 2—3 merges the two circuits, so 0 reaches 4.
```

```
Input:  n = 2, ops = [
  ["check", 0, 1],
  ["check", 0, 0],
  ["link", 0, 1],
  ["check", 1, 0],
]
Output: [false, true, true]
```

```
Input:  n = 1, ops = []
Output: []
```

## Constraints

- `1 <= n <= 10^4` (tests stay smaller)
- `0 <= ops.length <= 2 * 10^4`
- `ops[i]` is `["link", a, b]` or `["check", a, b]`
- `0 <= a, b < n`
- on `link`: `a != b`

## Files

| File | Role |
|------|------|
| `sameCircuit.ts` | Stub — implement here |
| `sameCircuit.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:same-circuit
```
