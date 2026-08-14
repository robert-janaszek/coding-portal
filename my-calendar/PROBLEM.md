# My Calendar

**Difficulty:** Medium  
**Topics:** Design, Intervals  
**Target:** `O(log n)` per `book` (or `O(n)` with a sorted list — acceptable for small `n`)

## Problem

Implement a calendar of events from `start` to `end` (think meeting times). Back-to-back is allowed: 15:00–15:30 and 15:30–16:00 do not conflict.

`MyCalendar`:

- `MyCalendar()` — empty calendar
- `book(start, end)` — try to add the event. Return `true` and store it if it does **not** cause a double booking; otherwise return `false` and leave the calendar unchanged.

A **double booking** is when two events overlap in time. Events that only meet at an endpoint do not overlap (e.g. 10–20 and 20–30).

## Examples

```
const cal = new MyCalendar();
cal.book(10, 20); // true
cal.book(15, 25); // false — overlaps 10–20
cal.book(20, 30); // true — back-to-back at 20
```

```
const cal = new MyCalendar();
cal.book(47, 50); // true
cal.book(33, 41); // true
cal.book(39, 45); // false — overlaps 33–41
cal.book(33, 42); // false
cal.book(25, 32); // true
cal.book(26, 35); // false
cal.book(19, 25); // true — back-to-back with 25–32
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
