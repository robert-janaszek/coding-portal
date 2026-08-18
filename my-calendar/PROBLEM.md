# Booking Calendar

**Difficulty:** Medium  
**Topics:** Design, Intervals  
**Target:** `O(log n)` per `book` (or `O(n)` with a sorted list — acceptable for small `n`)

## Problem

Store events `[start, end)`. Back-to-back is fine: `[8, 12)` and `[12, 15)` do not conflict.

- `MyCalendar()` — empty
- `book(start, end)` — add the event if it does not overlap anything already stored; then return `true`. If it would overlap, return `false` and leave the calendar unchanged.

Touching at an endpoint is not an overlap.

## Examples

```
const cal = new MyCalendar();
cal.book(8, 14);  // true
cal.book(11, 16); // false — overlaps 8–14
cal.book(14, 20); // true — touches at 14
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
