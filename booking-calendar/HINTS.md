# Hints — Booking Calendar

Spoilers. Read only after you have tried on your own.

## Idea

Keep booked events sorted by start. A new `start`–`end` conflicts if it overlaps the previous event (largest start `< end` that already exists) or the next one.

## Approaches

1. **Sorted list / array** — insert in order, scan or binary-search neighbors. `book` is `O(n)`.
2. **Ordered map** (TreeMap / balanced BST keyed by start → end) — find floor/ceiling of `start` in `O(log n)`, check overlap with at most those two neighbors, then insert.

Overlap test: `start < otherEnd && end > otherStart`. Back-to-back (`end === otherStart`) is not an overlap.

## Complexity

Interview sweet spot: explain the ordered-map idea even if you code the sorted-list version first.
