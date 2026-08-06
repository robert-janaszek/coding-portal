# My Calendar

**Difficulty:** Medium  
**Topics:** Design, Intervals  
**Target:** `O(log n)` per `book` (or `O(n)` with a sorted list — acceptable for small `n`)

## Problem

Implement a calendar that stores events as half-open intervals `[start, end)` (start inclusive, end exclusive).

`MyCalendar`:

- `MyCalendar()` — empty calendar
- `book(start, end)` — try to add the event. Return `true` and store it if it does **not** cause a double booking; otherwise return `false` and leave the calendar unchanged.

A **double booking** is when two events share a non-empty open intersection: they overlap if `start < otherEnd && end > otherStart`. Touching at an endpoint is allowed (e.g. `[10, 20)` and `[20, 30)` do not overlap).

## Examples

```
const cal = new MyCalendar();
cal.book(10, 20); // true
cal.book(15, 25); // false — overlaps [10, 20)
cal.book(20, 30); // true — touches at 20 only
```

```
const cal = new MyCalendar();
cal.book(47, 50); // true
cal.book(33, 41); // true
cal.book(39, 45); // false — overlaps [33, 41)
cal.book(33, 42); // false
cal.book(25, 32); // true
cal.book(26, 35); // false
cal.book(19, 25); // true — touches [25, 32) at 25
cal.book(3, 8);   // true
cal.book(8, 13);  // true
cal.book(18, 27); // false
```

## Constraints

- `0 <= start < end <= 10^9` (tests use smaller ints)
- At most a few hundred `book` calls in tests

## Files

| File | Role |
|------|------|
| `MyCalendar.ts` | Stub class |
| `MyCalendar.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |
| `solutions/` | Archived attempts (spoilers) |

```bash
npm run test:my-calendar
```
