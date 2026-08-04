# Hints — Merge Intervals

Spoilers. Read only after you have tried on your own.

## Sweep line

1. Sort intervals by `start`.
2. Keep a “current merged interval” `[curStart, curEnd]`.
3. For each next interval `[start, end]`:
   - if `start <= curEnd` (overlap or touch), extend `curEnd = max(curEnd, end)`
   - otherwise, push the current interval and start a new one

## Complexity

Sorting dominates: `O(n log n)` time.

